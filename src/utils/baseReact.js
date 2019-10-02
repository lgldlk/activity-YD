import core from "../store/modules/core";
// 虚拟元素的映射

/**
 * 按钮的vuex数据映射关系
 */
export function baseButtom() {
  let dynamic = core.state.template.length * 10;
  return {
    id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: "base-buttom",
    text: "按钮",
    link: "", // 按钮点击跳转地址
    css: {
      top: 100 + dynamic,
      left: 100 + dynamic,
      width: 100,
      height: 50,
      zIndex: core.state.template.length + 1,
      background: "rgb(242, 242, 242)",
      border: "none",
      color: "black",
      "font-size": 18,
      "border-radius": 0
    }
  };
}

/**
 * 图片的vuex数据映射关系
 */
export function baseImg(img) {
  let dynamic = core.state.template.length * 10;
  return {
    id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: "base-img",
    text: img,
    css: {
      top: 100 + dynamic,
      left: 100 + dynamic,
      width: 100,
      height: 50,
      zIndex: core.state.template.length + 1
    }
  };
}

/**
 * 文本的vuex数据映射关系
 */
export function baseText() {
  let dynamic = core.state.template.length * 10;
  return {
    id: String(new Date().getTime()), // 暂定
    editStatus: false,
    name: "base-text",
    text: "请修改此处的文字",
    css: {
      top: 100 + dynamic,
      left: 100 + dynamic,
      width: 100,
      height: 50,
      zIndex: core.state.template.length + 1,
      background: "rgb(242, 242, 242)",
      border: "none",
      color: "black",
      "font-size": 12
    }
  };
}

/**
 * 输入框的vuex数据映射关系
 */
export function baseInput() {
  let dynamic = core.state.template.length * 10;
  return {
    id: String(new Date().getTime()), // 暂定
    inputName: "default",
    editStatus: false,
    name: "base-input",
    text: "",
    css: {
      top: 100 + dynamic,
      left: 100 + dynamic,
      width: 150,
      height: 30,
      zIndex: core.state.template.length + 1,
      background: "white",
      color: "black",
      "border-color": "black",
      "border-style": "solid",
      "border-width": 1,
      "border-radius": 1,
      "padding-left": 5,
      "padding-right": 5,
      "font-size": 12
    }
  };
}
