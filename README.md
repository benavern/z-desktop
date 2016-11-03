# z-desktop

_Create Desktop files in linux_

## What is this ?

This is a tool that allows you create desktop files useful for **linux**.

I needed it when using elementaryOs (gnome based desktop environment) when installing some electron based applications & others.

It will create files in `~/.local/share/applications` that will contain something like that : 

```
[Desktop Entry]
Type=Application
Encoding=UTF-8
Name=Sample Application Name
Comment=A sample application
Exec=application
Icon=application.png
Terminal=false
```
After that this link will be available in the finder/explorer and you'll be able to add it in the dock. 

## How To

* `npm i -g z-desktop` or `npm i -g https://github.com/benavern/z-desktop` to install it (better installed generaly)
* `zdkp` or `z-desktop` to start editing your desktop file

## [License MIT](http://blog.caradeuc.info/MIT/#name=Benjamin%20Caradeuc&link=http://caradeuc.info)