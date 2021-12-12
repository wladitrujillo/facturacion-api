// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
import { getLogger } from 'log4js';
const logger = getLogger("AWSService");
export class EmailService {
    constructor() {
        AWS.config.update({ region: 'us-east-1' });
        let credentials = new AWS.SharedIniFileCredentials({ profile: 'ses-smtp-user.20211211-193956' });
        AWS.config.credentials = credentials;
    }

    sendMail(to: string, subject: string, content: string) {
        logger.debug('Start sendEmail to:', to);
        // Create sendEmail params 
        let params = {
            Destination: { /* required */
                CcAddresses: [],
                ToAddresses: [to]
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

        // Create the promise and SES service object
        var sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

        // Handle promise's fulfilled/rejected states
        sendPromise.then(
            function (data: any) {
                console.log(data);
            }).catch(
                function (error: any) {
                    console.error(error, error.stack);
                });

    }
}
