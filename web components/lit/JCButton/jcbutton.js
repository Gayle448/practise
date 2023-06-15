import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
// import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
// import { LitElement, html, css, classMap, styleMap,nothing } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'

class JCButton extends LitElement {
    static properties = {
        content: {
            type: String
        },
        type: {
            type: String
        },
        plain: {
            type: Boolean
        },
        round: {
            type: Boolean
        },
        circle: {
            type: Boolean
        },
        icon: {
            type: String
        },
        disable: {
            type: Boolean
        },
        loading: {
            type: Boolean
        },
        size: {
            type: String
        },
        myClass: {
        },
        clickCallBack: {
            type: Function
        },
        //
        myStyle: {
        }, 
        col: {
            type: String
        },
        bgcol: {
            type: String
        },
        radius: {
            type: Number
        },
        font: {
            type: Number
        },
        // 渐变色
        mode: {
            type: String
        },
        colors: {
            type: String
        }
    };
    constructor() {
        super();
        this.content = '';
        this.size = 'default';
        this.myClass = {};
        this.myStyle = {};
    }
    render() {
        if (this.type) {
            this.myClass[this.type] = true;
        }else {
            this.myClass.default = true;
        }
        this.myClass.plain = this.plain;
        this.myClass.round = this.round;
        this.myClass.circle = this.circle;
        this.myClass.disable = this.disable;
        if (this.size) {
            var cls = 'jc-button-' + this.size;
            this.myClass[cls] = true;
        }
        if (this.col) {
            this.myStyle.color = this.col;
        }
        if (this.bgcol) {
            this.myStyle.backgroundColor = this.bgcol;
        }
        if (this.font) {
            this.myStyle.font = this.font + 'px';
        }
        if (this.radius) {
            this.myStyle.borderRadius = this.radius + 'px';
        }
        if (this.mode) {
            let gradient = '';
            if (this.mode == 'ho') {
                gradient = `linear-gradient(to bottom, ${this.colors});`
                this.myStyle.backgroundImage = gradient;
            }else {
                gradient = `linear-gradient(to right, ${this.colors});`
                this.myStyle.backgroundImage = gradient;
            }
        }
        return html`
            <button id="element" class=${classMap(this.myClass)} @click="${this.clickHandler}" style=${styleMap(this.myStyle)}>
                <img class="loadingStyle disable" ?hidden=${!this.loading} src="../../button/JCButton/images/loading.png" />
                <img class=${this.icon ? "iconStyle" : ''} src="../../button/JCButton/images/${this.icon ?? nothing}.png" />
                <span>
                    ${this.textContent}
                </span>
                <slot name="icon"></slot>
            </button>
        `
    }

    clickHandler(e) {
        console.log('点击了按钮');
        console.log(e.target.localName)
        // 事件调度
        const options = {
            detail: e, //自定义参数
            bubbles: true, // 
            composed: true
        };
        // 触发自定义事件
        this.dispatchEvent(new CustomEvent('btnClick', { detail: options}));

        // 调用外部回调函数
        if (this.clickCallBack) {
            this.clickCallBack(options);
        }
    }
    firstUpdated() {
    }

