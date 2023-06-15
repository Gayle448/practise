class JCTSButtonGroup extends HTMLElement {
    constructor() {
        const el = super();

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
        shadow.appendChild(style);
        const div = document.createElement('div');
        // div.setAttribute('class','wrapper');
        div.className = 'wrapper';
        shadow.appendChild(div);
        // 遍历当前元素的所有子节点
        const buttons = el.querySelectorAll('jc-button');
        var index = 0;
        buttons.forEach(button => {
            // button.style.border-color
            // button.style.display = 'none';
            el.removeChild(button);
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
    }
}

customElements.define('jc-button-group', JCTSButtonGroup);