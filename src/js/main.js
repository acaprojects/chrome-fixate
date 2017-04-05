import * as config from './config';
import * as ui from './ui';
import { captureKey, validate } from './util';
import '../css/main.scss';


/**
 * Binder for attaching the app to a specific URL.
 *
 * Call to transition the app to it's bound / running state.
 */
const bind = url =>
  validate(url)
    .then(config.setUrl)
    .then(ui.showWebview)
    .catch(setup);

/**
 * Composed setup function with the binder pre-injected.
 *
 * Call to transition the app to the setup screen.
 */
const setup = prefill => ui.showSetup(bind, prefill);

/**
 * Reconfigure the current URL binding.
 */
const rebind = () => config.getUrl().then(setup);

/**
 * Nuke the current binding.
 */
const unbind = () => config.setUrl(null).then(setup);


document.body.addEventListener('keydown', captureKey('Escape', rebind));
document.body.addEventListener('keydown', captureKey('~', unbind));

document.body.onload = () => config.getUrl().then(bind);
