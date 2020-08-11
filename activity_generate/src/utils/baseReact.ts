// 虚拟元素的映射
import { guid } from './utils'
interface baseNode {
  activityId: String
  editStatus: false
  name: String
  covName:String
  option?: Object
  css: Object
  animation: Object,
  isShow:boolean,
}


/**
 * 按钮的vuex数据映射关系
 */
export function baseDiv(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    activityId: guid(),
    editStatus: false,
    name: 'base-div',
    isShow:true,
    option: {
      colorType: false, // 1 普通模式 2 高级模式
    },
    covName:'',
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 100,
      height: 100,
      zIndex: store.maxZIndex,
      background: 'rgba(242, 242, 242, 1)',
      borderColor: 'rgba(0, 0, 0, 1)',
      borderStyle: 'solid',
      borderWidth: 0,
      borderRadius: 20,
    },
    animation: {
      animationName: '',
      animationDuration: 1000, // 动画时间
      animationDelay: 0, // 延迟时间
      animationIterationCount: 1, // 动画执行次数
      animationFillMode: 'both', // 动画停留最后一帧
    },
  }
}

/**
 * 按钮的vuex数据映射关系
 */
export function baseButtom(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    activityId: guid(),
    editStatus: false,
    name: 'base-buttom',
    covName:'',
    isShow:true,
    option: {
      text: '按钮',
      btnType: 0, // 0 无事件 1 外部链接 2 提交表单 3
      refInput: [], // 提交的input表单
      inputFromUrl: '', // 数据提交的地址
      urlMethod: 'get', // 提交格式
      QQNum: '', // qq客服
      PhoneNum: '', // 电话客福
      link: '', // 按钮点击跳转地址
      colorType: false, // 1 普通模式 2 高级模式
    },
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 100,
      height: 50,
      zIndex: store.maxZIndex,
      background: 'rgba(241, 241, 241, 1)',
      color: 'rgba(0, 0, 0, 1)',
      fontSize: 18,
      borderColor: 'rgba(0, 0, 0, 1)',
      borderStyle: 'solid',
      borderWidth: 0,
      borderRadius: 0,
    },
    animation: {
      animationName: '',
      animationDuration: 1000, // 动画时间
      animationDelay: 0, // 延迟时间
      animationIterationCount: 1, // 动画执行次数
      animationFillMode: 'both', // 动画停留最后一帧
    },
  }
}

/**
 * 图片的vuex数据映射关系
 */
export function baseImg(store: any, img: string): baseNode {
  let dynamic = store.template.length * 10
  return {
    activityId: guid(),
    editStatus: false,
    name: 'base-img',
    covName:'',
    option: {
      text: img,
    },
    isShow:true,
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 100,
      height: 50,
      zIndex: store.maxZIndex,
    },
    animation: {
      animationName: '',
      animationDuration: 1000, // 动画时间
      animationDelay: 0, // 延迟时间
      animationIterationCount: 1, // 动画执行次数
      animationFillMode: 'both', // 动画停留最后一帧
    },
  }
}

/**
 * 文本的vuex数据映射关系
 */
export function baseText(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    activityId: guid(),
    editStatus: false,
    name: 'base-text',
    covName:'',
    option: {
      text: '请修改此处的文字',
      colorType: false, // 1 普通模式 2 高级模式
    },
    isShow:true,
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 300,
      height: 33,
      zIndex: store.maxZIndex,
      background: 'rgba(255, 255, 255, 0)',
      border: 'none',
      color: 'rgba(0, 0, 0, 1)',
      fontSize: 24,
      fontWeight: 'normal', // bold
      fontStyle: 'normal', // italic
      textAlign: 'center',
      textDecoration: 'none', //underline
    },
    animation: {
      animationName: '',
      animationDuration: 1000, // 动画时间
      animationDelay: 0, // 延迟时间
      animationIterationCount: 1, // 动画执行次数
      animationFillMode: 'both', // 动画停留最后一帧
    },
  }
}

/**
 * 输入框的vuex数据映射关系
 */
