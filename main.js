var fs = require('fs-extra');
var path = require('path');
var remote = require('remote');
var dialog = remote.require('dialog');
var exif = require('exif').ExifImage;
var debug = true; // TODO Set to false

var srcDir = '/Users/stevenlaidlaw/Downloads/unsorted/'; // TODO Revert these to blank
var destDir = '/Users/stevenlaidlaw/Downloads/sorted/'; // TODO Revert these to blank

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
							dateString = dateString.replace(' ','_');
							dateString = dateString.replace(':', 'h');
							dateString = dateString.replace(':', 'm');

							//var date = new Date(dateString);

							// This is where we will order by pattern. For now let's just get the copying file thing working
							var newFile = dateString;

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
	alert('This is where the help with patterns will go');
}
