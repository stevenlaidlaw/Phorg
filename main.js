var fs = require('fs');
var remote = require('remote');
var dialog = remote.require('dialog');
var srcDir = '';
var destDir = '';

function openFile(name) {
	dialog.showOpenDialog({properties:['openDirectory']}, function (filenames) {
		if (filenames === undefined) {
			return;
		}
		var filename = filenames[0];

		var textbox;

		if (name === 'src') {
			textbox = document.getElementById('srcText');
			srcDir = filename;
		} else {
			textbox = document.getElementById('destText');
			destDir = filename;
		}

		textbox.innerHTML = filename;
	});
}

function showHelp() {
	alert('This is where the help with patterns will go');
}
