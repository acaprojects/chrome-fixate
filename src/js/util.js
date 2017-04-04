import { isWebUri } from 'valid-url';


module.exports = {

  /**
   * Provide a filtered key event handler.
   */
  captureKey: (key, handler) => {
    return e => {
      if (e.key == key) {
        handler(e);
        e.preventDefault();
      }
    }
  },

  /**
   * Validate a url.
   */
  validate: url => new Promise((resolve, reject) => {
    isWebUri(url) ? resolve(url) : reject(url);
  })

}
