<template>
  <div class="core" :style="{ height: coreHeigth, background: background }">
    <!-- baseEditor -->
    <component
      v-for="(item, index) in template"
      :key="index"
      :is="item.name"
      :id="item.activityId.toString()"
      :css="{...item.css,...item.animation}"
      :animation="item.animation"
      :option="{...item.option,'domType':item.name}"
      v-if="item.isShow"
      :text="item.text"
      :ref="getRef(item)"
      @form="form"
      @addFormCache="addFormCache"
    ></component>
  </div>
</template>

<script>
import { getTemplate } from "../api/index";
import baseButtom from "../template/baseButtom";
import baseImg from "../template/baseImg";
import baseText from "../template/baseText";
import baseInput from "../template/baseInput";
import baseDiv from "../template/baseDiv";
import baseSwiper from "../template/baseSwiper";
import baseRadio from '../template/baseRadio';
import baseCheck from '../template/baseCheck'
import { isSoftKeyboard,setLocalStore,getLocalStore } from "../utils/index";
import app from "../store/modules/app";
import axios from "axios";
export default {
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    baseDiv,
    baseSwiper,
    baseRadio,
    baseCheck
  },
  mounted() {
    this.init();
    this.ListeKeyboard();
  },
  computed: {
    coreHeigth() {
      return `${this.height / this.baseHeight}vh`;
    }
  },
  data() {
    return {
      template: [],
      height: 667,
      background: "white",
      baseHeight: 6.67,
      radioCache:{},
      checkCache:{},
    };
  },
  methods: {
    addFormCache(type,formName,value){
      if(type==1){
        this.radioCache[formName]=value;
      }else if(type==2){
        if(this.checkCache[formName]==undefined||this.checkCache[formName]==null){
          this.checkCache[formName]=[value];
        }else{
          if(this.checkCache[formName].includes(value)){
            this.checkCache[formName]
            .splice(this.checkCache[formName].indexOf(value), 1);
          }else{
            this.checkCache[formName].push(value);
          }
        }
      }
    },
    getRef(item){
      if(item.name=='base-input'||item.name=='base-radio'||item.name=='base-check'){
        return item.option.formName;
      }
      return item._id;
    },
    form(formList) {
      let { refInput, inputFromUrl, urlMethod ,domId,formOne} = formList;
      let formData = {};
      let flyResult=getLocalStore('flyOne');
      if(flyResult==null||flyResult==undefined){
        flyResult=[];
      }else if(formOne&&flyResult.includes(domId)){
        this.$Toast("您已经提交一次了");
        return ;
      }
      refInput.map(e => {
        if(this.$refs[e]==undefined){
          return ;
        }
        if(this.$refs[e][0].option.domType=="base-input"){
          formData[e] = this.$refs[e][0].$el.value;
        }else if(this.$refs[e][0].option.domType=="base-radio"){
          formData[e]=this.radioCache[e]||""
        }else if(this.$refs[e][0].option.domType=="base-check"){
          formData[e]=this.checkCache[e]||[];
        }
      });
      // for (const key in formData) {
      //   if (formData[key] == "") {
      //     this.$message.warning("请完善表单");
      //     return false;
      //   }
      // }
      let request;
      if (urlMethod == "get") {
        request = {
          url: inputFromUrl,
          method: "get",
          params: formData
        };
      } else {
        request = {
          url: inputFromUrl,
          method: "post",
          data: formData
        };
      }
      axios
        .request(request)
        .then(e => {
            this.$Toast("发送成功");
            if(formOne){
              flyResult.push(domId);
              setLocalStore('flyOne',flyResult);
            }
        })
        .catch(err => {
          this.$Toast("网络出了小差.....");
        });
    },
    // 初始化
    init() {
      let name = this.$route.params.name;
      getTemplate(name).then(e => {
        console.log(e);
        if (e.data.code == 200) {
          this.template = e.data.data.datas;
          this.height = e.data.data.objHeight;
          this.background = e.data.data.background;
          document.title = e.data.data.textName;
        }
      });
    },
    // 监听移动端软键盘
    ListeKeyboard() {
      var originHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      window.addEventListener(
        "resize",
        () => {
          var resizeHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
          if (originHeight < resizeHeight) {
            if (app.state.isSoftKeyboard) {
              this.$store.commit("app/changeKeyboard", false);
            }
          } else {
            if (!app.state.isSoftKeyboard) {
              this.$store.commit("app/changeKeyboard", true);
            }
          }
          originHeight = resizeHeight;
        },
        false
      );
    }
  }
};
</script>

<style>
.core {
  overflow-x: hidden;
  position: relative;
  margin: 0px;
  padding: 0px;
  height: 100vh;
}
</style>