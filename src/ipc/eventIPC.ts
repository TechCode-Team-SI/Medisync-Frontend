import { BrowserWindow, ipcMain } from 'electron';

import { Settings } from 'src/@types/types';
import { EventChannels } from 'src/channels/eventChannels';
import { SettingsManager } from 'src/services/main/settingsManager';

export const registerEventIPC = (_mainWindow: BrowserWindow) => {
  ipcMain.handle(EventChannels.SAVE_SETTINGS, async (_, settings: Settings) => {
    const settingsManager = new SettingsManager();
    try {
      await settingsManager.saveSettings(settings);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });

  ipcMain.handle(EventChannels.LOAD_SETTINGS, (_) => {
    const settingsManager = new SettingsManager();
    const settings = settingsManager.loadSettings();
    return settings;
  });
};
