//
// Yangko Studio
// Java Script
// 1001
//
/*while (psw !=123456) {
    var psw = prompt("输入密码");
    if (psw != 123456){
        alert("密码错误");
    }
}
*/
function startTime()
{
	var today=new Date()
	var y=today.getFullYear()
	var mon=today.getMonth()+1
	var d=today.getDate()
	var hour=today.getHours()
	var min=today.getMinutes()
	var sec=today.getSeconds()
	var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	var w= weeks[today.getDay()]
	min=checkTime(min)
	sec=checkTime(sec)
	document.getElementById('txt').innerHTML=y+" 年 "+mon+" 月 "+d+" 日  "+w+" "+hour+":"+min+":"+sec
	t=setTimeout('startTime()',500)
}
function checkTime(i)
{
	if (i<10)
	{i="0" + i}
	return i
}
function popDiv(){
	var popDiv = document.getElementById("menu");
	var getDisplay = document.getElementById("menu").style.display;
	if(getDisplay == 'block'){
		popDiv.style.display = "none";	
	}
	else{
		popDiv.style.display = "block";
	}
	
}
function fadeIn(element,speed){
    if(element.style.opacity !=1){
        var speed = speed || 30 ;
        var num = 0;
        var st = setInterval(function(){
        num++;
        element.style.opacity = num/10;
        if(num>=10)  {  clearInterval(st);  }
        },speed);
    }
}

function fadeOut(element){
    if(element.style.opacity !=0){
        var speed = speed || 30 ;
        var num = 10;
        var st = setInterval(function(){
        num--;
        element.style.opacity = num / 10 ;
        if(num<=0)  {   clearInterval(st);  }
        },speed);
    }

}

function btnIn(){
    fadeIn(menu,100);
}

function btnOut(){
    fadeOut(menu,100);
}
function search() {
	if (document.querySelector(".search").value != "") {
		window.location.href = "https://cn.bing.com/search?q=" + document.querySelector(".search").value;
		document.querySelector(".search").value = "";
	}
	return false;
}