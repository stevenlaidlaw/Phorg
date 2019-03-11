# Phorg

![Phorg Image](https://github.com/stevenlaidlaw/Phorg/blob/master/screenshot.png)

Phorg is a cross platform app that organises JPEG photos based on the date they were taken. It is non-destructive and creates directories as they are needed.

## Usage

Use `/` to create subfolders. For example, given the datetime `1999-05-16 16:46:22`, the pattern `$Y/$M/$Y-$M-$D_$H$m$S` will create a subfolder and file named `1999/05/1999-05-16_164622.jpg`

#### Note

* The following characters are not allowed in file names and will be replaced with underscores &lt;, &gt;, :, ", \, |, ?, *

## Running

For dev purposes:

`npm run dev`

I've not set up the official packager yet, so the only way to use the app is to build it from
source.
