<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:37
 * @LastEditTime: 2020-04-10 10:27:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_mobile/src/template/baseButtom.vue
 -->
<template>
  <button
    class="baseComplate"
    :class="animation.animationName"
    :style="style"
    @click="gotoLink"
  >{{ option.text }}</button>
</template>

<script>
import { handleStyle } from "../utils/index";
export default {
  props: {
    link: {
      type: String
    },
    css: {
      type: Object,
      default: {}
    },
    option: {
      type: Object,
      default: {}
    },
    animation: {
      type: Object
    },
    id:{
      type:String,
    }
  },
  computed: {
    style() {
      let keyword = this.$store.state.app.isSoftKeyboard;
      return handleStyle(this.css, keyword);
    }
  },
  methods: {
    gotoLink() {
      if (this.option.btnType == 0) {
      } else if (this.option.btnType == 1) {
        if (this.option.link) {
          location.href = this.option.link;
        }
      } else if (this.option.btnType == 2) {
        this.$emit("form", {
          refInput: this.option.refInput,
          mustInput:this.option.mustInput,
          inputFromUrl: this.option.inputFromUrl,
          urlMethod: this.option.urlMethod,
          domId:this.id,
          formOne:this.option.formOne,
        });
      }else if (this.option.btnType == 3) {
        console.log("qq客服");
        window.location.href =
          "http://wpa.qq.com/msgrd?v=3&uin=2467230789&site=qq&menu=yes";
      } else if (this.option.btnType == 4) {
        console.log("电话客服");
        location.href = "tel:10086";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.btn_con {
  user-select: none;
}
</style>