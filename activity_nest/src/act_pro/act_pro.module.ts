import { BASE_URL } from './../config/config';
import { Act_proController } from './act_pro.controller';
import { Act_proService } from './act_pro.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act_Data } from './activityData.entity';
import { actPro } from './act_pro.entity';
import { comData } from './comData.entity';
import { imageEntity } from './image.entity';




@Module({
    imports:[TypeOrmModule.forRoot({
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
        Act_proController, ],
    providers: [
        Act_proService,],
})
export class Act_proModule {}
