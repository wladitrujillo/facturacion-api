
import { getLogger } from 'log4js';
import { Types } from "mongoose";
import { InvoiceDetail } from '../model/invoice-detail';

const logger = getLogger("IndicatorService");

interface Item {
    value: number,
    description: string,
    total: number
}

class IndicatorService {


    private locale: string = 'es-ES';

    constructor() {
    }


    async monthly(company: string, year: number): Promise<any> {

        let months: Item[] = [
            { value: 1, description: 'ENE', total: 0 },
            { value: 2, description: 'FEB', total: 0 },
            { value: 3, description: 'MAR', total: 0 },
            { value: 4, description: 'ABR', total: 0 },
            { value: 5, description: 'MAY', total: 0 },
            { value: 6, description: 'JUN', total: 0 },
            { value: 7, description: 'JUL', total: 0 },
            { value: 8, description: 'AGO', total: 0 },
            { value: 9, description: 'SEP', total: 0 },
            { value: 10, description: 'OCT', total: 0 },
            { value: 11, description: 'NOV', total: 0 },
            { value: 12, description: 'DIC', total: 0 },
        ];

        const aggregation = [
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$company', this.toObjectId(company)] },
                            { $eq: [{ $year: "$createdAt" }, year] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    totalSaleAmount: { $sum: '$total' }
                }
            }
        ];

        let result = await InvoiceDetail.aggregate(aggregation);

        let element;
        months.forEach(item => {
            element = result.find(e => e._id.month === item.value);
            if (element) item.total = element.totalSaleAmount;
        });

        return months;

    }



    async daily(company: string, year: number, month: number, day: number): Promise<any> {
        let date = new Date(year, month - 1, day);

        let days: Item[] = [];

        let options: any = { weekday: 'short', day: 'numeric' };

        for (let i = 1; i <= 7; i++) {
            date.setDate(date.getDate() - date.getDay() + i);
            days.push({ value: date.getDate(), description: date.toLocaleDateString(this.locale, options), total: 0 });
        }


        const aggregation = [
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$company', this.toObjectId(company)] },
                            { $eq: [{ $year: "$createdAt" }, year] },
                            { $eq: [{ $month: "$createdAt" }, month] },
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: { day: { $dayOfMonth: '$createdAt' } },
                    totalSaleAmount: { $sum: '$total' }
                }
            }
        ];

        let result = await InvoiceDetail.aggregate(aggregation);
        let element;
        days.forEach(item => {
            element = result.find(e => e._id.day === item.value);
            if (element) item.total = element.totalSaleAmount;
        });

        return days;

    }

    async topProducts(company: string): Promise<any> {

        let result = await InvoiceDetail.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product'
                },
            },
            {
                $project: {
                    product: {
                        name: 1
                    },
                    quantity: 1,
                    company: 1
                }
            },
            {
                $match: {
                    $expr: {
                        $eq: ['$company', this.toObjectId(company)]
                    }
                }
            },
            {
                $group: {
                    _id: '$product',
                    quantity: { $sum: '$quantity' }
                }
            },
            {
                $sort: { quantity: -1 }
            },
            {
                $limit: 5
            }
        ]);

        logger.debug("result", result);

        return result.map(element => ({ 'description': element._id[0].name, 'total': element.quantity }));

    }

    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }

}


Object.seal(IndicatorService);
export = IndicatorService;
