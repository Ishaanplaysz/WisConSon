const { app, BrowserWindow, ipcMain, powerSaveBlocker, dialog } = require('electron');
const path = require('path');
const { execSync } = require('child_process');

let mainWindow;
let psbId = null; // power save blocker id

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 420,
    height: 320,
    resizable: false,
    fullscreenable: false,
    title: 'WisConSon',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

// IPC handlers
ipcMain.handle('start-keep-awake', () => {
  if (psbId !== null && powerSaveBlocker.isStarted(psbId)) {
    return { started: true };
  }
  psbId = powerSaveBlocker.start('prevent-display-sleep');
  return { started: powerSaveBlocker.isStarted(psbId) };
});

ipcMain.handle('stop-keep-awake', () => {
  if (psbId !== null && powerSaveBlocker.isStarted(psbId)) {
    powerSaveBlocker.stop(psbId);
    psbId = null;
  }
  return { stopped: true };
});


ipcMain.handle('get-screen-info', () => {
  const { screen } = require('electron');
  const primary = screen.getPrimaryDisplay();
  return {
    size: primary.size,
  scaleFactor: primary.scaleFactor,
  keepAwake: psbId !== null && powerSaveBlocker.isStarted(psbId)
  };
});

ipcMain.handle('app-update', async () => ({ ok: true, message: 'Updates are disabled.' }));

ipcMain.handle('uninstall-app', async () => {
  const choice = await dialog.showMessageBox({
    type: 'question',
    buttons: ['Yes', 'No'],
    title: 'Confirm Uninstall',
    message: 'Are you sure you want to uninstall WisConSon?'
  });

  if (choice.response === 0) {
    const uninstallString = `"${path.join(process.resourcesPath, '..', 'Uninstall WisConSon.exe')}"`;
    try {
      execSync(uninstallString);
      app.quit();
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
  return { ok: false, cancelled: true };
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
