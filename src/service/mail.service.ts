import nodemailer from "nodemailer";
import { getLogger } from 'log4js';
import path from "path";
import { Email } from "../model/email";
// tslint:disable-next-line: no-var-requires
const hbs = require('nodemailer-express-handlebars');

const logger = getLogger("EmailService");
export class EmailService {
    constructor() {
    }
    //Método que envía al correo
    sendMail(email: Email) {
        logger.debug('Inicia el envío del correo:', email);
        // Configuración de handlebars
        const hbsConfig = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path.join(__dirname, '../views/'),
                layoutsDir: path.join(__dirname, '../views/'),
                defaultLayout: ''
            },
            viewPath: path.join(__dirname, '../views/'),
            extName: '.hbs'
        };

        // Creacion de parámetros del envío del correo
        let smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_SECRET
            }
        });
        smtpTransport.use('compile', hbs(hbsConfig));
        let mailOptions = {
            from: process.env.GMAIL_USER,
            to: email.to,
            subject: email.subject,
            template: email.template,
            context: email.context,
            attachments: email.attachments
        }

        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) logger.error(error);
            logger.debug(response);
        });

    }
}
