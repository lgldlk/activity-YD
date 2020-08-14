<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-05-10 21:52:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/views/main/left/components/page.vue
 -->
<template>
  <div class="page">
    <div class="page_item">
      <div class="page_form">
        <div class="page_form_item">
          <div class="item_left">页面高度:</div>
          <div class="item_right">
            <div class="attr_item">
            <a-slider
              :value="sliderHight"
              :tipFormatter="formatter"
              @change="sliderChange"
              :step="0.1"
              :min="1"
              :max="5"
              class='attr_slider'
            ></a-slider>
            <a-input-number 
            class="attr_mintextarea" 
            placeholder="请输入高度" 
            :value="sliderHight.toFixed(1)" 
            :step="0.1"
              :min="1"
              :max="5"
              :precision="1"
            @change="sliderChange"/>
            </div>
          </div>
        </div>
        <div class="page_form_item">
          <div class="item_left">背景色:</div>
          <div class="item_right">
            <el-color-picker v-model="background" show-alpha></el-color-picker>
          </div>
        </div>
        <div class="page_form_item">
          <div class="item_left">网页名称:</div>
          <div class="item_right">
            <a-input v-model="parentName" placeholder="请输入网页名"></a-input>
          </div>
        </div>
        <div class="page_form_item">
          <div class="item_left">路由名:</div>
          <div class="item_right">
            <a-input v-model="parentRouterName" placeholder="请输入路由名"></a-input>
          </div>
        </div>
        <div class="page_form_item">
          <div class="item_left">项目描述:</div>
          <div class="item_right">
            <a-textarea v-model="parentDisp" placeholder="请输入描述" :rows="2" />
          </div>
        </div>
        <div class="page_form_item">
          <div class="item_left">动态组件内容设定:</div>
          <a-button type="primary" @click="openCodeDrawer">点击编辑</a-button>
        </div>
        <a-drawer
          title="页面内容动态定义"
          width="1000"
          placement="left"
          :closable="true"
          :visible="codeDrawer"
          @close="closeCodeDrawer"
        >
        <div class="initSet_intro">
          <div>
          <el-tag  type="info">讲请求或计算的结果放置于pageData的属性上，在手机端会自动注入。如pageData.aaa="123";则该aaa名称的文本内容会变为123
          </el-tag>
          <el-tag type="info">
            若要更改单选框和多选框的内容，请用数组的形势，数组的顺序与添加组件的顺序相同 如pageData.x[0]="123",pageData.x[1]="123453"
          </el-tag>
          </div>
          <a-button type="primary" @click.stop="initSetSave">
            <a-icon type="project" />保存
          </a-button>
        </div>
          <monaco-editor
            width="950"
            height="1200"
            v-model="initSet"
            language="javascript"
            :options="options"
          ></monaco-editor>
        </a-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import { commHeight } from "@/config";
import MonacoEditor from "monaco-editor-vue";
import "monaco-editor/esm/vs/editor/contrib/find/findController.js";
export default {
  components: {
    MonacoEditor
  },
  data() {
    return {
      codeDrawer: false,
      options: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false, // 只读
        cursorStyle: "line", // 光标样式
        automaticLayout: false, // 自动布局
        glyphMargin: true, // 字形边缘
        useTabStops: false,
        fontSize: 14, // 字体大小
        autoIndent: false, // 自动布局
      },
      initSetCache:"",
    };
  },
  computed: {
    sliderHight:{
      get(){
      return Number(this.$store.state.core.commHeight / commHeight);
      }
    },
    background: {
      get() {
        return this.$store.state.core.background;
      },
      set(newColor) {
        this.$store.commit("core/updateBackground", newColor);
      }
    },
    parentName: {
      get() {
        return this.$store.state.core.parentName;
      },
      set(value) {
        this.$store.commit("core/set_objectName", value);
      }
    },
    parentRouterName: {
      get() {
        return this.$store.state.core.parentRouterName;
      },
      set(value) {
        this.$store.commit("core/set_parentRouterName", value);
      }
    },
    parentDisp: {
      get() {
        return this.$store.state.core.parentDisp;
      },
      set(value) {
        this.$store.commit("core/set_parentDisp", value);
      }
    },
    initSet: {
      get() {
        return this.$store.state.core.initSet;
      },
      set(value) {
        this.initSetCache=value;
      }
    }
  },
  methods: {
    formatter(value) {
      return `${value}屏`;
    },
    initSetSave(){
      this.$store.commit("core/updateInitSet", this.initSetCache);
    },
    sliderChange(value) {
      console.log(value);
      // if(value<1){
      //   return;
      // }
      this.$store.commit(
        "core/updateCommHeigth",
        (Number(value) * commHeight).toFixed(0)
      );
    },
    closeCodeDrawer() {
      this.codeDrawer = false;
    },
    openCodeDrawer() {
      this.codeDrawer = true;
    },
    codeChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  height: 700px;
  .page_item {
    margin-top: 10px;
    margin-left: 10px;
    .page_title {
      font-weight: bold;
    }
    .page_form {
      .page_form_item {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        .item_left {
          text-align: right;
          margin-right: 10px;
          width: 70px;
        }
        .item_right {
          width: 160px;
        }
        .item_other {
          margin-left: 10px;
          color: rgb(179, 179, 179);
          font-size: 12px;
        }
      }
    }
    .attr_item{
       display: flex;
       align-items: center;
    }
    .attr_slider {
      width: 100px;
    }
    .attr_mintextarea {
      margin-left: 2px;
      width: 64px;
    }
  }
}
.initSet_intro{
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}
</style>