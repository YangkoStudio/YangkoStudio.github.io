function LoginMicrosoft(){
  window.location.href = "https://login.microsoftonline.com/3f88dd04-8eee-4173-ad3a-8cd251b381b7/oauth2/v2.0/authorize?client_id=ba233a00-6507-4339-a08d-3b6cf17286a6&response_type=code&redirect_uri=http://localhost:5500/src/page/sign.html&response_mode=query&scope=api://ba233a00-6507-4339-a08d-3b6cf17286a6/Forecast.Read"
}
function GetToken(){
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
}
const url = new URL(window.location.href);
const code = url.searchParams.get("code");
if(code != null){
  console.log(code);
  var httpRequest = new XMLHttpRequest();
  var xurl = "https://login.microsoftonline.com/3f88dd04-8eee-4173-ad3a-8cd251b381b7/oauth2/v2.0/token?client_id=ba233a00-6507-4339-a08d-3b6cf17286a6&session_state=ba233a00-6507-4339-a08d-3b6cf17286a6&redirect_uri=http://localhost:5500/src/page/sign.html&grant_type=authorization_code&client_secret=68U8Q~U~fxU5Y~L_6um8tRz.QdBJ-l_ZfyxZIaCd&code=" + code;
  httpRequest.open("POST", xurl, true);
  httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  httpRequest.onreadystatechange = function () {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      //处理响应结果
      var result = httpRequest.responseText;
      console.log(result);
    } else {
      //处理请求失败
      console.log('请求失败');
      var result = httpRequest.responseText;
      console.log(result);
    }
  }
};
httpRequest.send("param1=value1&param2=value2");




}
