
import { defineCustomElement } from 'vue'
import JCButton from './components/JCButton.ce.vue'
import JCImage from './components/JCImage.ce.vue'
import JCButtonGroup from './components/JCButtonGroup.ce.vue'

console.log(JCButton.styles) // ["/* 内联的 css */"]
// 转换为自定义元素构造器
const JCButtonElement = defineCustomElement(JCButton)
const JCImageElement = defineCustomElement(JCImage)
const JCButtonGroupElement = defineCustomElement(JCButtonGroup)

// 注册
customElements.define('jc-button', JCButtonElement)
customElements.define('jc-image', JCImageElement)
customElements.define('jc-button-group', JCButtonGroupElement)
