// JavaScript Document
(function(win,doc){
	function setFont(){
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/320*20+'px';
	}
	setFont();
	win.addEventListener('resize',setFont,false);//屏幕缩小放大都可以使用
})(window,document);