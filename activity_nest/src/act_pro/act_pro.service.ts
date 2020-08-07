
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
   /**
   * 移动端获取数据 包括组件数据 以及页面高度
   * @param {string} name 项目路由名称
   */
  async getMobileData(name) {
    let proList=await this.act_ProDao.find({ where: { proType: "1",name:name} ,relations:['doms']});
    proList=modJson(proList);
    if(proList.length>.0){
      let result:any=proList[0];
      result.doms.map((temp)=>{
        temp.css=JSON.parse(temp.css);
        temp.option=JSON.parse(temp.option);
        temp.animation=JSON.parse(temp.animation);
      });
      return Promise.resolve({
        objHeight: result.height,
        background: result.background,
        textName: result.textName,
        datas:result.doms
      });
    }
    return Promise.reject('无此项目，请检查项目名');
  }


  async allTemplate(){//所有模板
    let proList=await this.act_ProDao.find({ where: { proType: "2"} });
    proList=modJson(proList);
    return Promise.resolve(proList);
  }
  async addTemplate(data){
    const ActivityList = await this.act_ProDao.find({
      name: data.name,
      proType:"2",
    })

    if (ActivityList.length > 0) {
      return Promise.reject('当前项目已经存在')
    }
      let tmp= await this.act_ProDao.insert({
          ...data,
          proType:"2",
          time: new Date().getTime(),
      })
      return Promise.resolve('模板创建完成')
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
      proType:"1",
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

  
  async delTemplate(data){//删除模板
    let {id}=data;
    let objectData=await this.act_ProDao.findOne({_id:id});
    if(objectData!=null){
      let tmp=await this.act_ProDao.find({where:{_id:id},relations:['doms']});
      tmp=modJson(tmp);
      await  this.act_DataDao.remove(tmp[0].doms);
     await this.act_ProDao.delete({_id:id});
       return Promise.resolve("删除成功");
    }else{
      return Promise.reject('此模板也被删除')
    }
  }
  async delPro(data){//删除项目
    let {id,password}=data;
    let objectData=await this.act_ProDao.findOne({_id:id});
    if(objectData.password.trim()==''||objectData.password==password){
      let tmp=await this.act_ProDao.find({where:{_id:id},relations:['doms']});
      tmp=modJson(tmp);
      await  this.act_DataDao.remove(tmp[0].doms);
     await this.act_ProDao.delete({_id:id});
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



  async findSById(proId){//根据ID获取项目或模板
    let result=await this.act_ProDao.find({where:{_id:proId},relations:['doms']});
    result=modJson(result);
    if(result.length<0){
      return Promise.reject('无此项目');
    }
    result[0].doms.map((temp)=>{
      temp.css=JSON.parse(temp.css);
      temp.option=JSON.parse(temp.option);
      temp.animation=JSON.parse(temp.animation);
    });
    if (result[0].password.trim()!="") {
      result[0].password = "1"
    } else {
      result[0].password = "0"
    }
    return Promise.resolve(result[0]);
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
        {_id:parentId },
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
      //遍历数据将对象转为文本
      const newData = []
      let tmp=await this.act_ProDao.find({where:{_id:parentId},relations:['doms']});
      tmp=modJson(tmp);
      await this.act_DataDao.remove(tmp[0].doms);
      await template.map(async (temp) => {
        
        temp.css=JSON.stringify(temp.css);
        temp.option=JSON.stringify(temp.option);
        temp.animation=JSON.stringify(temp.animation);
        temp.pro=tmp[0];
        newData.push({
          ...temp,
        })
        return true
      })
      // console.log(newData);
      // 更新项目组件数据
       this.act_DataDao.save(newData);

      return Promise.resolve(parentRouterName);
    } else {
      return Promise.reject('密码错误不允许修改')
    }
  }
  async saveSingleComplate(data){
    if (data.compName == '') {
      return Promise.reject('请填写组件保存名')
    }
    let isexist = await this.com_DataDao.find({
      compName: data.compName
    })
    if (isexist.length > 0) {
      return Promise.reject('该组件名已经存在')
    }
    data.css=JSON.stringify(data.css);
    data.option=JSON.stringify(data.option);
    data.animation=JSON.stringify(data.animation);
     await this.com_DataDao.save(data)
     return Promise.resolve('组件保存成功');
  }

  async getComplate(){
    let result:any=await this.com_DataDao.find();
    result=modJson(result);
    await result.map((temp)=>{
      temp.css=JSON.parse(temp.css);
      temp.option=JSON.parse(temp.option);
      temp.animation=JSON.parse(temp.animation);
    })
    return Promise.resolve(result);
  }
  async updateSingComp({id,compName}){
    return await this.com_DataDao.update(
      { _id: id },
      { compName: compName }
    )
  }
  async deletesingComp({id}) {
    return await this.com_DataDao.delete({
      _id: id
    })
  }
}
