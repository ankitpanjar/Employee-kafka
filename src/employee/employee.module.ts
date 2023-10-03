import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { ConsumerService } from 'src/kafka/consumer/consumer.service';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { CreateConsumer } from './create.consumer';
import { UpdateConsumer } from './update.consumer';

@Module({
    imports:[KafkaModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, CreateConsumer, UpdateConsumer]
})
export class EmployeeModule {}
