chrome.app.runtime.onLaunched.addListener(() => {

  chrome.app.window.create('index.html', {
    state: 'fullscreen'
  });

  chrome.power.requestKeepAwake("display");

});
