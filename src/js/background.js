chrome.app.runtime.onLaunched.addListener(() => {

  chrome.app.window.create('index.html', {
    state: 'fullscreen'
  });

  chrome.power.requestKeepAwake("display");

});


chrome.commands.onCommand.addListener(command => {

  const handlers = {
    'exit-app': exitApp
  };

  const defaultHandler = () => undefined;
  const handler = cmd => handlers[cmd] || defaultHandler;

  handler(command).apply();

});

const closeWindow = win => win.close();
const exitApp = () => chrome.app.window.getAll().forEach(closeWindow);
