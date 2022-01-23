import pdf, { CreateOptions } from 'html-pdf';
import { readFileSync } from "fs";
import ejs from "ejs";
import { getLogger } from 'log4js';


const logger = getLogger("ReportService");
class ReportService {

    toPdf = async (template: string, data: any, options: CreateOptions, response: any) => {
        logger.debug('Start toPdf template:', template)
        let compiled = await ejs.compile(readFileSync(template, 'utf-8'));
        let html = compiled(data);
        pdf.create(html, options).toStream((error, stream) => {
            if (error) logger.error(error);
            stream.pipe(response);
        });
    }

}

Object.seal(ReportService);
export = ReportService;