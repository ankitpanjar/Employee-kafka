import { Injectable, OnModuleInit } from '@nestjs/common';
import { async } from 'rxjs';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';

@Injectable()
export class UpdateConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    this.consumerService.consume(
      'update-client',
      { topic: 'update-employee' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            source: 'update-consumer',
            message: message.value.toString(),
            partition: partition.toString(),
            topic: topic.toString(),
          });
        },
      },
    );
  }
}