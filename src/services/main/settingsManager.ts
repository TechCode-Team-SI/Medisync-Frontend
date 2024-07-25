import { app } from 'electron';
import fs from 'fs/promises';

import z from 'zod';

import { Settings } from 'src/@types/types';

const FILE_NAMES = {
  SETTINGS: 'settings.json',
};

const settingsSchema = z.object({
  BACK_API: z.string().min(1),
  SESSION: z.string().min(1),
});

export class SettingsManager {
  constructor() {}

  public async saveSettings(settings: Settings) {
    const path = app.getPath('userData');
    try {
      const data = JSON.stringify(settings);
      await fs.writeFile(`${path}/${FILE_NAMES.SETTINGS}`, data);
      return true;
    } catch (err) {
      return false;
    }
  }

  public async loadSettings(): Promise<Settings | null> {
    const path = app.getPath('userData');
    try {
      const data = await fs.readFile(`${path}/${FILE_NAMES.SETTINGS}`, 'utf8');
      const parsedSettings = JSON.parse(data);
      const settings = settingsSchema.safeParse(parsedSettings);
      if (!settings.success) {
        throw new Error('Settings retrieval failed');
      }
      return settings.data;
    } catch (err) {
      return null;
    }
  }
}
