//版权 北京智能社©, 保留所有权利
function getCookie(name){
	var arr=document.cookie.split('; ');
	for(var i=0;i<arr.length;i++){
		var arr2=arr[i].split('=');	
		if(arr2[0]==name){
			return arr2[1];	
		}
	}
	return '';
}

function removeCookie(name){
	setCookie(name,0,-1);
}

function setCookie(name,value,timeout){
	var d=new Date();
	d.setDate(d.getDate()+timeout);
	document.cookie=name+'='+value+';expires='+d;	
}
