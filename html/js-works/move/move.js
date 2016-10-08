//版权 北京智能社©, 保留所有权利
function getStyle(obj,attr){
	return (obj.currentStyle||getComputedStyle(obj,false))[attr];
}
function move(obj,json,options){
	//整理可选参数
	options = options || {};
	options.duration = options.duration || 300;
	options.complete = options.complete || null;
	options.easing = options.easing || 'ease-out';
	
	var start={};	
	var dis={};	
	for(var key in json){
		start[key]=parseFloat(getStyle(obj,key));
		
		if(isNaN(start[key])){
			switch(key){
				case 'width':
					start[key]=obj.offsetWidth;	
					break;
				case 'height':
					start[key]=obj.offsetHeight;	
					break;
				case 'opacity':
					start[key]=1;	
					break;
				case 'left':
					start[key]=0;	
					break;
				case 'top':
					start[key]=0;	
					break;
				//marginLeft/top...	padding
			}	
		}
		
		
		dis[key]=json[key]-start[key];
	}
	var count=Math.round(options.duration/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		for(var key in json){//办事部分包起来
			switch(options.easing){
				case 'linear':	
					var a=n/count;//	匀速运动
					var cur=start[key]+dis[key]*a;
					break;	
				case 'ease-in':
					var a=n/count;//	加速运动
					var cur=start[key]+dis[key]*(a*a*a);
					break;	
				case 'ease-out':
					var a=1-n/count;//	减速运动
					var cur=start[key]+dis[key]*(1-a*a*a);
					break;	
			}
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity='+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
			}	
		}
		
		if(n==count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
	},30);
}