import logger from "../loggers/logger.js";
import twilio from "twilio";

const accountSid= "AC115b8e78c8fba80f77616ad981f90731";
const authToken="4d33e22bb4ac096bd755ee69d2327790";

const client=twilio(accountSid,authToken);

async function enviarSMS(telCliente) {

    try {
        const message= await client.messages.create({
        body: "Este es un mensaje desde Twilio",
        from: "+14245442476",
        to: telCliente //"+54 11 4162 1872"
    });

    logger.info(`SMS enviado ${message}`);

    } catch (error) {
        logger.error(`Error de envío de SMS: ${error}`);
    }
}

export {enviarSMS};