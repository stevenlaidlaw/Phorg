# Phorg

Phorg is a cross platform app that organises JPEG photos based on the date they were taken. It is non-destructive and creates directories as they are needed.

**Notes:**

* Use / to create subfolders. For example, given the datetime '1999-05-16 16:46:22', the pattern '$Y/$M/' will create subfolders named '1999/05/'
* The following characters are not allowed in file names and will be replaced with underscores &lt;, &gt;, :, ", \, |, ?, *

## Distribution

```bash
./node_modules/.bin/electron-packager . Phorg --platform=darwin --arch=x64
```
