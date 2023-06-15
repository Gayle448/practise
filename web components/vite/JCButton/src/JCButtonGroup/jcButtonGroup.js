import {LitElement, html, css} from 'lit';
// import { html, LitElement, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


// 按钮组
class JCButtonGroup extends LitElement {
    static properties = {
        condition: {}
    }
    constructor() {
        super()
        this.condition = false
    }
    render() {
        return html`
            <div class="wrapper">
                <slot @slotchange="${this.handleChange}"></slot>
            </div>
        `;
    }
      
    firstUpdated() {
    }

    // 条件1
    // 组件的 Shadow DOM 结构已经创建，但其中的内容可能尚未被完全渲染。
    connectedCallback() {
        super.connectedCallback();
        // 条件 2 (异步问题,时ok时no)
        // 使用 setTimeout() 函数仅仅是为了确保操作在元素连接到 DOM 树后执行，并不代表一定需要延迟执行。
        setTimeout(() => {
          const buttons = this.querySelectorAll('jc-button');
          var index = 0;
        //   debugger
          buttons.forEach(button => {
        //   const buttonElement = button.querySelector('button'); //Uncaught TypeError: buttonElement is null
        //   const buttonElement = button.renderRoot.querySelector('button'); // OK 使用 renderRoot 属性可以访问 Shadow DOM 的根节点。
          const buttonShadow = button.shadowRoot;
          const buttonElement = buttonShadow.querySelector('button'); 
            // debugger
            buttonElement.style.border = '1px solid rgba(255,255,255,0)';
            buttonElement.style.borderRadius = '0px';
            buttonElement.style.margin = '0px';
            if (index === buttons.length - 1) {
              buttonElement.style.borderRightColor = 'rgba(255,255,255,0)';
            } else {
              buttonElement.style.borderRightColor = 'rgba(255,255,255,1)';
            }
            index++;
          });
        }, 0);
    }
    static styles = css`
        :host .wrapper{
            display: inline-flex;
            flex-flow: row nowrap;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -ms-border-radius: 5px;
            -o-border-radius: 5px;
            border: 1px solid rgba(255, 222, 255, 1);
            background-color: white;
            overflow: hidden;
        }
        :host(.outWrapper) {
            display: inline-flex;
            flex-flow: row nowrap;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -ms-border-radius: 5px;
            -o-border-radius: 5px;
            border: 1px solid green;
            background-color: white;
            overflow: hidden;   
        }
        :host-context(#container){
            border: 3px solid red;
        }
    `
}
customElements.define('jc-button-group',JCButtonGroup);