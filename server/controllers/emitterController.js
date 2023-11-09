import crypto from 'crypto';
import socketIOClient from 'socket.io-client';
import data from '../data.json' assert { type: "json" };
// import { log } from 'console';
console.log(socketIOClient.io());
const emitter = socketIOClient('http://localhost:7000');

function generateSecretKey(message) {
  const hash = crypto.createHash('sha256');
  // console.log(hash);
  hash.update(JSON.stringify(message));
 
  return hash.digest('hex');
}

function encryptMessage(message, passKey) {
  const cipher = crypto.createCipher('aes-256-ctr', passKey);
  let encryptedMessage = cipher.update(JSON.stringify(message), 'utf-8', 'hex');
  encryptedMessage += cipher.final('hex');
  // console.log(encryptMessage);
  return encryptedMessage;
}

function generateRandomMessage() {
  const randomIndex = Math.floor(Math.random() * data.length);
  const { name, origin, destination } = data[randomIndex];
  const originalMessage = { name, origin, destination };
  const secretKey = generateSecretKey(originalMessage);
  const encryptedMessage = encryptMessage(originalMessage, secretKey);

  return encryptedMessage;
}

function generateMessageStream() {
  const messageCount = Math.floor(Math.random() * (499 - 49 + 1) + 49);
  const messages = [];

  for (let i = 0; i < messageCount; i++) {
    messages.push(generateRandomMessage());
  }

  return messages.join('|');
}

const emitterController = {
  emitData: () => {
    setInterval(() => {
      const messageStream = generateMessageStream();
      emitter.emit('encryptedDataStream', messageStream);
    }, 10000);
  },
};
// console.log(emitterController.emitData());
export default emitterController;
