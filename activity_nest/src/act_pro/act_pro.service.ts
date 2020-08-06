
import { Injectable } from '@nestjs/common';
import { Act_Data } from './activityData.entity';
import { actPro } from './act_pro.entity';
import { comData } from './comData.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { modJson } from './util';

@Injectable()
export class Act_proService {
   constructor(@InjectRepository(Act_Data)
  private readonly act_DataDao:Repository<Act_Data>,
  @InjectRepository(actPro)
  private readonly act_ProDao:Repository<actPro>,
  @InjectRepository(comData)
  private readonly com_DataDao:Repository<comData>,
  ){


  }
  async AllPro(){//所有项目
    let proList=await this.act_ProDao.find({ where: { proType: "1"} });
    proList=modJson(proList);
    proList.map((res, index) => {
      if (res.password.trim()!="") {
        res.password = "1"
      } else {
        res.password = "0"
      }
    })
    return proList
  }
  async addPro(data){
    const ActivityList = await this.act_ProDao.find({
      name: data.name,
    })

    if (ActivityList.length > 0) {
      return Promise.reject('当前项目已经存在')
    }
      let tmp= await this.act_ProDao.insert({
          ...data,
          proType:"1",
          height: 667,
          background: 'rgba(255, 255, 255, 1)',
          time: new Date().getTime(),
      })
      return tmp;
  }

  async delPro(data){//删除项目
    let {id,password}=data;
    let objectData=await this.act_ProDao.findOne({_id:id});
    if(objectData.password.trim()==''||objectData.password==password){
      await this.act_ProDao.delete({_id:id});
        /*

            对应dom数据库删除等会再做

        */
       return Promise.resolve("删除成功");
    }else{
      return Promise.reject('密码错误')
    }
  }
          /**
         * 项目效验
         * @param {String}} pass
         */
      async objectAuth(data) {
          let objectData = await this.act_ProDao.findOne({
              _id: data.id,
          })
          if (objectData.password == data.password) {
              return Promise.resolve(true);
          } else {
              return Promise.reject('密码错误');
          }
      }
  async addAct_Data(aData:any){


  }
  async getAct_Data(){
    let tmp=await this.act_DataDao.find();
    //tmp.content=JSON.parse(tmp.content);
    return tmp;
  }
  // async trya(){
  //   // const try1=new Act_Data();
  //   // try1.css="asdff"
  //   // try1.activityId='';
  //   let result:any=await this.act_ProDao.find({where:{_id:6},relations:['doms']});
  //   result=modJson(result)[0];
  //   const try2=new Act_Data();
  //   try2.css="asdff"
  //   // await this.act_DataDao.save(try1);
  //   try2.pro=result;
  //   await this.act_DataDao.save(try2);
    
  //   // const tryP=new actPro();
  //   // tryP.background="0000"
  //   // tryP.doms=[try1,try2];
  //   // await this.act_ProDao.save(tryP);
  //   // return await this.act_ProDao.find({relations:['doms']});

  //   // return (result[0].doms);
  //  // result.doms.push(try2);
  //  // await this.act_DataDao.save(result);
  //   return await this.act_ProDao.find({where:{_id:6},relations:['doms']});
  // }



  async findSById(proId){
    let result=await this.act_ProDao.find({where:{_id:proId},relations:['doms']});
    result=modJson(result);
    if(result.length<0){
      return Promise.reject('无此项目');
    }
    return Promise.resolve(result);
  }
  async setActivityData(data) {
    const {
      titlePage,
      password,
      parentId,
      parentName,
      parentRouterName,
      commHeight,
      template,
      background,
      parentDisp,
      defaultLeft,
    } = data
    let objectData = await this.act_ProDao.findOne({
      _id: parentId,
    })
    // 效验密码
    if (objectData.password.trim()=='' || objectData.password == password) {
      // 更新项目数据
      await this.act_ProDao.update(
        { _id: parentId },
        {
          height: commHeight,
          background,
          titlePage,
          textName: parentName,
          name: parentRouterName,
          disp: parentDisp,
          defaultLeft,
        }
      )
      // 遍历数据将对象转为文本
      const newData = []
      template.map((temp) => {
        temp.css=JSON.stringify(temp.css);
        temp.option=JSON.stringify(temp.option);

        newData.push({
          ...temp,
        })
        return true
      })
      // 更新项目组件数据
      return await this.ctx.model.ActivityData.create(newData).then(
        () => parentRouterName // 将项目名称返回出去
      )
    } else {
      return Promise.reject(new Error('密码错误不允许修改'))
    }
  }

}
