class JCButtonGroup extends HTMLElement {
    constructor() {
        self = super();
        // let template = document.getElementById('JCButtonGroupTemplate');
        // let content = template.content;
        // const shadowRoot = this.attachShadow({ mode: "open" });
        // // 使用 Node.cloneNode() 方法添加了模板的拷贝到阴影的根结点上。
        // shadowRoot.appendChild(content.cloneNode(true));

        // 创建一个影子 root 节点
        const shadow = this.attachShadow({mode: 'open'})
        var style = document.createElement('style');
        style.textContent = `
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
        `;
        // :host-context(#container) 只会对 id 为 container 元素下的自定义元素生效;此处未生效?火狐浏览器兼容有问题
        // jc-button {
        //     flex: 1 auto;
        // }
        shadow.appendChild(style);
        const div = document.createElement('div');
        // div.setAttribute('class','wrapper');
        div.className = 'wrapper';
        shadow.appendChild(div);
        // 遍历当前元素的所有子节点
        const buttons = self.querySelectorAll('jc-button');
        var index = 0;
        buttons.forEach(button => {
            // button.style.border-color
            // button.style.display = 'none';
            self.removeChild(button);
            div.appendChild(button);
            const buttonShadow = button.shadowRoot;
            const buttonNode = buttonShadow.childNodes[0];
            // buttonNode.style.margin = '0px';
            // buttonNode.style.border = '1px solid rgba(255,255,255,0)';
            if(index == (buttons.length-1)) {
                buttonNode.style = 'border:1px solid rgba(255,255,255,0); border-right-color:rgba(255,255,255,0); border-radius:0px; margin:0px;';
            }else {
                buttonNode.style = 'border:1px solid rgba(255,255,255,0); border-right-color:rgba(255,255,255,1); border-radius:0px; margin:0px;';
            }
            index++;
        })
        // 给shadow dom 附加样式表 (无效)
        // const linkElem = document.createElement('link');
        // linkElem.setAttribute('rel', 'stylesheet');
        // linkElem.setAttribute('href', '../JCButton/style.css');
        // shadow.appendChild(linkElem);
    }
}

customElements.define('jc-button-group', JCButtonGroup);