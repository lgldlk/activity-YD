<template>
  <!-- <div class="base_img" @mouseover="toggleEdit" > -->
    <label :style="style"
     class="baseComplate"
      
      >
    <input
      type="radio"
      :name="option.formName"
      @click="setRadioCache"
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
      this.$emit("addFormCache", 1,this.option.formName,this.option.itemValue);
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
  },
};
</script>

<style lang="less" scoped>

</style>
