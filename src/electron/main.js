const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 629,
    height: 501,
    show: false,
    resizable: false,
    autoHideMenuBar: true,
  });

  const startURL = isDev
    ? 'http://localhost:3000'
    : path.join(__dirname, '../build/index.html');
  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow.destroy();
  });
}
app.on('ready', () => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
