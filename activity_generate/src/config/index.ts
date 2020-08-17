/*
 * @Author: your name
 * @Date: 2020-05-08 14:09:38
 * @LastEditTime: 2020-05-10 22:11:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \activity_generate\src\config\index.ts
 */
export const url = process.env.NODE_ENV == "development" ? "http://127.0.0.1" : "http://121.36.37.117"
// export const url = "http://121.36.37.117"
export const mobileUrl = `${url}/mobileb/index/`; // 前台域名
export const baseURL = `${url}:818`; // 后台地址
export const imageUpUrl = `${baseURL}/upimage`; // 上传图片地址
export const imageStaticUrl=`${baseURL}/public/image/`
/**
 * 默认页面高度
 */
export const commHeight = 667; // 1334 750 是标准配置 这里 宽度是375 以应对标准高度,这里使用1334/2
export const commWidth = 375;
