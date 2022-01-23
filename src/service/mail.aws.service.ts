
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
import { getLogger } from 'log4js';
const logger = getLogger("AWSService");
export class EmailAwsService {
    constructor() {
        AWS.config.update({ region: 'us-east-1' });
        let credentials = new AWS.SharedIniFileCredentials({ profile: 'ses-smtp-user.20211211-193956' });
        AWS.config.credentials = credentials;
    }
    //Método que envía al correo
    sendMail(email: string, subject: string, content: string) {
        logger.debug('Inicia el envío del correo:', email);
        // Creacion de parámetros del envío del correo
        let params = {
            Destination: { /* required */
                CcAddresses: [],
                ToAddresses: [email]
            },
            Message: { /* required */
                Body: { /* required */
                    Html: {
                        Charset: "UTF-8",
                        Data: content
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: "TEXT_FORMAT_BODY"
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            Source: 'alexandra19vero@gmail.com', /* required */
            ReplyToAddresses: [],
        };

        // Crear la promesa del envío del correo en la plataforma AWS
        var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

        // Manejo de la promesa se completo o rechazó
        sendPromise.then(
            function (data: any) {
                console.log(data);
            }).catch(
                function (error: any) {
                    console.error(error, error.stack);
                });

    }
}
