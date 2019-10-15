function writeCode (css2, css1, css3, fn) {
	let index = 1;
	let main = document.getElementsByClassName('main')[0];
	let mainStyle = document.querySelector('#mainStyle');
	let text = ``;
	let text2 = ``;
	let timer = setInterval(function() {
		if(!cssFlag && !css2Flag) {
			text = css1.substring(0, index);
			main.innerHTML = Prism.highlight(text, Prism.languages.css);
			main.scrollTop = main.scrollHeight
			mainStyle.innerHTML = text;
			index++ ;
			if(index > css1.length) {
				clearInterval(timer);
				fn.call();
			}
		} else if(cssFlag && !css2Flag) {
			console.log('dadadad')
			text = css2.substring(0, index);
			main.innerHTML = Prism.highlight(css1 + text, Prism.languages.css);
			main.scrollTop = main.scrollHeight
			mainStyle.innerHTML = css1 + text;
			index++ ;
			if(index > css2.length) {
				clearInterval(timer);
				makeMarkDown()
			}
		} else if(cssFlag && css2Flag) {
			text2 = css3.substring(0, index)
			main.innerHTML = Prism.highlight(css1 + css2 + text2, Prism.languages.css);
			main.scrollTop = main.scrollHeight
			mainStyle.innerHTML = css1 + css2 + text2;
			index++ ;
			if(index > css3.length) {
				clearInterval(timer);
			}
		}
	},50)
}

function makeMarkDown() {
	let paper = document.querySelector('#paper');
	paper.style.display = "none";
	let div = document.createElement('div');
	let codeWrapper = document.querySelector('#code-wrapper');
	codeWrapper.appendChild(div);
	div.id = 'paper';
	div.innerHTML =  markdown.toHTML( paper.innerHTML );
	css2Flag = true;
	writeCode (css2, css1, css3)
}

function writeHtml(md,fn) {
	let paper = document.querySelector('#paper')
	let index = 1;
	let text = ''
	let timer = setInterval(() => {
		// text = markdown.toHTML(md.substring(0, index))
		text = md.substring(0, index);
		paper.innerHTML = text;
		paper.scrollTop = paper.scrollHeight
		index++ ;
		if(index > md.length) {
			cssFlag = true
			clearInterval(timer);
			fn.call()
			// let main = document.getElementsByClassName('main')[0];
			// let mainStyle = document.querySelector('#mainStyle');
			// main.innerHTML = main.innerHTML + Prism.highlight(text, Prism.languages.css);
		}
	},50)
}

function createPaper(fn) {
	let pre = document.createElement('pre');
	pre.id = 'paper';
	let codeWrapper = document.querySelector('#code-wrapper');
	codeWrapper.appendChild(pre);
	fn.call();
}

let cssFlag = false;
let css2Flag = false;
var css1 = `/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code-wrapper:after{
	display: block;
	content: '';
	clear: both;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
  width: 40%;
  height:700px;
  overflow:scroll;
  float:left
}

/* 我需要一点代码高亮 */

.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 加一个呼吸效果 */

#code{
  animation: breath 0.5s infinite alternate-reverse;
}
/* 现在正式开始 */

/* 我需要一张白纸 */

#paper{
	width: 50%;
	right: 0;
	float: right;
	padding: 16px;
	height:700px;
	 overflow:scroll;
	border: 1px solid #000000;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`
var css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`
let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

// #code-wrapper{
//   width: 50%; left: 0; position: fixed; 
//   height: 100%;
// }
// 
// #paper > .content {
//  display: block;
// }
var md = `
# 自我介绍

我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`

writeCode.call(this, '', css1, '', () => {
	createPaper(() => {
		writeHtml(md, () => {
			writeCode.call(this, css2 , css1, '')
		})
	})
})
