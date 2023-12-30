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
function about(){
    alert("Yangko Studio Website\nVersion:1000");
}
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
	// 通过唯一id值获取div元素
	var popBox = document.getElementById("menu");
	var popLayer = document.getElementById("popLayer");

	// 控制两个div的显示与隐藏
	popBox.style.display = "block";
	popLayer.style.display = "block";
}

function closePop(){
	// 通过唯一id值获取弹出窗口元素
	let popDiv = document.getElementById("menu");

	popDiv.style.display = "none";
}