function startTime()
{
	var today=new Date()
	var y=today.getFullYear()
	var mon=today.getMonth()+1
	var d=today.getDate()
	var hour=today.getHours()
	var min=today.getMinutes()
	var sec=today.getSeconds()
	var weeks = new Array("Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat");
	var w= weeks[today.getDay()]
	min=checkTime(min)
	sec=checkTime(sec)
	document.getElementById('txt').innerHTML=y+"-"+mon+"-"+d+" "+w+" "+hour+":"+min+":"+sec
	t=setTimeout('startTime()',500)
}
function checkTime(i)
{
	if (i<10)
	{i="0" + i}
	return i
}