function LoginGithub() {
  window.location.href = "https://github.com/login/oauth/authorize?client_id=Iv1.099e26177b1fe328"
}
function LogoutGithub(){
  window.location.href = "https://github.com/settings/connections/applications/Iv1.099e26177b1fe328?_method=delete"
}
function GetToken(){
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  window.location.href = "https://github.com/login/oauth/access_token?client_id=Iv1.099e26177b1fe3286&client_secret=1c3ec7ca56f812207599af19fd19eb8930c1f1e4" + "&code=" + code;
}
function LoginMicrosoft(){
  window.location.href = "https://login.live.com/oauth20_authorize.srf?client_id=c12368f2-1b5d-4f4b-988c-649d7f9c6bcd&redirect_uri=http://localhost:5500/src/page/sign.html&response_type=code&scope=https%3a%2f%2fgraph.microsoft.com%2fuser.read";
}