/*const { app, BrowserWindow, } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    title: 'WebAPPLICATION PURCHASED',
    frame: true,
    icon: "iconcompany.ico",
      width: 1400,
      height: 1000,
      maxWidth: 1920,
      maxHeight: 1200,
      minWidth: 1020,
      minHeight: 750,  
      backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.setMenu(null);


  const startUrl = app.isPackaged
  ? `file://${path.join(__dirname, '..', 'build', 'index.html')}`
  : 'http://localhost:3000';

win.loadURL(startUrl);

  // Remove or comment this line to avoid white screen in production
  // win.webContents.openDevTools();
}

// Initialize app

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); */
//CODE OF EXACT GOOD VERSION FOR PROPER FRONT_END
 
/*const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    title: 'WebAPPLICATION PURCHASED',
    frame: false, // Custom Title Bar
    icon: "iconcompany.ico",
    width: 1400,
    height: 1000,
    maxWidth: 1920,
    maxHeight: 1200,
    minWidth: 1020,
    minHeight: 750,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false, // Keep this false for security
      contextIsolation: true,  // Enable Preload
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.setMenu(null);

  const startUrl = app.isPackaged
    ? `file://${path.join(__dirname, '..', 'build', 'index.html')}`
    : 'http://localhost:3000';

  win.loadURL(startUrl);
}

// Handle window actions from Renderer
ipcMain.on("window-minimize", () => {
  if (win) win.minimize();
});

ipcMain.on("window-maximize", () => {
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.on("window-close", () => {
  if (win) win.close();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});*/

//CODE SHARED BY ANSHU
/*const { app, BrowserWindow } = require('electron'); 
const path = require('path'); 
const { execFile } = require('child_process'); 
let flaskProcess; 
function createWindow() { 
const win = new BrowserWindow({ 
width: 800, 
height: 600, 
webPreferences: { 
nodeIntegration: true, 
            contextIsolation: false, 
        }, 
    }); 
 
    // Start Flask server (app.exe) 
    flaskProcess = execFile(path.join(__dirname, 'dist', 'app.exe'), (error) => { 
        if (error) { 
            console.error('Error starting Flask server:', error); 
        } 
    }); 
 
    // Wait for Flask server to start 
    setTimeout(() => { 
        win.loadURL('http://localhost:5000'); 
    }, 2000); 
 
    win.on('closed', () => { 
        if (flaskProcess) flaskProcess.kill(); 
    }); 
} 
 
app.whenReady().then(() => { 
    createWindow(); 
    app.on('activate', () => { 
        if (BrowserWindow.getAllWindows().length === 0) createWindow(); 
    }); 
}); 
app.on('window-all-closed', () => { 
if (flaskProcess) flaskProcess.kill(); 
if (process.platform !== 'darwin') app.quit(); 
}); */

//CHATGPT CODE 

/*const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    title: 'WebAPPLICATION PURCHASED',
    frame: false, // Custom Title Bar
    icon: "iconcompany.ico",
    width: 1400,
    height: 1000,
    maxWidth: 1920,
    maxHeight: 1200,
    minWidth: 1020,
    minHeight: 750,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false, // Keep this false for security
      contextIsolation: true,  // Enable Preload
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.setMenu(null);

  const startUrl = app.isPackaged
  ? `file://${path.join(__dirname, 'build', 'index.html')}`
  : 'http://localhost:3000';

mainWindow.loadURL(startUrl);


  win.loadURL(startUrl).catch(err => {
    console.error("Failed to load URL:", err);
  });
  
}

// Handle window actions from Renderer
ipcMain.on("window-minimize", () => {
  if (win) win.minimize();
});

ipcMain.on("window-maximize", () => {
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.on("window-close", () => {
  if (win) win.close();
});

app.whenReady().then(createWindow);

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
*/






//GROK CODE FOR PACKAGEING
{/*
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    title: 'JmeterAI',
    frame: false, // Custom Title Bar
    icon: "iconcompany.ico",
    width: 1400,
    height: 1000,
    maxWidth: 1920,
    maxHeight: 1200,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false, // Keep this false for security
      contextIsolation: true,  // Enable Preload
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.setMenu(null);

  const startUrl = app.isPackaged
    ? `file://${path.join(__dirname, '..', 'build', 'index.html')}`
    : 'http://localhost:3000';

  win.loadURL(startUrl).catch(err => {
    console.error("Failed to load URL:", err);
  });
}

// Handle window actions from Renderer
ipcMain.on("window-minimize", () => {
  if (win) win.minimize();
});

ipcMain.on("window-maximize", () => {
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.on("window-close", () => {
  if (win) win.close();
});

app.whenReady().then(createWindow);

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
*/}












