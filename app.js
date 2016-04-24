var electron = require('electron');
var debug = false;

electron.app.on('ready', function () {
	var mainWindow;

	if (debug) {
		mainWindow = new electron.BrowserWindow({width: 800, height: 700});
	} else {
		mainWindow = new electron.BrowserWindow({width: 700, height: 260, minWidth: 400, minHeight: 300});
	}

	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});

