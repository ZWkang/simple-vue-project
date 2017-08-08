/*eslint-disable*/


	let doc = document,
		win = window,
		root = window,
		_body = document.body,
		_documentElement = doc.documentElement,
		option
	
	if(root.kanglazyload){
		root.prekanglazyload = root.kanglazyload
	}
	let supporSrcset = 'srcset' in doc.createElement('img'),
		supportBCR = 'getBoundingClientRect' in doc.createElement('div'),
		view,
		foreach = [].forEach,
		object = {},
		debounceFun,
		flag;

	let Settings = {
		background: true,
		backgroundTag: 'data-background',
		imgSrc: true,
		imgTag: 'data-src',
		parent: null,
		srcset: false,
		srcsetTag: 'data-srcset',
		delayTime: 250,
		callback: function () { },
		rendered: function () { },
		deleleData: true,
		firstLoad: false
	};

	var lazyload = {
		cache: []
	};
	lazyload.getPositionLeft = (ele) => {
		var actLeft = ele.offsetLeft;
		var currentLeft = ele.offsetParent;
		while (currentLeft !== null) {
			actLeft += currentLeft.offsetLeft;
			currentLeft = currentLeft.offsetParent;
		}
		return actLeft - view.scrollLeft;
	};

	lazyload.getPositionTop = (ele) => {
		var actTop = ele.offsetTop;
		var currentTop = ele.offsetParent;
		while (currentTop !== null) {
			actTop += currentTop.offsetTop;
			currentTop = currentTop.offsetParent;
		}
		return actTop - view.scrollTop;
	};
	
	lazyload.init = function (opt) {
		let tags = true;
		option = lazyload.option = opt || Settings;
		let SettingKeys = Object.keys(Settings);
		for (let key of SettingKeys) {
			Settings[key] = option[key] || Settings[key];
		}
		if(tags&&debounceFun==undefined){

			debounceFun = debounce(Settings.rendered, Settings.delayTime);			
			if (document.addEventListener) {
				root.addEventListener('resize', debounceFun, false);
				root.addEventListener('scroll', debounceFun, false);
				// root.addEventListener('load', debounceFun, false);
			} else {
				root.attachEvent('onresize', debounceFun);
				root.attachEvent('onscroll', debounceFun);
				// root.attachEvent('onload', debounceFun);
			}
		}
		win.requestAnimationFrame(()=>{
			let nodes;
			
			if (Settings.parent) {
				nodes = Settings.parent.querySelectorAll('[' + Settings.imgTag + '],' + '[' + Settings.sersetTag + '],' + '[' + Settings.backgroundTag + ']');
			} else {
				nodes = doc.querySelectorAll('[' + Settings.imgTag + '],' + '[' + Settings.srcsetTag + '],' + '[' + Settings.backgroundTag + ']');
			}
			
			this.cache = []
			foreach.call(nodes, (val) => {
				this.cache.push(val);
			})

			if(!!Settings.firstLoad&&tags){
				lazyload.render();
				Settings.rendered(view);
				
			}
			tags = false
		})
		

		return lazyload

	}
	lazyload.render = function (context) {
		view = {
			Left: 0,
			Top: 0,
			scrollTop: win.pageYoffset || doc.documentElement.scrollTop || doc.body.scrollTop,
			scrollLeft: win.pageXoffset || doc.documentElement.scrollLeft || doc.body.scrollLeft,
			lookHeight: win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight,
			lookWidth: win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth
		};
		if (this.cache.length <= 0) { return; }
		let len = this.cache.length;
		if (!supportBCR) {
			for (var i = len - 1; i >= 0; i--) {
				let value = this.cache[i];
				if (isHtml(value)&& !isHidden(value)) {
					if (inViewWay2(value)) {
						srcChange(value);
						this.cache.splice(i, 1);
						Settings.callback(value, 'loaded');
					}
				}
			}
		} else {
			for (var i = len - 1; i >= 0; --i) {
				let value = this.cache[i];
				if (isHtml(value) && !isHidden(value)) {
					if (inViewWay1(value)) {
						srcChange(value);
						this.cache.splice(i, 1);
						Settings.callback(value, 'loaded');
					}
				}
			}
		}
		if (!this.cache.length) {
			lazyload.detach();
		}
	}
	lazyload.detach = () => {
		if (document.removeEventListener) {
			root.removeEventListener('resize', debounceFun);
			root.removeEventListener('scroll', debounceFun);
		} else {
			root.detachEvent('onresize', debounceFun);
			root.detachEvent('onscroll', debounceFun);
		}
		debounceFun = void 0
		clearTimeout(flag);
	};
	function isHidden(ele) {
		return ele.offsetParent === null;
	}
	function isHtml(dom) {
		return dom && (dom['nodeType'] === 1 || dom['nodeType'] === 9);
	}
	function debounce(fn, delaytime) {
		return function () {
			var that = this, args = arguments;
			if (flag) win.clearTimeout(flag);
			flag = win.setTimeout(function () {
				win.requestAnimationFrame(()=>{
					lazyload.render();
					fn.apply(that, args);
				})
			}, delaytime);
		}
	}
	function inViewWay1(dom) {
		let box = dom.getBoundingClientRect();
		return (box.right >= view.Left && box.bottom >= view.Top && box.left <= view.lookWidth && box.top <= view.lookHeight);
	}
	function inViewWay2(dom, view) {
		if (dom.offsetParent === null) { return false; }
		let Left = lazyload.getPositionLeft(dom);
		let Top = lazyload.getPositionTop(dom);
		return Left >= 0 && Top >= 0 && Left < view['lookWidth'] && Top < view['lookHeight'];
	}

	function srcChange(domElement) {
		if (supporSrcset&&Settings.srcset && domElement.getAttribute(Settings.sersetTag)) {
			let _temp = domElement.getAttribute(Settings.sersetTag);
			domElement.setAttribute('serset', _temp);
		} else if (Settings.background && domElement.getAttribute(Settings.backgroundTag)) {
			let _temp = domElement.getAttribute(Settings.backgroundTag);
			domElement.style.backgroundImage = 'url(' + _temp + ')';
		} else {
			domElement.src = domElement.getAttribute(Settings.imgTag);
		}
		if(!!Settings.deleleData){
			domElement.removeAttribute(Settings.sersetTag);
			domElement.removeAttribute(Settings.backgroundTag);
			domElement.removeAttribute(Settings.imgTag);
		}
	}
export default lazyload;
