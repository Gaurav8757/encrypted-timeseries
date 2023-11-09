import dotenv from "dotenv";

import crypto from 'crypto';

import messageModel from '../models/messageModel';
dotenv.config();
console.log(process.env.pass_key);
const listenerController = {
  saveData: (req, res) => {
    const { encryptedDataStream } = req.body;
    const encryptedMessages = encryptedDataStream.split('|');

    encryptedMessages.forEach((encryptedMessage) => {
        //With your actual pass key
      const passKey = process.env.pass_key; 
      console.log(passKey);

     // Used a buffer for the initialization vector (IV)
     const iv = Buffer.from(passKey, 'hex'); 
      // Adjust the slice size as needed
      const decipher = crypto.createDeciphervec('aes-256-ctr',iv, null);
      let decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8');
      decryptedMessage += decipher.final('utf-8');

      try {
        const messageObject = JSON.parse(decryptedMessage);

        // Validate integrity using secret key
        const calculatedSecretKey = generateSecretKey({
          name: messageObject.name,
          origin: messageObject.origin,
          destination: messageObject.destination,
        });

        if (calculatedSecretKey === messageObject.secret_key) {
          // Data integrity is valid, save to MongoDB
          messageModel.saveMessage(messageObject);
        } else {
          console.log('Data integrity compromised. Discarding operation..');
        }
      } catch (error) {
        console.error('Error parsing decrypted message:', error);
      }
    });

    res.status(200).send('Data saved successfully!!');
  },
};

export default listenerController;
