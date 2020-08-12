<template>
  <!-- <div class="base_img" @mouseover="toggleEdit" > -->
    <label :style="style"
     class="baseComplate base_check"
      >
    <input
      type="checkbox"
      :name="option.formName"
      @click="setRadioCache"
      :style="frameRect"
         :value="option.itemValue">
      {{option.text}}
      </label>
</template>

<script>
import { handleStyle } from "@/utils/index";
export default {
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
  },
  methods:{
    setRadioCache(){
      this.$emit("addFormCache", 2,this.option.formName,this.option.itemValue);
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
    frameRect(){
      return{
        width:this.css.frameWidth+'px',
        height:this.css.frameWidth+'px',
      }
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
  },
};
</script>

<style  scoped>
.base_check {
  margin-top: 1px;
}
.base_check > input[type=checkbox] span {
        vertical-align: middle;
}
.base_check> input[type=checkbox] {
        vertical-align: middle;
}
</style>
