
import { getLogger } from 'log4js';
import { Types } from "mongoose";
import { IInvoice, Invoice } from "../model/invoice";
import InvoiceRepository from '../repository/invoice.repository';
import InvoiceService from './invoice.service';

const logger = getLogger("IndicatorService");

interface Item {
    value: number,
    description: string,
    total: number
}

class IndicatorService {

    private invoiceRepository: InvoiceRepository;

    constructor() {
        this.invoiceRepository = new InvoiceRepository();
    }


    async monthly(company: string, year: number): Promise<any> {

        let months: Item[] = [
            { value: 1, description: 'Enero', total: 0 },
            { value: 2, description: 'Febrero', total: 0 },
            { value: 3, description: 'Marzo', total: 0 },
            { value: 4, description: 'Abril', total: 0 },
            { value: 5, description: 'Mayo', total: 0 },
            { value: 6, description: 'Junio', total: 0 },
            { value: 7, description: 'Julio', total: 0 },
            { value: 8, description: 'Agosto', total: 0 },
            { value: 9, description: 'Septiembre', total: 0 },
            { value: 10, description: 'Octubre', total: 0 },
            { value: 11, description: 'Noviembre', total: 0 },
            { value: 12, description: 'Diciembre', total: 0 },
        ];


        let invoices = [];

        for (let month of months) {

            invoices = await Invoice.find({
                company,
                $expr: {
                    $and: [
                        { $eq: [{ $year: "$createdAt" }, year] },
                        { $eq: [{ $month: "$createdAt" }, month.value] }
                    ]
                }
            });

            month.total = invoices.reduce((a, invoice) => a + invoice.total, 0)

        }



        return months;

    }


 
    async daily(company: string, year: number, month: number, day: number): Promise<any> {
        let date = new Date(year, month - 1, day);

        let days: Item[] = [];

        for (let i = 1; i <= 7; i++) {
            date.setDate(date.getDate() - date.getDay() + i);
            days.push({ value: date.getDate(), description: date.toLocaleDateString("es-ES"), total: 0 });
        }

        console.log(days);


        let invoices: any[] = [];

        for (let day of days) {

            invoices = await Invoice.find({
                company,
                $expr: {
                    $and: [
                        { $eq: [{ $year: "$createdAt" }, year] },
                        { $eq: [{ $month: "$createdAt" }, month] },
                        { $eq: [{ $dayOfMonth: "$createdAt" }, day.value] }
                    ]
                }
            });


            day.total = invoices.reduce((a, invoice) => a + invoice.total, 0)

        }

        return days;

    }


   
    private toObjectId(_id: string): Types.ObjectId {
        return new Types.ObjectId(_id);
    }

}


Object.seal(IndicatorService);
export = IndicatorService;
