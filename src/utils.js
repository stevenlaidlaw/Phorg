import fs from 'fs-extra';
import path from 'path';
import {ExifImage} from 'exif';

/**
 * Replace all the matching pattern data with the correct date value
 * Also remove any characters not allowed in the filesystem
 * @param {string} pattern 
 * @param {Date} date 
 */
export const patternDateReplace = (pattern, date) => (
	pattern
		.replace(/\$Y/g, date.getFullYear())
		.replace(/\$y/g, date.getYear())
		.replace(/\$M/g, addZero(date.getMonth() + 1))
		.replace(/\$D/g, addZero(date.getDate()))
		.replace(/\$H/g, addZero(date.getHours()))
		.replace(/\$m/g, addZero(date.getMinutes()))
		.replace(/\$S/g, addZero(date.getSeconds()))
		.replace(/[<>:"\\\|\?\*]/g, '_')
);

/**
 * Append a zero to the beginning in proper date format
 * @param {number} num The number
 */
export const addZero = (num) => num < 10 ? `0${num}` : num;

/**
 * Copy and rename the files
 * @param {string} srcDir The image source director
 * @param {string} destDir The destination for the new images
 * @param {string} pattern The pattern to follow when creating the directory structure and file names
 */
export const processFiles = async (srcDir, destDir, pattern) => {
	try {
		// Grab an array of all the image files from the source directory
		const fileList = await fs.readdir(srcDir);

		fileList.forEach(async file => {
			try {
				new ExifImage({image: `${srcDir}/${file}`}, (err, exifData) => {
					if (exifData.exif.CreateDate.length <= 0) {
						console.error(`Error in exif data: '${file}' - ${err.message}`);
						return;
					}

					// Exif data returns in an odd format (YYYY:MM:DD HH:mm:SS), so we need to fix it for date parsing
					const dateString = exifData.exif.CreateDate.replace(':', '-').replace(':', '-').replace(/ /, 'T');
					const newFile = `${patternDateReplace(pattern, new Date(dateString))}${path.extname(file).toLowerCase()}`;
					fs.copy(`${srcDir}/${file}`, `${destDir}/${newFile}`);
				});
			} catch (err) {
				console.error(`Error transferring file: '${file}'\n${err.message}`);
			}
		});

		alert("Complete!");
	} catch (err) {
		alert(err);
	}
};