import { BrowserWindow, ipcMain } from 'electron';

import { Settings, SystemMetadata } from 'src/@types/types';
import { EventChannels } from 'src/channels/eventChannels';
import { SettingsManager } from 'src/services/main/settingsManager';
import { SystemMetadataManager } from 'src/services/main/systemMetadataManager';

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

  ipcMain.handle(EventChannels.SAVE_SYSTEM_METADATA, async (_, metadata: SystemMetadata) => {
    const systemMetadataManager = new SystemMetadataManager();
    try {
      await systemMetadataManager.saveSystemMetadata(metadata);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });

  ipcMain.handle(EventChannels.LOAD_SYSTEM_METADATA, (_) => {
    const systemMetadataManager = new SystemMetadataManager();
    const systemMetadata = systemMetadataManager.loadSystemMetadata();
    return systemMetadata;
  });
};
