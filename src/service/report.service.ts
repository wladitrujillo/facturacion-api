import pdf, { CreateOptions } from 'html-pdf';
import { readFileSync } from "fs";
import ejs from "ejs";


class ReportService {


    toPdf = async (template: string, data: any, options: CreateOptions, response: any) => {
        let compiled = await ejs.compile(readFileSync(template, 'utf-8'));
        let html = compiled(data);
        pdf.create(html, options).toStream((error, stream) => {
            stream.pipe(response);
        });
    }

}

Object.seal(ReportService);
export = ReportService;