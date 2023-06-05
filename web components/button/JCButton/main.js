class JCButton extends HTMLElement {
    // 构造函数
    constructor() {
        super(); //继承

        const child = this.childNodes[0];
        // debugger

        // 创建一个影子 root 节点
        const shadow = this.attachShadow({mode: 'open'})
        //  创建 一个文本节点,并输入值
        const button = document.createElement('button');
        // button.textContent = child.textContent;
        shadow.appendChild(button);

        const span = document.createElement('span');
        span.textContent = child.textContent;
        button.appendChild(span);

        const type = this.type;
        // button.setAttribute('class', type);
        button.classList.add(type);
        // debugger
        // editableListContainer.classList.add('editable-list');
        // nextul.parentNode.setAttribute('class','closed');
        const plain = this.plain;
        // button.setAttribute('class', plain);
        if (plain.length) {
            button.classList.add(plain);
        }
        const round = this.round;
        if (round.length) {
            button.classList.add(round);
        }
        const circle = this.circle;
        if (circle.length) {
            button.classList.add(circle);
        }

        // 根据 icon 的类型,插入不同样式图标 todo
        const icon = this.icon;
        if (icon.length) {
            const image = document.createElement('img');
            image.src = './images/' + icon + '.png';
            image.setAttribute('class','iconStyle');

            const buttonChild = button.childNodes[0];
            buttonChild.parentNode.insertBefore(image,buttonChild);
            // button.appendChild(image);
        }

        const disable = this.disable;
        if (disable) {
            button.setAttribute('disable',disable);
            button.classList.add('disable');
        }

        // button 添加 一个自定义插槽,可以实现,左文右图标
        const slot = document.createElement('slot');
        slot.name = 'icon';
        button.appendChild(slot);

        const loading = this.loading;
        if (loading) {
            const image = document.createElement('img');
            image.src = './images/loading.png';
            image.setAttribute('class','loadingStyle');
            const buttonChild = button.childNodes[0];
            button.classList.add('disable');
            buttonChild.parentNode.insertBefore(image,buttonChild);
        }

        const size = this.size;
        var cls = 'jc-button-'+size;
        button.classList.add(cls);

        // button.onclick = function() {
        //     console.log('按钮的点击事件,可触发');
        // }
        // 可触发
        button.addEventListener('click', ()=> {
            console.log('注册的事件');
            // this.onclick is not a function
            // this.onclick('设置的点击事件被触发');
            // 自定义事件 传递
            this.dispatchEvent(new CustomEvent('onCustomClick',{
                detail: '事件传参'
            }));
        }) 
        // 如何实现 类似, 原生onClick 事件,组件在所在当前 js 实现

        // 给shadow dom 附加样式表 单独使用 jc-button ,样式会生效,  (如果嵌入到  jc-button-group 内无效)
        // const linkElem = document.createElement('link');
        // linkElem.setAttribute('rel', 'stylesheet');
        // linkElem.setAttribute('href', 'style.css');
        // shadow.appendChild(linkElem);
        // 下面 如果嵌入到  jc-button-group 内生效
        var style = document.createElement('style');
        style.textContent = `
        :host-context(#container) {
            border: 3px solid red;
        }

        button {
            margin: 20px;
            padding: 10px;
            border: 1px solid lightgray;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -ms-border-radius: 5px;
            -o-border-radius: 5px;
            background-color: white;
            color: lightgray;
            font: medium;
            font-weight: normal;
        
            /* 加上后, button 之间换行了? */
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
        
        .loadingStyle {
            width: 25px;
            height: 25px;
            animation: turn 1s linear infinite;
            -webkit-animation: turn 1s linear infinite;
        }
        
        /* .loadingColor {
            background-color: #409EFF;
            border-color: #409EFF;
            color: #FFF
        } */
        
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
        shadow.appendChild(style);
    }

    get type() {
        return this.getAttribute('type') || 'default';
    }

    get plain() {
        if (this.hasAttribute('plain')) {
            return 'plain'
        }
        return '';
    }

    get round() {
        if (this.hasAttribute('round')) {
            return 'round'
        }
        return '';
    }

    get circle() {
        if (this.hasAttribute('circle')) {
            return 'circle'
        }
        return '';  
    }

    get icon() {
        if (this.hasAttribute('icon')) {
            return this.getAttribute('icon')
        }
        return '';
    }

    get disable() {
        if (this.hasAttribute('disable')) {
            return true;
        }
        return false;
    }

    get loading() {
        if (this.getAttribute('loading')) {
            return true;
        }
        return false;
    }

    get size() {
        return this.getAttribute('size') || 'default';
    }

    // 可以设定一些生命周期的回调函数，在特定的时间，这些回调函数将会被调用
    // 当 custom element 首次被插入文档 DOM 时，被调用。
    connectedCallback() {
        console.log('');
    }
    // 当 custom element 从文档 DOM 中删除时，被调用。
    disconnectedCallback() {
        console.log('');
    }
    // 当 custom element 被移动到新的文档时，被调用。
    adoptedCallback() {

    }
    // 当 custom element 增加、删除、修改自身属性时，被调用。每当元素的属性变化时
    attributeChangedCallback() {

    }

}

customElements.define('jc-button', JCButton);