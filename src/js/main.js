import '../css/main.css';

document.body.onload = createWebview('http://www.acaprojects.com');

function createWebview(url) {
  const webview = document.createElement('webview');
  webview.setAttribute('src', url);

  document.body.appendChild(webview);
}
