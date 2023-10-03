import { Module } from '@nestjs/common';
import { FileUploadController } from './file.controller';
import { MessageProducerService } from './message-producer.service';


@Module({
  controllers: [FileUploadController],
  providers:[MessageProducerService]
})
export class FileModule {}