// // E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\frontend\main.js
// const { app, BrowserWindow, ipcMain, screen } = require('electron');
// const path = require('path');
// const { spawn } = require('child_process');

// let win;
// let backendProcess;

// function createWindow() {
//   const { width, height } = screen.getPrimaryDisplay().workAreaSize;
//   const windowWidth = Math.min(1400, width * 0.9);
//   const windowHeight = Math.min(1000, height * 0.9);

//   win = new BrowserWindow({
//     title: 'JmeterAI',
//     frame: false,
//     icon: path.join(__dirname, 'public', 'JmeterAI.ico'),
//     width: windowWidth,
//     height: windowHeight,
//     minWidth: 800,
//     minHeight: 600,
//     backgroundColor: 'white',
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js'),
//     },
//   });

//   win.setMenu(null);

//   const startUrl = app.isPackaged
//     ? `file://${path.join(__dirname, '..', 'build', 'index.html')}#/`
//     : 'http://localhost:3000';

//   win.loadURL(startUrl).catch(err => {
//     console.error("Failed to load URL:", err);
//   });
// }

// function startBackend() {
//   const backendPath = app.isPackaged
//     ? path.join(process.resourcesPath, 'JmeterAI.exe') // Updated path
//     : path.join(__dirname, '..', 'backend', 'app.py');

//   if (app.isPackaged) {
//     backendProcess = spawn(backendPath, [], { stdio: 'inherit' });
//   } else {
//     backendProcess = spawn('python', [backendPath], { stdio: 'inherit' });
//   }

//   backendProcess.on('error', (err) => {
//     console.error('Failed to start backend:', err);
//   });

//   backendProcess.on('exit', (code) => {
//     console.log(`Backend exited with code ${code}`);
//   });
// }

// ipcMain.on("window-minimize", () => {
//   if (win) win.minimize();
// });

// ipcMain.on("window-maximize", () => {
//   if (win) {
//     if (win.isMaximized()) {
//       win.unmaximize();
//     } else {
//       win.maximize();
//     }
//   }
// });

// ipcMain.on("window-close", () => {
//   if (win) win.close();
// });

// app.whenReady().then(() => {
//   startBackend();
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     if (backendProcess) {
//       backendProcess.kill();
//     }
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// app.on('before-quit', () => {
//   if (backendProcess) {
//     backendProcess.kill();
//   }
// });








// E:\EXACT_DESKTOP_APP-20250324T050853Z-001\EXACT_DESKTOP_APP\frontend\main.js
const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let win;
let backendProcess;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = Math.min(1400, width * 0.9);
  const windowHeight = Math.min(1000, height * 0.9);

  win = new BrowserWindow({
    title: 'JAI',
    frame: false,
    icon: path.join(__dirname, 'public', 'JmeterAI.ico'),
    width: windowWidth,
    height: windowHeight,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.setMenu(null);

  const startUrl = app.isPackaged
    ? 'http://localhost:5000'  // Load from backend in production mode
    : 'http://localhost:3000'; // Load from React dev server in development mode

  win.loadURL(startUrl).catch(err => {
    console.error("Failed to load URL:", err);
  });

  // Open DevTools for debugging in production mode
  if (app.isPackaged) {
    win.webContents.openDevTools();
  }
}

function startBackend() {
  const backendPath = app.isPackaged
    ? path.join(process.resourcesPath, 'JmeterAI.exe')
    : path.join(__dirname, '..', 'backend', 'app.py');

  console.log(`Starting backend from path: ${backendPath}`); // Debug log

  if (app.isPackaged) {
    backendProcess = spawn(backendPath, [], { stdio: 'inherit' });
  } else {
    backendProcess = spawn('python', [backendPath], { stdio: 'inherit' });
  }

  backendProcess.on('error', (err) => {
    console.error('Failed to start backend:', err);
  });

  backendProcess.on('exit', (code) => {
    console.log(`Backend exited with code ${code}`);
  });
}

ipcMain.on("window-minimize", () => {
  if (win) win.minimize();
});

ipcMain.on("window-maximize", () => {
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.on("window-close", () => {
  if (win) win.close();
});

app.whenReady().then(() => {
  startBackend();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (backendProcess) {
      backendProcess.kill();
    }
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});






