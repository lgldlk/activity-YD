import { Act_proService } from './act_pro.service';
import { Controller, Post, Get, Body } from '@nestjs/common';

@Controller()
export class Act_proController {
  constructor(private readonly actProSer:Act_proService){

  }
  // @Post('try1')
  // try1(){
  //   return this.actProSer.trya();
  // }
  @Post('setObject')//新建项目
 async addActObject(@Body() body){
    let result={};
  await  this.actProSer.addPro(body).then((e)=>{
    result= {
      data:e.identifiers[0]['_id'],
      code:200
    };
   }
  ).catch((err)=>{
    result= result= {
      data:err,
      code:500
    };
  });
    return result;
  }
  @Get('getObject')//所有项目
  async  allObject(){
    let result={}
    await this.actProSer.AllPro().then(e=>{
      result={
        data:e,
        code:200
      }
    }
    ).catch(err=>{
      result={
        data:err,
        code:500
      }
    })
    return result;
  }
  @Post('deleteObj')//删除项目
  async  deleteObj(@Body() data){
    let result={}
    await this.actProSer.delPro(data).then(e=>{
      result={
        data:e,
        code:200
      }
    }).catch(err=>{
      result={
        data:err,
        code:500
      }
    });
    return result
  }
  @Post('objectAuth')//密码验证
  async objectAuth(@Body() data){
    let result={}
    await this.actProSer.objectAuth(data).then(e=>{
      result={
        data:e,
        code:200
      }
    }).catch(err=>{
      result={
        data:err,
        code:500
      }
    });
    return result;
  }
  @Post('getActivity')
  async getActivity(@Body() body){
    let result={}
    await this.actProSer.findSById(body.id).then(e=>{
      result={
        data:e,
        code:200
      }
    }).catch(err=>{
      result={
        data:String(err),
        code:500
      }}
    );
    return result;
  }
  
}
