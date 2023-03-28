const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  win.loadFile('./index.html');

  win.webContents.on('did-finish-load', () => {
    const form = win.webContents.document.querySelector('form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const jobNumber = form.elements.jobNumber.value;
      const jobAddress = form.elements.jobAddress.value;

      // Remove all non-letter and non-digit characters from the job address using regex
      const cleanAddress = jobAddress.replace(/[^\w\s]/gi, '');

      // Convert the job number and clean address to kebab case format and join them with a dash
      const directoryName = `${jobNumber}-${cleanAddress.toLowerCase().replace(/\s+/g, '-').replace(/--+/g, '-')}`;

      try {
        fs.mkdirSync(directoryName);
        fs.mkdirSync(`${directoryName}/Calcs`);
        fs.mkdirSync(`${directoryName}/Drawings`);
        fs.mkdirSync(`${directoryName}/Soil Reports`);
        console.log(`Directory '${directoryName}' created successfully!`);
      } catch (err) {
        console.error(err);
      }
    });
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

