import * as nodemailer from 'nodemailer';
import { getLogger } from 'log4js';

const logger = getLogger("GMailService");
export class GMailService {
    private _transporter: nodemailer.Transporter;
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'factureroagil@gmail.com',
                pass: 'NodeJS$$'
            }
        });
    }
    sendMail(to: string, subject: string, content: string) {
        logger.debug("Start send email to", to);
        let options = {
            from: 'factureroagil@gmail.com',
            to: to,
            subject: subject,
            text: content
        }

        this._transporter.sendMail(
            options, (error, info) => {
                if (error) {
                    return logger.error(`${error}`);
                }
                logger.debug(`Message Sent ${info.response}`);
            });
    }
} 
