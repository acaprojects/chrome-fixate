import { captureKey } from './util';
import '../css/main.scss';


// DOM references
const webview = document.querySelector('webview');
const setup = document.querySelector('#setup');
const urlInput = document.querySelector('#setup input[name="url"]');


module.exports = {

  /**
   * Display the setup / URL entry view.
   */
  showSetup: (callback, prefill) => {
    webview.classList.add('hidden');
    webview.stop();

    if (prefill) {
      urlInput.value = prefill;
      urlInput.focus();
      urlInput.selectionStart = urlInput.selectionEnd = urlInput.value.length;
    } else {
      urlInput.value = '';
      urlInput.onfocus = () => urlInput.value = 'https://';
    }

    urlInput.onkeydown = captureKey('Enter', e => e.target.blur());
    urlInput.onblur = () => callback(urlInput.value);

    setup.classList.remove('hidden');
  },

  /**
   * Display the wrapped web app.
   */
  showWebview: url => {
    setup.classList.add('hidden');
    webview.classList.add('hidden');

    webview.setAttribute('src', url);

    webview.onloadstop = e => e.target.classList.remove('hidden');
  }

}
