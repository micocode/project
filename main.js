
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')


//主进程
const ipcMain = require('electron').ipcMain;

global.sharedObject = {
  AddressData1: '0',
  AddressData2: '0',
  AddressData3: '0',
  AddressData4: '0',
  AddressData5: '0',
  SendSerailsData: '0',
  TestSerailData: '0',
  SetE2SerailData: '0'
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let presWindow


function createWindow () {
  // Create the browser window.
  //mainWindow = new BrowserWindow({width: 1800, height: 1500, icon: './public/img/icon.png'})
	mainWindow = new BrowserWindow({show: false})
	mainWindow.maximize()
	mainWindow.show()
  // and load the ReadIndex.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'ReadIndex.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    //mainWindow = null
  })
  
/*presWindow = new BrowserWindow({
        width: 300,
        height: 300,
        show: false
    })
*/
   // presWindow.loadURL('file://' + __dirname + '/WriteIndex.html') //新窗口
	presWindow = new BrowserWindow({show: false})
	//presWindow.maximize()
  // and load the WriteIndex.html of the app.
  presWindow.loadURL('file://' + __dirname + '/WriteIndex.html')
  

  ipcMain.on('second-show',function() {
    presWindow.maximize();
    presWindow.show();
  })
  
  ipcMain.on('first-pres',function() {
    mainWindow.show();
    presWindow.hide();
    
  })
	

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('MainMsgFromFirstRender',function(event, arg) {

  console.log('Form First Msg:' + ' >> ' + arg)

 
   //主进程发送消息给渲染进程
  //mainWindow.webContents.send('SecendRenderMsgFromMain', '12345')
  //event.sender.send('SecendRenderMsgFromMain',arg)
  
})

ipcMain.on('MainMsgFromSecondRender',function(event, arg) {

  console.log('Form Second Msg:' + ' >> ' + arg)

  //event.sender.send('RenderMsgFromMain', arg)
})
