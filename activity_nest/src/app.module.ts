import { Act_proModule } from './act_pro/act_pro.module';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
        Act_proModule, 
        ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
