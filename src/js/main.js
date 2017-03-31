import * as config from './config';
import '../css/main.scss';


function showSetup() {
  const form = document.querySelector('#settings');
  form.classList.remove('hidden');

  config.set('url', 'http://www.example.com')
}

function showWebview(url) {
  const webview = document.querySelector('webview');
  webview.setAttribute('src', url);
  webview.classList.remove('hidden');
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
