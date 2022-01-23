// Load the AWS SDK for Node.js
import nodemailer from "nodemailer";
// Set the region 
import { getLogger } from 'log4js';
const logger = getLogger("EmailService");
export class EmailService {
    constructor() {
    }
    //Método que envía al correo
    sendMail(email: string, subject: string, content: string) {
        logger.debug('Inicia el envío del correo:', email);
        // Creacion de parámetros del envío del correo
        let smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_SECRET
            }
        });
        let mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: subject,
            text: content
        }

        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                logger.error(error);
            }
        });

    }
}
