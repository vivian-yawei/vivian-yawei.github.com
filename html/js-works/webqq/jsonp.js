//版权 北京智能社©, 保留所有权利

//url,data,success,error,cbKey,timeout
function jsonp(options){
	//0.整理options
	options=options||{};
	options.data=options.data||{};
	options.cbKey=options.cbKey||'cb';
	options.timeout=options.timeout||0;
	
	options.data[options.cbKey]=('jsonp'+Math.random()).replace('.','');
	window[options.data[options.cbKey]]=function(json){
		clearTimeout(timer);
		options.success && options.success(json);
		//清理工作
		document.getElementsByTagName('head')[0].removeChild(oSc);
		window[options.data[options.cbKey]]=null;
	};
	//1.整理data
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	var str=arr.join('&');
	
	//2.创建script,丢到页面
	var oSc=document.createElement('script');
	oSc.src=options.url+'?'+str;
	document.getElementsByTagName('head')[0].appendChild(oSc);
	
	//3.超时
	if(options.timeout){
		var timer=setTimeout(function(){
			options.error && options.error();
			window[options.data[options.cbKey]]=function(){
				window[options.data[options.cbKey]]=null;
				document.getElementsByTagName('head')[0].removeChild(oSc);
			};
		},options.timeout);	
	}
	
}