    static styles = css`
    :host {
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
        background-color: white;
        font: medium;
        color: lightgray;
    }

    button {
        margin: 20px;
        padding: 10px;
        border: 1px solid lightgray;
        font-weight: normal;
    
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
    }
    
    .disable {
        cursor: not-allowed;
    }
    
    .default {
        color: black;
    }
    /* , 隔开代表,满足条件1或者满足条件2 都进这个样式 */
    /* .default,[plain] { */
    .default.plain {  
        color: black;
    }
    .default.disable,
    .default.plain.disable {
        color:#C0C4CC;
        background-color: #FFF;
        border-color: #EBEEF5;
        background-image: none;
    }
    
    .default:hover,
    .default.plain:hover {
        color :#409EFF;
        border-color: #409EFF;
        background-color: #ecf5ff;
    }
    
    .text {
        background-color: white;
        border-color: white;
        color: #409EFF;
    }
    .text.disable {
        background-color: white;
        border-color: white;
        color: #C0C4CC;
    }
    .text:hover {
        color: #66b1ff;
    }
    
    .primary,
    .primary.plain:hover {
        background-color: #66b1ff;
        border-color: #66b1ff;
        color: white;
    }
    
    .primary.disable,
    .primary:hover {
        color:#FFF;
        background-color: #a0cfff;
        border-color: #a0cfff;   
    }
    /* .primary,[plain] { */
    .primary.plain {
        background-color: #ecf5ff;
        border-color: #b3d8ff;
        color: #409EFF;
    }
    .primary.plain.disable {
        color:#8cc5ff;
        background-color: #ecf5ff;
        border-color: #d9ecff;
    }
    
    .success,
    .success.plain:hover {
        background-color: #67C23A;
        border-color: #67C23A;
        color: white;
    }
    .success.disable,
    .success:hover {
        color:#FFF;
        background-color: #b3e19d;
        border-color: #b3e19d;
    }
    /* .success[plain] { */
    .success.plain {
        background-color: #f0f9eb;
        border-color: #c2e7b0;
        color: #67C23A;
    }
    .success.plain.disable {
        color:#a4da89;
        background-color: #f0f9eb;
        border-color: #e1f3d8;
    }
    
    .info,
    .info.plain:hover {
        background-color: #909399;
        border-color: #909399;
        color: white;
    }
    .info.disable,
    .info:hover {
        color:#FFF;
        background-color: #c8c9cc;
        border-color: #c8c9cc;
    }
    /* .info,[plain] { */
    .info.plain {
        background-color: #f4f4f5;
        border-color: #d3d4d6;
        color: #909399;
    }
    .info.plain.disable {
        color:#bcbec2;
        background-color: #f4f4f5;
        border-color: #e9e9eb;
    }
    
    .warning,
    .warning.plain:hover {
        background-color: #E6A23C;
        border-color: #E6A23C;
        color: white;
    }
    .warning.disable,
    .warning:hover {
        color:#FFF;
        background-color: #f3d19e;
        border-color: #f3d19e;
    }
    /* .warning,[plain] { */
    .warning.plain {
        background-color: #fdf6ec;
        border-color: #f5dab1;
        color: #E6A23C;
    }
    .warning.plain.disable {
        color:#f0c78a;
        background-color: #fdf6ec;
        border-color: #faecd8;
    }
    
    .danger,
    .danger.plain:hover {
        background-color: #F56C6C;
        border-color: #F56C6C;
        color: white;
    }
    .danger.disable,
    .danger:hover {
        color:#FFF;
        background-color: #fab6b6;
        border-color: #fab6b6;
    }
    /* .danger,[plain] { */
    .danger.plain {
        background-color: #fef0f0;
        border-color: #fbc4c4;
        color: #F56C6C;
    }
    .danger.plain.disable {
        color:#f9a7a7;
        background-color: #fef0f0;
        border-color: #fde2e2;
    }
    
    
    /* [round] { */
    .round {
        border-radius: 25px !important;
        -webkit-border-radius: 25px !important;
        -moz-border-radius: 25px !important;
        -ms-border-radius: 25px !important;
        -o-border-radius: 25px !important;
    }
    
    .circle {
        border-radius: 50% !important;
        -webkit-border-radius: 50% !important;
        -moz-border-radius: 50% !important;
        -ms-border-radius: 50% !important;
        -o-border-radius: 50% !important;
        padding: 12px;
    }
    
    .iconStyle {
        width: 25px;
        height: 25px;
        /* margin: 5px; */
    }

    ::slotted(img) {
        width: 25px;
        height: 25px;
        margin: 5px;
    }
    
    .loadingStyle {
        width: 25px;
        height: 25px;
        animation: turn 1s linear infinite;
        -webkit-animation: turn 1s linear infinite;
    }
    
    @keyframes turn {
        0%{ transform:rotate(0deg) ; -webkit-transform:rotate(0deg) ; -moz-transform:rotate(0deg) ; -ms-transform:rotate(0deg) ; -o-transform:rotate(0deg) ; }
        25%{ transform: rotate(90deg); -webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -ms-transform: rotate(90deg); -o-transform: rotate(90deg); }
        50%{ transform: rotate(180deg); -webkit-transform: rotate(180deg); -moz-transform: rotate(180deg); -ms-transform: rotate(180deg); -o-transform: rotate(180deg); }
        75%{ transform: rotate(270deg); -webkit-transform: rotate(270deg); -moz-transform: rotate(270deg); -ms-transform: rotate(270deg); -o-transform: rotate(270deg); }
        100%{ transform: rotate(360deg); -webkit-transform: rotate(360deg); -moz-transform: rotate(360deg); -ms-transform: rotate(360deg); -o-transform: rotate(360deg); }
    }
    
    .jc-button-default {
        padding: 12px 22px;
        font-size: 15px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
    }
    
    .jc-button-large {
        padding: 14px 24px;
        font-size: 16px;
        border-radius: 6px;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        -ms-border-radius: 6px;
        -o-border-radius: 6px;
    }
    
    .jc-button-medium {
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 4px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        -ms-border-radius: 4px;
        -o-border-radius: 4px;
    }
    
    .jc-button-small {
      padding: 9px 15px;
      font-size: 12px;
      border-radius: 3px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      -ms-border-radius: 3px;
      -o-border-radius: 3px;
    }
    
    .jc-button-mini {
      padding: 7px 12px;
      font-size: 11px;
      border-radius: 3px;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      -ms-border-radius: 3px;
      -o-border-radius: 3px;
    }
    `;

}
customElements.define('jc-button',JCButton);