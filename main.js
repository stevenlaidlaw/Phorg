/*
* TODO
* Allow / characters in pattern to create directories
* Prevent from running using special characters, ie : / \
* */


var fs = require('fs-extra');
var path = require('path');
var remote = require('remote');
var dialog = remote.require('dialog');
var exif = require('exif').ExifImage;
var debug = false;

var helpBox = document.getElementById('helpBox');
helpBox.style.display = 'none';
var patternBox = document.getElementById('patternBox');
var patternDemo = document.getElementById('patternDemo');
var patternString = '';
var exampleDate = new Date();

var srcDir = '';
var destDir = '';

if (debug) {
	remote.getCurrentWindow().toggleDevTools();
}

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

function renameFiles() {
	if (srcDir.length < 1) {
		alert("Please enter a source directory.");
		return;
	}
	if (destDir.length < 1) {
		alert("Please enter a destination directory.");
		return;
	}
	if (srcDir === destDir) {
		alert("Source and destination directories must not be the same.");
		return;
	}

	// Grab an array of all the image files from the source directory
	fs.readdir(srcDir, function (err, fileList) {
		fileList.forEach(function(file) {
			try {
				new exif({ image : srcDir + file }, function (error, exifData) {
					if (error) {
						console.log("Error in exif data: '" + file + "' - " + error.message);
					} else {
						if (exifData.exif.CreateDate.length > 0) {
							var dateString = exifData.exif.CreateDate;
							dateString = dateString.replace(':', '-');
							dateString = dateString.replace(':', '-');
							dateString = dateString.replace(' ','T');

							var date = new Date(dateString);

							// This is where we will order by pattern. For now let's just get the copying file thing working
							var newFile = convertDateString(date, patternString);

							newFile += path.extname(file).toLowerCase();

							fs.copy(srcDir + file, destDir + newFile, function (err) {
								if (err) {
									return console.error("Error unable to copy: '" + file + "' - " + err)
								}

								console.log("Copied '" + file + "' to '" + newFile + "'");
							});
						} else {
							console.log("Error: No creation date listed in file '" + file + "'");
						}
					}
				});
			} catch (error) {
				console.log("Error in exif data: '" + file + "' - " + error.message);
			}
		});
	});
}

function showHelp() {
	if (helpBox.style.display === 'none') {
		helpBox.style.display = 'block';
	} else {
		helpBox.style.display = 'none';
	}
}

patternBox.addEventListener('input', function (e) {
	patternString = e.target.value;
	patternDemo.innerText = convertDateString(exampleDate, e.target.value);
}, false);

function addZero (num) {
	if (num < 10) {
		num = '0' + num;
	}
	return num;
}

function convertDateString(date, text) {
	text = text.replace('$Y', date.getFullYear());
	text = text.replace('$y', date.getYear());
	text = text.replace('$M', addZero(date.getMonth() + 1));
	text = text.replace('$D', addZero(date.getDate()));
	text = text.replace('$H', addZero(date.getHours()));
	text = text.replace('$m', addZero(date.getMinutes()));
	text = text.replace('$S', addZero(date.getSeconds()));

	return text;
}