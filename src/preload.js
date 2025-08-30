const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('wis', {
  start: () => ipcRenderer.invoke('start-keep-awake'),
  stop: () => ipcRenderer.invoke('stop-keep-awake'),
  screen: () => ipcRenderer.invoke('get-screen-info'),
  update: () => ipcRenderer.invoke('app-update'),
  uninstall: () => ipcRenderer.invoke('uninstall-app')
});
