var electron = require('electron');

electron.app.on('ready', function () {
	var mainWindow = new electron.BrowserWindow({width: 650, height: 300});

	mainWindow.loadURL('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});
});

