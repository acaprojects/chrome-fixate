import * as config from './config';
import '../css/main.css';


function showSetup() {
  config.set('url', 'http://www.example.com')
}

function showWebview(url) {
  const webview = document.createElement('webview');
  webview.setAttribute('src', url);
  document.body.appendChild(webview);
}

function renderUI() {
  config.get('url').then(url => {
    if (url) {
      showWebview(url);
    } else {
      showSetup();
    }
  });
}

document.body.onload = renderUI;
