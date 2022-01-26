import pdf, { CreateOptions } from 'html-pdf';
import { readFileSync } from "fs";
import ejs from "ejs";
import { getLogger } from 'log4js';


const logger = getLogger("ReportService");
class ReportService {

    toStream = async (template: string, data: any, options: CreateOptions, response: any) => {
        let compiled = await ejs.compile(readFileSync(template, 'utf-8'));
        let html = compiled(data);
        pdf.create(html, options).toStream((error, stream) => {
            if (error) logger.error(error);
            stream.pipe(response);
        });
    }

    toFile = async (template: string, data: any, options: CreateOptions, path: string) => {
        let compiled = await ejs.compile(readFileSync(template, 'utf-8'));
        let html = compiled(data);
        pdf.create(html, options).toFile(path, (error, stream) => {
            if (error) logger.error(error);
        });
    }

}

Object.seal(ReportService);
export = ReportService;