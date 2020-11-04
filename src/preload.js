import { ipcRenderer } from 'electron';

window.ipcRenderer = ipcRenderer;

console.log('icpRenderer Loaded');