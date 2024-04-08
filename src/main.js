/**********************************
 * @Description: 入口文件
 * @FilePath: main.js
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/04 22:41:32
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import '@/styles/reset.css'
import '@/styles/global.scss'
import 'uno.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupNaiveDiscreteApi } from './utils'
import { setupDirectives } from './directives'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import { basicSetup } from 'codemirror'
import VueCodemirror from 'vue-codemirror'

async function bootstrap() {
  const app = createApp(App)
  app.use(ElementPlus)
  app.use(Antd)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(VueCodemirror, {
    // optional default global options
    autofocus: true,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: 'Code goes here...',
    extensions: [basicSetup]
    // ...
  })
  setupStore(app)
  setupNaiveDiscreteApi()
  setupDirectives(app)
  await setupRouter(app)
  app.mount('#app')

}

bootstrap()
