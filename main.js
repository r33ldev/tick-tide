
const { app, BrowserWindow } = require('electron');

const path = require('path');

function createWindow() {
  win = new BrowserWindow({
    // Assign it here
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile(path.join(__dirname, 'dist/index.html'));
}

app.whenReady().then(createWindow);

// Close the window properly when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
