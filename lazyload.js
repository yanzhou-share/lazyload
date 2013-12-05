/**
 * lazy load images when scroll
 * single plugin
 * 
 * {selector:'', offset:''}
 * sandyz 
 * 20131205
 */
;(function(win, doc, undefined){
	'use strict';
	var opts, timer, time, nodes = [], selector, offset, store = [];
	
	var Single = function(options){
		opts = options || {};
		selector = opts.selector || "data-single";
		nodes = doc.querySelectorAll("["+selector+"]");
		offset = opts.offset || 0;
		time = opts.time || 300;
		timer = null;
		
		_init();
	}	
	
	function _scroll(){
		clearTimeout(timer);
		timer = setTimeout(_pollNode, time);
	}
	
	function _init(){
		_addEvents();
		_pushNode();
		_scroll();
	}
	
	function _pushNode(){
		for(var i=0;i<nodes.length;i++){
			store.push(nodes[i]);	
		}
	}
	
	function _pollNode(){
		for(var i = store.length; i--;) {
			var self = store[i];
			
			if (_inView(self)) {
				self.src = self.getAttribute(selector);
				store.splice(i, 1);
			}
	    }
	}
	
	function _inView(el){
		var _nodeoffset = el.getBoundingClientRect();
		
		return ((_nodeoffset.top >= 0 && _nodeoffset.left >= 0 && _nodeoffset.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
	}	
	
	function _addEvents(){
		if(doc.addEventListener){
			win.addEventListener('scroll', _scroll, false);
		} else {
			win.attachEvent('onscroll', _scroll);
		}
	}
	
	window.Single = Single;
	
})(window, document);
