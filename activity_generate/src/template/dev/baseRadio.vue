<!--
 * @Author: your name
 * @Date: 2020-02-24 16:09:57
 * @LastEditTime: 2020-03-21 19:19:36
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/template/dev/baseDiv.vue
 -->
<template>
  <!-- <div class="base_img" @mouseover="toggleEdit" > -->
  <div  @mousedown="toggleEdit" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <edit v-show="editStatus" :id="id" :styles="constyle">
      <label :style="style" class="base_radio">
        <input disabled
          :style="frameRect"
         type="radio"
         :name="option.formName"
         :value="option.itemValue" >
         <span>{{option.text}}</span>
         </label>
    </edit>
    <!-- 鼠标进入状态 -->
    <div
      v-show="hoverStatus && !editStatus"
      :style="constyle"
      :class="hoverStatus && absolute ? ' hoverTemplate' : ''"
    >
      <label :style="style" class="base_radio">
        <input
         type="radio"
         disabled
         :name="option.formName"
         :value="option.itemValue"
         :style="frameRect"
         >
        <span>{{option.text}}</span>
         </label>
    </div>
    <!-- 未选中状态 -->
    <label :style="style" v-show="!editStatus & !hoverStatus"
      :class="absolute ? 'baseComplate' : ''" 
      class="base_radio">
    <input
      type="radio"
      :name="option.formName"
      :style="frameRect"
         :value="option.itemValue">
      <span>{{option.text}}</span>
      </label>
  </div>
</template>

<script>
import { handleStyle } from "@/utils/index";
import edit from "@/components/edit/index";
export default {
  components: {
    edit
  },
  props: {
    id: {
      type: String
    },
    css: {
      type: Object,
      default: () => {}
    },
    option: {
      type: Object,
      default: () => {}
    },
    absolute: {
      type: Boolean
    }
  },
  computed: {
    style() {
      let style = handleStyle(this.css);
      return {
        top: style.top,
        left: style.left,
        zIndex: style.zIndex,
        color:style.color,
        'fontSize':style['fontSize']
      };
    },
    constyle() {
      let style = handleStyle(this.css);
      return {
        top: style.top,
        left: style.left,
        // width: style.width,
        // height: style.height,
        zIndex: style.zIndex
      };
    },
    frameRect(){
      return{
        width:this.css.frameWidth+'px',
        height:this.css.frameWidth+'px',
      }
    },
    editStatus() {
      return this.$store.state.core.activeTemplate.includes(this.id);
    },
    hoverStatus() {
      return this.$store.state.core.hoverTemplate == this.id;
    }
  },
  methods: {
    toggleEdit() {
      this.$store.commit("core/toggle_temp_status", this.id);
      this.$store.dispatch("core/updateisDown", true);
    },
    mousedown(e) {
      e.preventDefault();
    },
    mouseenter() {
      this.$store.commit("core/set_hoverTemplate", this.id);
    },
    mouseleave() {
      this.$store.commit("core/set_hoverTemplate", "");
    }
  }
};
</script>

<style lang="less" scoped>
.base_radio {
  margin-top: 1px;
}
.base_radio > input[type=radio] span {
        vertical-align: middle;
}
.base_radio::before{
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right:0;
}
.base_radio> input[type=radio] {
        vertical-align: middle;
         margin-top:-2px;
        margin-bottom:1px;
}
</style>
