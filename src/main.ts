import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MessageConsumerService } from './file/message-consumer.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const messageConsumerService = app.get(MessageConsumerService);
  await messageConsumerService.listenForMessages();
  await app.listen(3000);
  
}
bootstrap();
