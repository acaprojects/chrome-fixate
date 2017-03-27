chrome.app.runtime.onLaunched.addListener(() => {
  chrome.app.window.create('main.html', {
    state: 'fullscreen'
  });
});
