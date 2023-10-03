import { Injectable, OnModuleInit } from '@nestjs/common';
import { async } from 'rxjs';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';

@Injectable()
export class CreateConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    this.consumerService.consume(
      'create-client',
      { topic: 'create-employee' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            source: 'create-consumer',
            message: message.value.toString(),
            partition: partition.toString(),
            topic: topic.toString(),
          });
        },
      },
    );
  }
}