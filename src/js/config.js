const storage = chrome.storage.local;

module.exports = {

  set: (key, value) => new Promise((resolve, reject) => {
    const setting = {};
    setting[key] = value;
    storage.set(setting, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.string);
      } else {
        resolve(value);
      }
    })
  }),

  get: key => new Promise((resolve, reject) => {
    storage.get(key, items => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.string);
      } else {
        resolve(items[key]);
      }
    })
  })

}
