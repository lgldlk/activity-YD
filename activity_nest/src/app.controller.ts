import { Controller, Get, UseInterceptors, Post, UploadedFile, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('uploadimg')
  @UseInterceptors(FileInterceptor('file')) // file对应HTML表单的name属性
  UploadedFile(
    @UploadedFile() file,
   @Body() body){
    let fileName='i'+this.ran(5)+ `${file.originalname}`;
    const writeImage = createWriteStream(join(__dirname, '..','/public/image',fileName))
        writeImage.write(file.buffer)
    return {imgUrl:fileName};
  }
  ran(m) {
    m = m > 13 ? 13 : m;
    var num = new Date().getTime();
    return num.toString().substring(13 - m);

  }

}