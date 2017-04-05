import * as config from './config';
import { captureKey, validate } from './util';
import '../css/main.scss';


const webview = document.querySelector('webview');
const setup = document.querySelector('#setup');
const urlInput = document.querySelector('#setup input[name="url"]');


/**
 * Display the setup / URL entry view
 */
function showSetup(callback, prefill = null) {
  webview.classList.add('hidden');

  if (prefill) {
    urlInput.value = prefill;
    urlInput.focus();
    urlInput.selectionStart = urlInput.selectionEnd = urlInput.value.length;
  } else {
    urlInput.onfocus = () => urlInput.value = 'https://';
  }

  urlInput.onkeydown = captureKey('Enter', e => e.target.blur());
  urlInput.onblur = () => callback(urlInput.value);

  setup.classList.remove('hidden');
}

/**
 * Display the wrapped web app.
 */
function showWebview(url) {
  setup.classList.add('hidden');
  webview.classList.add('hidden');

  webview.setAttribute('src', url);

  webview.onloadstop = e => e.target.classList.remove('hidden');
}


/**
 * Attempt to bind the app to a web app URL.
 */
function bind(target) {
  console.log(`Binding to ${target}`);
  validate(target)
    .then(config.setUrl)
    .then(showWebview)
    .catch(url => showSetup(bind, url))
}

/**
 * Nuke the current bining.
 */
function unbind() {
  console.log('Clearing binding');
  bind(null);
}


document.body.onkeydown = captureKey('Escape', unbind);

document.body.onload = () => config.getUrl().then(bind);
