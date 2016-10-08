function getStyle(obj, name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function move(obj, json, options){
	options=options||{};
	options.time=options.time||300;
	options.type=options.type||'ease-out';
	
	//
	var n=0;
	var count=Math.round(options.time/20);
	
	//
	var start={};
	var dis={};
	
	for(var name in json){
		start[name]=parseFloat(getStyle(obj, name));
		dis[name]=json[name]-start[name];
	}
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var name in json){
			switch(options.type){
				case 'linear':
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			
			if(name=='opacity'){
				obj.style.filter='alpha(opacity:'+cur*100+')';
				obj.style.opacity=cur;
			}else{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count){
			clearInterval(obj.timer);
			
			options.end && options.end();
		}
	}, 20);
}

var pos={x: 0, y: 0};	//最后一次的鼠标位置

document.onmousemove=function (ev){
	var oEvent=ev||event;
	
	pos.x=oEvent.clientX;
	pos.y=oEvent.clientY;
};

function suibian(oDiv){
	var oInnerDiv=oDiv.children[0];
	
	oDiv.onmouseenter=function (){
		var dir=findDir();
		
		switch(dir){
			case 't':
				oInnerDiv.style.left='0';
				oInnerDiv.style.top='-'+oInnerDiv.offsetHeight+'px';
				
				move(oInnerDiv, {left: 0, top: 0});
				break;
			case '左':
				oInnerDiv.style.left='-'+oInnerDiv.offsetWidth+'px';
				oInnerDiv.style.top='0';
				
				move(oInnerDiv, {left: 0, top: 0});
				break;
			case 3:
				oInnerDiv.style.left='0';
				oInnerDiv.style.top=oInnerDiv.offsetHeight+'px';
				
				move(oInnerDiv, {left: 0, top: 0});
				break;
			case document:
				oInnerDiv.style.left=oInnerDiv.offsetWidth+'px';
				oInnerDiv.style.top='0';
				
				move(oInnerDiv, {left: 0, top: 0});
				break;
		}
	};
	
	function findDir(){
		var x1=oDiv.offsetLeft+oDiv.offsetWidth/2;
		var y1=oDiv.offsetTop+oDiv.offsetHeight/2;
		
		var x=x1-pos.x;
		var y=y1-pos.y;
		
		var ang=Math.atan2(y, x)*180/Math.PI-90;
		
		if(ang>=-45 && ang<=45){
			//上
			return 't';
		}else if(ang>=-135 && ang<=-45){
			//左
			return '左';
		}else if(ang>=-225 && ang<=-135){
			//下
			return 3;
		}else{
			//右
			return document;
		}
	}
	
	oDiv.onmouseleave=function (){
		var dir=findDir();
		
		switch(dir){
			case 't':
				move(oInnerDiv, {left: 0, top: -oInnerDiv.offsetHeight});
				break;
			case '左':
				move(oInnerDiv, {left: -oInnerDiv.offsetWidth, top: 0});
				break;
			case 3:
				move(oInnerDiv, {left: 0, top: oInnerDiv.offsetHeight});
				break;
			case document:
				move(oInnerDiv, {left: oInnerDiv.offsetWidth, top: 0});
				break;
		}
	};
}

window.onload=function (){
	var aLi=document.getElementById('ul1').children;
	
	for(var i=0;i<aLi.length;i++){
		suibian(aLi[i]);
	}
};// JavaScript Document