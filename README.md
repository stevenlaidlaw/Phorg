# Phorg

Phorg is a cross platform app that organises JPEG photos based on the date they were taken. It is non-destructive and creates directories as they are needed.

## Instructions

1. Select a source directory.
2. Select a destination directory. To prevent any errors it's best to have this as different than the source.
3. Set the folder/file pattern you'd like the program to copy the files to.
4. Click 'Go!'

**Notes:**
* Use / to create subfolders. For example, given the datetime '2015-05-16 16:46:22', the pattern '$Y/$M/' will create subfolders named '2015/05/'
* The following characters are not allowed in file names and will be replaced with underscores &lt;, &gt;, :, ", \, |, ?, *

## Distribution

```
./node_modules/.bin/electron-packager . Phorg --platform=darwin --arch=x64
```

---

## Binaries

OSX binaries available in `Phorg-darwin-x64/` directory
