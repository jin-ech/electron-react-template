const { globalShortcut } = require('electron')

const commands = [
    {
        command: 'Alt+CommandOrControl+I',
        task: win => {
            win.webContents.openDevTools();
        }
    },
    {
        command: 'CommandOrControl+R',
        task: win => {
            win.webContents.reload();
        }
    }
];

module.exports = win => {
    commands.forEach(e => {
        globalShortcut.register(e.command, () => e.task(win));
    });
};