export function baseInput(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    activityId: guid(),
    editStatus: false,
    name: 'base-input',
    isShow:true,
    covName:'',
    option: {
      text: '',
      formName: `input名称${store.template.length}`,
      placeholder: '',
      colorType: false, // 1 普通模式 2 高级模式
    },
    css: {
      'box-sizing': 'border-box',
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 150,
      height: 30,
      zIndex: store.maxZIndex,
      background: 'rgba(255, 255, 255, 1)',
      color: 'rgba(0, 0, 0, 1)',
      borderColor: 'rgba(0, 0, 0, 1)',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 1,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: 12,
    },
    animation: {
      animationName: '',
      animationDuration: 1000, // 动画时间
      animationDelay: 0, // 延迟时间
      animationIterationCount: 1, // 动画执行次数
      animationFillMode: 'both', // 动画停留最后一帧
    },
  }
}

/**
 * 轮播图vuex数据映射关系
 * @param store
 */
export function baseSwiper(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    activityId: guid(),
    editStatus: false,
    name: 'base-swiper',
    covName:'',
    isShow:true,
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      width: 350,
      height: 100,
      zIndex: store.maxZIndex,
    },
    option: {
      autoplay: '2000', // 轮播间隔
      item: [
        {
          img: require('@/assets/750-188.png'),
          link: '',
        },
      ],
    },
    animation: {
      animationName: '',
      animationDuration: 1000, // 动画时间
      animationDelay: 0, // 延迟时间
      animationIterationCount: 1, // 动画执行次数
      animationFillMode: 'both', // 动画停留最后一帧
    },
  }
}


export function baseRadio(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    activityId: guid(),
    editStatus: false,
    name: 'base-radio',
    covName:'',
    isShow:true,
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      zIndex: store.maxZIndex,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 1)',
      width:0,
      height:0
    },
    option: {
      text:'内容',
      formName:'radio名称相同的即为一组',
      itemValue:'选中对应值',
    },
    animation: {
      animationName: '',
      animationDuration: 1000, // 动画时间
      animationDelay: 0, // 延迟时间
      animationIterationCount: 1, // 动画执行次数
      animationFillMode: 'both', // 动画停留最后一帧
    },
  }
}


export function baseCheck(store: any): baseNode {
  let dynamic = store.template.length * 10
  return {
    activityId: guid(),
    editStatus: false,
    name: 'base-check',
    covName:'',
    isShow:true,
    css: {
      top: 10 + dynamic,
      left: 10 + dynamic,
      zIndex: store.maxZIndex,
      fontSize: 12,
      color: 'rgba(0, 0, 0, 1)',
      width:0,
      height:0
    },
    option: {
      text:'内容',
      formName:'check名称相同的即为一组',
      itemValue:'选中对应值',
    },
    animation: {
      animationName: '',
      animationDuration: 1000, // 动画时间
      animationDelay: 0, // 延迟时间
      animationIterationCount: 1, // 动画执行次数
      animationFillMode: 'both', // 动画停留最后一帧
    },
  }
}
// /**
//  * editor编辑vuex数据映射关系
//  * @param store
//  */
// export function baseEditor(store: any): baseNode {
//   let dynamic = store.template.length * 10
//   return {
//     activityId: guid(),
//     editStatus: false,
//     name: 'base-editor',
//     css: {
//       top: 10 + dynamic,
//       left: 10 + dynamic,
//       width: 350,
//       height: 100,
//       zIndex: store.template.length + 1,
//     },
//     option: {
//       html: '请输入文字',
//     },
//     animation: {
//       animationName: '',
//       animationDuration: 1000, // 动画时间
//       animationDelay: 0, // 延迟时间
//       animationIterationCount: 1, // 动画执行次数
//       animationFillMode: 'both', // 动画停留最后一帧
//     },
//   }
// }

/**
 * 将后台插件数据转换为页面数据
 * @param store vuex实例
 * @param data 常见市场数据
 */
export function baseComplate(store: any, data: any): baseNode {
  let dynamic: number = store.template.length * 10
  // 重置css位置
  data.css.top = 10 + dynamic
  data.css.left = 10 + dynamic
  data.css.zIndex = store.maxZIndex
  let compData: any = {
    activityId: guid(),
    editStatus: false,
    name: data.name,
    isShow:data.isShow,
    css: data.css,
    covName:'',
    animation: data.animation,
    option: data.option,
  }
  return compData
}

const domMapName = {                                                                        
  'base-input': "输入框",
  'base-div': "块级元素",
  'base-swiper': "轮播图",
  'base-text':"文本",
  'base-img':"图片",
  'base-buttom':"按钮",
  'base-radio':'单选框',
  'base-check':'复选框'
}
export function getBaseCovName(baseName:string):string{
   return domMapName[baseName] ||'元素';
}

