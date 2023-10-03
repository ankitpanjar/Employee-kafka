import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class MessageConsumerService {
  private kafkaConsumer: any;

  constructor() {
    this.kafkaConsumer = new Kafka({
      clientId: 'file-upload-consumer',
      brokers: ['localhost:9092'],
    }).consumer({ groupId: 'file-upload-consumer-group' });
  }

  async listenForMessages() {
    await this.kafkaConsumer.connect();
    await this.kafkaConsumer.subscribe({ topic: 'file-upload-topic', fromBeginning: true });

    await this.kafkaConsumer.run({
      eachMessage: async ({ message }) => {
        const parsedMessage = JSON.parse(message.value.toString());
        console.log('Received message:', parsedMessage);
    
      },
    });
  }
}
