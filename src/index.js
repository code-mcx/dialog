import {on, off} from "./utils/event.js"
import {getOffsetLeft, getOffsetTop} from "./utils/dom.js"

import "./css/mcx-dialog.css"

function addClass(e, c) {
	let newclass = e.className.split(" ");
	if (e.className === "") newclass = [];
	newclass.push(c);
	e.className = newclass.join(" ");
};

function extend(source, target) {
	for(let key in target) {
		source[key] = target[key];
	}
	return source;
}

const layer = {
	init(dom, options, isShade) {
		let body = document.getElementsByTagName("body")[0];
		let bgDiv = document.createElement("div");
		if (isShade) {
			addClass(bgDiv, "mcx-dialog-bg");
			body.appendChild(bgDiv);
			// whether shade can be closed
			if (options.shadeClose) {
				on(bgDiv, "click", () => {
					handleClose();
				});
			}
		}
		
		// whether show close button
		if (options.showClose) {
			let closeBtn = dom.getElementsByTagName("i")[0];
			on(closeBtn, "click", () => {
				handleClose();
			});
		}
		
		let isAnimationEnd = false;
		if (dom.style["animation"] !== undefined) {
			isAnimationEnd = true;
		}
		function remove() {
			layer.close([dom]);
			off(dom, "animationend", remove);
		}
		function handleClose() {
			if (isAnimationEnd) {
				addClass(dom, "animation-" + options.animationType + "-out");
				on(dom, "animationend", remove);
				layer.close([bgDiv]);
				
				if (options.layer) mcxDialog.layerElement = [];
			} else {
				layer.close([bgDiv, dom]);
				
				if (options.layer) mcxDialog.layerElement = [];
			}
		}
		
		// set drag
		let dialogHead = dom.getElementsByTagName("div")[0];
		let downX, downY, left, top;
		function move(e) {
			let x = (e.pageX || e.clientX) - downX;
			let y = (e.pageY || e.clientY) - downY;
			dom.style.left = left + x + "px";
			dom.style.top = top + y + "px";
		}
		on(dialogHead, "mousedown", (e) => {
			downX = e.pageX || e.clientX;
			downY = e.pageY || e.clientY;
			left = parseFloat(dom.style.left);
			top = parseFloat(dom.style.top);
			on(document, "mousemove", move);
		});
		on(dialogHead, "mouseup", () => {
			off(document, "mousemove", move);
		});
		
		// set button event
		if (options.buttons.length > 0) {
			for (let i = 0; i < options.buttons.length; i++) {
				let btn = options.buttons[i];
				btn.setAttribute("index", i);
				on(btn, "click", (e) => {
					handleClose();
					let _this = e.target || e.srcElement;
					if(options.btnClick)
						options.btnClick(parseInt(_this.getAttribute("index")));
				});
			}
		}
		
		body.appendChild(dom);
		
		// set dialog position
		dom.style.top = (document.documentElement.clientHeight - dom.offsetHeight) / 2 + "px";
		dom.style.left = (document.documentElement.clientWidth - dom.offsetWidth) / 2 + "px";
		
		if (options.layer) {
			mcxDialog.layerElement.push(bgDiv);
            mcxDialog.layerElement.push(dom);
			options.afterLoad();
		}
	},
	initHint(dom, options) {
		let body = document.getElementsByTagName("body")[0];
		body.appendChild(dom);
		
		if (options.target === undefined) {
			dom.style.top = (document.documentElement.clientHeight - dom.offsetHeight) / 2 + "px";
			dom.style.left = (document.documentElement.clientWidth - dom.offsetWidth) / 2 + "px";
		} else {
			// set tips position
			let targetElem = document.getElementById(options.target);
			let offsetTop = getOffsetTop(targetElem);
			let offsetLeft = getOffsetLeft(targetElem);
			if (options.direction === "right") {
				offsetLeft = offsetLeft + targetElem.offsetWidth;
				dom.style.top = offsetTop + "px";
				dom.style.left = offsetLeft + 10 + "px";
			} else if (options.direction === "left") {
				offsetLeft = offsetLeft - dom.offsetWidth;
				dom.style.top = offsetTop + "px";
				dom.style.left = offsetLeft - 10 + "px";
			} else if (options.direction === "top") {
				offsetTop = offsetTop - dom.offsetHeight;
				dom.style.top = offsetTop - 10 + "px";
				dom.style.left = offsetLeft + "px";
			} else if (options.direction === "bottom") {
				offsetTop = offsetTop + targetElem.offsetHeight;
				dom.style.top = offsetTop + 10 + "px";
				dom.style.left = offsetLeft + "px";
			}
		}
		
		let isAnimationEnd = false;
			if (dom.style["animation"] !== undefined) {
				isAnimationEnd = true;
		}
		function remove() {
			layer.close([dom]);
			off(dom, "animationend", remove);
		}
		function handleClose() {
			if (isAnimationEnd) {
				addClass(dom, "animation-" + options.animationType + "-out");
				on(dom, "animationend", remove);
			} else {
				layer.close([dom]);
			}
		}
		setTimeout(function() {
			handleClose();
		}, options.time * 1000);
	},
	close(doms) {
		let body = document.getElementsByTagName("body")[0];
		for (let i = 0; i < doms.length; i++) {
			body.removeChild(doms[i]);
		}
	}
	
}
const mcxDialog = {
	loadElement: [],
	layerElement: [],
	alert(content, options) {
		let opts = {
			showClose: true,
			shadeClose: false,
			animationType: "bounce",
			titleStyle: {},
			buttonStyle: {}
		};
		opts = extend(opts, options);
		opts.btn = ["确定"];
		opts.btnClick = undefined;
		if (opts.buttonStyle) {
			opts.buttonStyle = [opts.buttonStyle];
		}
		
		this.open(content, opts);
	},
	confirm(content, options) {
		let secondBtn = {
			color: "#000000",
			border: "1px solid #DEDEDE",
			backgroundColor: "#F1F1F1"
		}
		let opts = {
			btn: ["确定", "取消"],
			showClose: true,
			shadeClose: false,
			animationType: "bounce",
			titleStyle: {},
			buttonStyle: [{}, secondBtn]
		};
		opts = extend(opts, options);
		if (opts.buttonStyle.length === 1) {
			opts.buttonStyle = [options.buttonStyle[0], secondBtn];
		}
		
		this.open(content, opts);
	},
	layer(options) {
		let opts = {
			width: 500,
			height: 400,
			showClose: true,
			shadeClose: false,
			animationType: "bounce",
			titleStyle: {},
			style: 1,
			content: "",
			afterLoad: function(){}
		};
		opts = extend(opts, options);
		opts.btn = [];
		opts.showClose = true;
		opts.layer = true;
		
		this.open(opts.content, opts);
	},
	open(content, options) {
		let dialog = document.createElement("div");
		let dialogHead = document.createElement("div");
		let dialogContent = document.createElement("div");
		let dialogTitle = document.createElement("div");
		
		dialogTitle.innerHTML = options.title || "信息";
		dialogContent.innerHTML = content;
		
		addClass(dialog, "mcx-dialog");
		addClass(dialog, "animation-" + options.animationType + "-in");
		addClass(dialogHead, "dialog-head");
		addClass(dialogContent, "dialog-content");
		addClass(dialogTitle, "dialog-title");
		
		dialogHead.appendChild(dialogTitle);
		dialog.appendChild(dialogHead);
		dialog.appendChild(dialogContent);
		
		if (options.width) {
			dialog.style.width = options.width + "px";
		}
		if (options.height) {
			if (!options.layer) {
				dialogContent.style.height = options.height - 41 - 2 * 18 - 50 + "px";
			} else {
				dialogContent.style.height = options.height - 41 + "px";
				addClass(dialogContent, "dialog-layer-content");
			}
		}
		
		if (options.titleStyle) {
			for(let k in options.titleStyle) dialogHead.style[k] = options.titleStyle[k];
		}
		
		if (options.showClose) {
			let dialogIco = document.createElement("i");
			addClass(dialogIco, "dialog-ico");
			dialogHead.appendChild(dialogIco);
		}
		
		let dialogFoot = document.createElement("div");
		if (!options.layer) {
			addClass(dialogFoot, "dialog-foot");
			dialog.appendChild(dialogFoot);
		} else {
			if (options.style === 1) {
				addClass(dialog, "dialog-layer");
				dialogHead.style.borderRadius = "0";
			}
			dialogContent.style.overflow = "auto";
		}
		
		options.buttons = [];
		for (let i = 0; i < options.btn.length; i++) {
			let btn = document.createElement("a");
			btn.href = "javascript:void(0);";
			btn.innerHTML = options.btn[i];
			addClass(btn, "dialog-foot-btn");
			
			// handle button style
			if (options.buttonStyle && options.buttonStyle.length > 0) {
				let btnStyle = options.buttonStyle[i];
				for(let k in btnStyle) {
					btn.style[k] = btnStyle[k];
				}
			}
			
			dialogFoot.appendChild(btn);
			options.buttons.push(btn);
		}
		
		layer.init(dialog, options, true);
	},
	msg(msg, options) {
		let opts = {
			time: 3,
			style: {},
			animationType: "zoom"
		};
		opts = extend(opts, options);
		
		let msgDiv = document.createElement("div");
		addClass(msgDiv, "mcx-dialog-msg");
		addClass(msgDiv, "animation-" + opts.animationType + "-in");
		msgDiv.innerHTML = msg;
		
		for(let k in opts.style) {
			msgDiv.style[k] = opts.style[k];
		}
		
		layer.initHint(msgDiv, opts);
	},
	tips(content, target, options) {
		let opts = {
			time: 3,
			direction: "right",
			animationType: "zoom",
			style: {}
		};
		opts = extend(opts, options);
		opts.target = target || "";
		
		let dir = {left:"right", right:"left", top:"bottom", bottom:"top"};
		
		let tipsDiv = document.createElement("div");
		let tipsWrapper = document.createElement("div");
		let tipsArrow = document.createElement("div");
		let tipsContent = document.createElement("div");
		
		addClass(tipsDiv, "mcx-dialog-tips");
		addClass(tipsDiv, "animation-" + opts.animationType + "-in");
		addClass(tipsWrapper, "tips-wrapper");
		addClass(tipsArrow, "tips-arrow-" + dir[opts.direction]);
		
		tipsContent.innerHTML = content;
		tipsDiv.appendChild(tipsWrapper);
		tipsWrapper.appendChild(tipsArrow);
		tipsWrapper.appendChild(tipsContent);
		
		for(let k in opts.style) {
			tipsDiv.style[k] = opts.style[k];
			// set arrow border color
			if(k === "backgroundColor") {
				if(opts.direction === "left" || opts.direction === "right") {
					tipsArrow.style.borderBottomColor = opts.style[k];
				} else {
					tipsArrow.style.borderRightColor = opts.style[k];
				}
			}
		}
		
		layer.initHint(tipsDiv, opts);
	},
	loading(options) {
		let opts = {
			src: "img",
			hint: "",
			type: 1,
			animationType: "zoom"
		};
		opts = extend(opts, options);
		
		let bgDiv = document.createElement("div");
		let loadDiv = document.createElement("div");
		let loadImg = document.createElement("img");
		let loadHint = document.createElement("div");
		
		addClass(bgDiv, "mcx-dialog-loading-bg");
		addClass(loadDiv, "mcx-dialog-loading");
		addClass(loadDiv, "animation-" + opts.animationType + "-in");
		
		if (opts.hint) {
			addClass(loadDiv, "mcx-dialog-loading-hint");
			loadHint.innerHTML = opts.hint;
		}
		
		loadImg.src = require("./img/loading-" + opts.type + ".gif");
		
		loadDiv.appendChild(loadImg);
		loadDiv.appendChild(loadHint);
		
		let body = document.getElementsByTagName("body")[0];
		body.appendChild(bgDiv);
		body.appendChild(loadDiv);
		
		loadDiv.style.top = (document.documentElement.clientHeight - loadDiv.offsetHeight) / 2 + "px";
		loadDiv.style.left = (document.documentElement.clientWidth - loadDiv.offsetWidth) / 2 + "px";
		
		this.loadElement.push(bgDiv);
		this.loadElement.push(loadDiv);
	},
	closeLoading() {
		layer.close(this.loadElement);
		this.loadElement = [];
	},
	closeLayer() {
        layer.close(this.layerElement);
        this.layerElement = [];
    }
}

// providing better operations in Vue
mcxDialog.install = (Vue, options) => {
	Vue.prototype.$mcxDialog = mcxDialog;
}

export default mcxDialog
