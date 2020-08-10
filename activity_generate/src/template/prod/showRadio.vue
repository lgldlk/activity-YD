<template>
  <!-- <div class="base_img" @mouseover="toggleEdit" > -->
    <label :style="style"
     class="baseComplate"
      >
    <input
      type="radio"
      :name="option.formName"
         :value="option.itemValue" >
      {{option.text}}
      </label>
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
  },
  data(){
    return{
      isChoose:false,
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
