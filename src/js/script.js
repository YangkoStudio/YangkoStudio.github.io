//移动端适配
if (isMobile()) {
	document.getElementsById("mobile").style.display="none";
} else {}

//时间函数
function startTime(){var today=new Date();var y=today.getFullYear();var mon=today.getMonth()+1;var d=today.getDate();var hour=today.getHours();var min=today.getMinutes();var sec=today.getSeconds();var weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");var w= weeks[today.getDay()];min=checkTime(min);sec=checkTime(sec);document.getElementById('txt').innerHTML=y+"-"+mon+"-"+d+" "+w+" "+hour+":"+min+":"+sec;t=setTimeout('startTime()',500)}
function checkTime(i){if(i<10){i="0"+i}return i}
//平台函数
function isMobile(){let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);return flag;}
