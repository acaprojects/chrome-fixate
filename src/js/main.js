import * as config from './config';
import '../css/main.scss';


document.body.onload = () => {

  const webview = document.querySelector('webview');
  const setupForm = document.querySelector('#settings');
  const urlInput = document.querySelector('#settings input[name="url"]');

  setupForm.onsubmit = e => {
    config.set('url', urlInput.value);
    e.preventDefault();
  }

  config.get('url').then(url => {
    if (url) {
      // show the bound URL as a webview
      webview.setAttribute('src', url);
      webview.classList.remove('hidden');
    } else {
      // nothing bound, await config
      setupForm.classList.remove('hidden')
    }
  });

}
