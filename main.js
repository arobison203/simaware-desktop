const { app, BrowserWindow } = require('electron');
const Config = require('electron-config');
const config = new Config();

let win;

const createWindow = () => {
	const options = {
		show: false,
		...config.get('winBounds')
	};
	win = new BrowserWindow(options);

	win.loadURL('https://simaware.ca');
	win.once('ready-to-show', win.show);
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
	
	win.on('close', () => {
		config.set('winBounds', win.getBounds());
	})
})


app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	} 
})