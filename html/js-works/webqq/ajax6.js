//版权 北京智能社©, 保留所有权利
//url,data,type,timeout,success,error
function ajax(options){
	//-1.整理options
	options=options||{};
	options.data=options.data||{};
	options.type=options.type||'get';
	options.timeout=options.timeout||0;
	
	//0.整理data	json  --> string
	options.data.t=Math.random();
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));	
	}
	var str = arr.join('&');
	
	//1.创建ajax
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	if(options.type=='get'){//get
		//2.建立连接
		oAjax.open('get',options.url+'?'+str,true);
		//3.发送
		oAjax.send();
	}else {//post
		//2.建立连接	
		oAjax.open('post',options.url,true);
		//设置请求头
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		oAjax.send(str);
	}
	
	
	//4.接收
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			clearTimeout(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				options.success && options.success(oAjax.responseText);	
			}else{
				options.error && options.error(oAjax.status);
			}
		}
	}
	
	//5.超时
	if(options.timeout){
		var timer=setTimeout(function(){
			//数据不要了	，你别加载
			oAjax.abort();//中断ajax请求,也会触发readyState==4
		},options.timeout);
	}
	
}