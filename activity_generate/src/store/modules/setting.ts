import { Module } from 'vuex'
import { message } from 'ant-design-vue'
interface setting {
  copyTemplate: any[] // 复制暂时存储区
  coreinfo: {
    // 上方菜单
    icon: object
    openIcon?: object
    text: string
    click: boolean
  }[]
  scale: number // 放大/缩小
  backgroundLine: boolean
  coreMode:string
  rMenuShow:{
    chooseId:string,
    openX:number,
    openY:number,
    isShow:boolean,
  },
  coreCanvas:{
    x:number,
    y:number
  }
}

const Setting: Module<setting, any> = {
  namespaced: true,
  state: {
    copyTemplate: [],
    coreinfo: [
      {
        icon: require('@/assets/cancel.png'),
        text: '撤销',
        click: true
      },
      {
        icon: require('@/assets/uncancel.png'),
        text: '反撤销',
        click: true
      },
      {
        icon: require('@/assets/copy.png'),
        text: '复制',
        click: false
      },
      {
        icon: require('@/assets/paste.png'),
        text: '粘贴',
        click: false
      },
      {
        icon: require('@/assets/delete.png'),
        text: '删除',
        click: false
      },
      {
        icon: require('@/assets/close_eye.png'),
        openIcon: require('@/assets/open_eye.png'),
        text: '背景线',
        click: true
      },
      {
        icon: require('@/assets/upZindex.png'),
        text: '加层级',
        click: false
      },
      {
        icon: require('@/assets/downZindex.png'),
        text: '减层级',
        click: false
      },
      {
        icon: require('@/assets/zoom.png'),
        text: '放大',
        click: true
      },
      {
        icon: require('@/assets/zoomout.png'),
        text: '缩小',
        click: true
      }
    ],
    scale: 1,
    backgroundLine: true,
    coreMode:'dev',
    rMenuShow:{
      chooseId:'',
      openX:0,
      openY:0,
      isShow:false,
    },
    coreCanvas:{
      x:0,
      y:0
    }
  },
  mutations: {
    set_copy(state, data) {
      console.log(data);
      state.copyTemplate = data
    },
    set_coreinfoItem(state, { index, status }) {
      state.coreinfo[index].click = status
    },
    set_scale(state, number) {
      if (state.scale + number >= 1.6) {
        message.warning('最多放大150%')
      } else if (state.scale + number <= 0.3) {
        message.warning('最多缩小30%')
      } else {
        state.scale = state.scale + number
      }
    },
    toggle_backgroundLine(state) {
      state.backgroundLine = !state.backgroundLine
    },
    changeCoreMode(state,modeType){
      if(modeType=="dev"||modeType=='prod'){
        state.coreMode=modeType;
      }
    },
    closeRightMenu(state){
      state.rMenuShow.openX=0;
      state.rMenuShow.openY=0;
      state.rMenuShow.isShow=false;
    },
    openRightMenu(state,{chooseId,openX,openY}){
      state.rMenuShow.chooseId=chooseId;
      state.rMenuShow.openX=openX-state.coreCanvas.x;
      state.rMenuShow.openY=openY-state.coreCanvas.y;
      state.rMenuShow.isShow=true;
    },
    setCoreCanvasXY(state,{x,y}){
      state.coreCanvas.x=x;
      state.coreCanvas.y=y;
    }
  },
  actions: {
    acitveSet({ commit, state, rootState }, index) {}
  }
}

export default Setting
