
module.exports = ({ win, globalShortcut }, next) => {
    const commands = [
        {
            command: 'Alt+CommandOrControl+I',
            task: win => {
                if (win.webContents.isDevToolsOpened()) {
                    win.webContents.closeDevTools();
                }
                else {
                    win.webContents.openDevTools();
                }
            }
        },
        {
            command: 'CommandOrControl+R',
            task: win => {
                win.webContents.reload();
            }
        }
    ];
    commands.forEach(e => {
        globalShortcut.register(e.command, () => e.task(win));
    });
    next();
};