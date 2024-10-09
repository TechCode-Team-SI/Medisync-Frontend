import { app } from 'electron';
import fs from 'fs/promises';

import z from 'zod';

import { SystemMetadata } from 'src/@types/types';
import { FILE_NAMES } from 'src/utils/constants';

const systemSchema = z.object({
  IS_INSTALLED: z.boolean(),
});

export class SystemMetadataManager {
  constructor() {}

  public async saveSystemMetadata(systemMetadata: SystemMetadata) {
    const path = app.getPath('userData');
    try {
      const data = JSON.stringify(systemMetadata);
      await fs.writeFile(`${path}/${FILE_NAMES.SYSTEM}`, data);
      return true;
    } catch (err) {
      return false;
    }
  }

  public async loadSystemMetadata(): Promise<SystemMetadata | null> {
    const path = app.getPath('userData');
    try {
      const data = await fs.readFile(`${path}/${FILE_NAMES.SYSTEM}`, 'utf8');
      const parsedMetadata = JSON.parse(data);
      const systemMetadata = systemSchema.safeParse(parsedMetadata);
      if (!systemMetadata.success) {
        throw new Error('SystemMetadata data retrieval failed');
      }
      return systemMetadata.data;
    } catch (err) {
      return null;
    }
  }
}
