import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageProducerService } from './message-producer.service';
// import { FileInterceptor } from 'multer';
import * as fs from 'fs'


@Controller('file')
export class FileUploadController {
  constructor(private readonly messageProducerService: MessageProducerService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
 // create directory if doesn't exist
   
 const uploadDirectory='./upload'
    
    if(!fs.existsSync(uploadDirectory)){
        fs.mkdirSync(uploadDirectory)
    }

    // saving the uploaded file into the specific directory
    fs.writeFileSync(`${uploadDirectory}${file.originalname}`,file.buffer)
    
    // Send a Kafka message when the file is uploaded
    await this.messageProducerService.sendMessage({
      filename: file.originalname,
      size: file.size,
    });
    
    return { message: 'File uploaded successfully' };
  }
  // @Post('file')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFileDemo(@UploadedFile(
  //   // validation of uploading file 
  //   // new ParseFilePipe({
  //   //     validators:[
  //   //         new MaxFileSizeValidator({maxSize:5000000000}),
  //   //         // new FileTypeValidator({fileType:'images/jpeg'})
  //   //     ],
  //   // })
  // ) file: Express.Multer.File) {
  //   await this.messageProducerService.uploadFile(file.originalname, file.buffer);
  //   return { message: 'File uploaded successfully' };
  // }
}

