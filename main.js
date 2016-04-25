var fs = require('fs-extra');
var path = require('path');
var remote = require('remote');
var dialog = remote.require('dialog');
var exif = require('exif').ExifImage;

var helpBox = document.getElementById('helpBox');
helpBox.style.display = 'none';
var patternBox = document.getElementById('patternBox');
var patternDemo = document.getElementById('patternDemo');
var patternString = '';
var exampleDate = new Date();

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
			srcDir = filename + '/';
		} else {
			textbox = document.getElementById('destText');
			destDir = filename + '/';
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
				new exif({ image : srcDir + '/' + file }, function (err, exifData) {
					if (err) {
						console.log("Error in exif data: '" + file + "' - " + err.message);
					} else {
						if (exifData.exif.CreateDate.length > 0) {
							var dateString = exifData.exif.CreateDate;
							dateString = dateString.replace(':','-');
							dateString = dateString.replace(':','-');
							dateString = dateString.replace(' ','T');

							var date = new Date(dateString);

							// This is where we will order by pattern. For now let's just get the copying file thing working
							var newFile = convertDateString(date, patternString);

							newFile += path.extname(file).toLowerCase();

							var newDirectory = newFile.substr(0, newFile.lastIndexOf('/'));

							fs.mkdirs(newDirectory , function(err) {
								if (err) {
									return console.error("Error unable to create directory: '" + newDirectory + "' - " + err)
								}

								fs.copy(srcDir + '/' + file, destDir + '/' + newFile, function (err) {
									if (err) {
										return console.error("Error unable to copy: '" + file + "' - " + err)
									}

									console.log("Copied '" + file + "' to '" + newFile + "'");
								});
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
	while (text.includes('$Y')) {
		text = text.replace('$Y', date.getFullYear());
	}
	while (text.includes('$y'))
		text = text.replace('$y', date.getYear());
	while (text.includes('$M'))
		text = text.replace('$M', addZero(date.getMonth() + 1));
	while (text.includes('$D'))
		text = text.replace('$D', addZero(date.getDate()));
	while (text.includes('$H'))
		text = text.replace('$H', addZero(date.getHours()));
	while (text.includes('$m'))
		text = text.replace('$m', addZero(date.getMinutes()));
	while (text.includes('$S'))
		text = text.replace('$S', addZero(date.getSeconds()));

	// Remove all forbidden characters in linux/windows except '/' as they should be handled already
	while (text.includes('<'))
		text = text.replace('<','_');
	while (text.includes('>'))
		text = text.replace('>','_');
	while (text.includes(':'))
		text = text.replace(':','_');
	while (text.includes('"'))
		text = text.replace('"','_');
	while (text.includes('\\'))
		text = text.replace('\\','_');
	while (text.includes('|'))
		text = text.replace('|','_');
	while (text.includes('?'))
		text = text.replace('?','_');
	while (text.includes('*'))
		text = text.replace('*','_');

	return text;
}