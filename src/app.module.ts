import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { KafkaModule } from './kafka/kafka.module';
import { EmployeeModule } from './employee/employee.module';
import { KafkaModule } from './kafka/kafka.module';
import { FileModule } from './file/file.module';
import { MessageConsumerService } from './file/message-consumer.service';

@Module({
  imports: [EmployeeModule, KafkaModule, FileModule],
  controllers: [AppController],
  providers: [AppService,MessageConsumerService],
})
export class AppModule {}
