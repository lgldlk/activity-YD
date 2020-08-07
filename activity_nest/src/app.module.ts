import { ImageService } from './image.service';

import { ImageManangeController } from './act_pro/imagemanange.controller';
import { Act_proModule } from './act_pro/act_pro.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASE_URL } from './config/config';
import { Act_Data } from './act_pro/activityData.entity';
import { actPro } from './act_pro/act_pro.entity';
import { comData } from './act_pro/comData.entity';
import { imageEntity } from './act_pro/image.entity';


@Module({
  imports: [
        Act_proModule, 
        TypeOrmModule.forRoot({
            type: 'mysql',
           // host: '121.36.37.117',
            host:BASE_URL,
            port: 3306,
            username: 'lgldl',
            password: 'lgldl',
            database: 'activity_pro',
            entities: [
                Act_Data,actPro,comData,imageEntity
            ],
            synchronize: true,
          }),
             TypeOrmModule.forFeature([Act_Data,actPro,comData,imageEntity])
          
        ],
  controllers: [
        ImageManangeController, AppController],
  providers: [
         AppService,ImageService],
})
export class AppModule {}
