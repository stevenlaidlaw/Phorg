import electron from 'electron'

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
		width: 700,
		height: 340,
		maxWidth: 700,
		maxHeight: 340,
		minWidth: 700,
		minHeight: 340,
		icon: __dirname + '/images/icon.ico'
	})

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, './index.html'),
		protocol: 'file:',
		slashes: true
	}))

	if (process.env.NODE_ENV === 'development') {
		// Open the DevTools.
		mainWindow.webContents.openDevTools()
	}

	mainWindow.on('closed', function () {
		// Dereference the window object
		mainWindow = null
	})
}

app.on('ready', createWindow)

// Quit when all windows are closed on OSX
app.on('window-all-closed', function () {
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
