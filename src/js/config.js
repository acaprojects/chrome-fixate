const storage = chrome.storage.local;

/**
 * Set a value in the chrome OS local storage.
 */
function set(key, value) {
  return new Promise((resolve, reject) => {
    const setting = {};
    setting[key] = value;
    storage.set(setting, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.string);
      } else {
        resolve(value);
      }
    });
  });
}

/**
 * Lookup a stored value.
 */
function get(key) {
  return new Promise((resolve, reject) => {
    storage.get(key, items => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.string);
      } else {
        resolve(items[key]);
      }
    });
  });
}

module.exports = {

  setUrl: url => set('url', url),

  getUrl: () => get('url')

};
