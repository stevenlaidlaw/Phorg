var electron = require('electron');

electron.app.on('ready', function () {
	var mainWindow;

	mainWindow = new electron.BrowserWindow({width: 700, height: 340, minWidth: 700, minHeight: 340, icon: __dirname + '/images/icon.ico'});
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});

