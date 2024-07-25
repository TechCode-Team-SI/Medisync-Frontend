import { Settings } from 'src/@types/types';
import { EventChannels } from 'src/channels/eventChannels';

export class SettingsHandler {
  constructor() {}

  public static async saveSettings(settings: Settings): Promise<boolean> {
    return await electron.ipcRenderer.invoke(EventChannels.SAVE_SETTINGS, settings);
  }

  public static async loadSettings(): Promise<Settings | null> {
    return await electron.ipcRenderer.invoke(EventChannels.LOAD_SETTINGS);
  }
}
