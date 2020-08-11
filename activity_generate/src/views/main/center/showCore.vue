<template>
  <div class="core" :style="{
      height: `${commHeight}px`,
      background: background
    }">
    <component
      v-for="(item, index) in template"
      :key="index"
      :is="item.name"
      :css="{...item.css,...item.animation}"
      :option="{...item.option,'domType':item.name}"
      :ref="getRef(item)"
      v-show="item.isShow"
      @submitForm="submitForm"
      @addFormCache="addFormCache"
    ></component>
  </div>
</template>

<script >
// 组件源
import Vue from "vue";
import axios from "axios";
import baseButtom from "@/template/prod/showButtom.vue";
import baseImg from "@/template/prod/showImg.vue";
import baseText from "@/template/prod/showText.vue";
import baseInput from "@/template/prod/showInput.vue";
import baseDiv from "@/template/prod/showDiv.vue";
import baseSwiper from "@/template/prod/showSwiper.vue";
import baseRadio from "@/template/prod/showRadio.vue";
import auxiliaryLine from "@/components/auxiliary-line/index.vue";

export default Vue.extend({
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    auxiliaryLine,
    baseSwiper,
    baseDiv,
    baseRadio
  },
  mounted() {
    (this ).init();
  },
  computed: {
    template() {
      return this.$store.state.core.template;
    },
    commHeight() {
      (this ).init();
      return this.$store.state.core.commHeight;
    },
    background() {
      return this.$store.state.core.background;
    }
  },
  data(){
    return{
      radioCache:{},
      checkCache:{},
    }
  },
  methods: {
    init() {},
    refForm(){
      
    },
    addFormCache(type,formName,value){
      if(type==1){
        this.radioCache[formName]=value;
      }
    },
    getRef(item){
      if(item.name=='base-input'||item.name=='base-radio'){
        return item.option.formName;
      }
      return item._id;
    },
    submitForm(formList) {
      let { refInput, inputFromUrl, urlMethod } = formList;
      let formData = {};
      refInput.map(e => {
        if(this.$refs[e][0].option.domType=="base-input"){
          formData[e] = this.$refs[e][0].$el.value;
        }else if(this.$refs[e][0].option.domType=="base-radio"){
          formData[e]=this.radioCache[e]|""
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
          if (e.data.code == 200) {
            this.$message.success(e.data.data);
          } else {
            this.$message.error("接口出现错误");
          }
        })
        .catch(err => {
          this.$message.error("网络出了小差.....");
        });
    }
  }
});
</script>

<style lang="less" scoped>
.core {
  width: 375px;
  position: relative;
  background-color: white;
  margin-top: 50px;
  transform-origin: top;
  #canvas {
    position: absolute;
  }
}
</style>
