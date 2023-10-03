import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class MessageProducerService {
  private kafkaProducer: any;

  constructor() {
    this.kafkaProducer = new Kafka({
      clientId: 'file-upload-producer',
      brokers: ['localhost:9092'],
    }).producer();
  }

  async sendMessage(message: any) {
    await this.kafkaProducer.connect();
    await this.kafkaProducer.send({
      topic: 'file-upload-topic',
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
    await this.kafkaProducer.disconnect();
  }
  
}
