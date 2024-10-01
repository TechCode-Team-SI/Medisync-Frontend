import { SystemMetadata } from 'src/@types/types';
import { EventChannels } from 'src/channels/eventChannels';

export class SystemMetadataHandler {
  constructor() {}

  public static async saveSystemMetadata(systemMetadata: SystemMetadata): Promise<boolean> {
    return electron.ipcRenderer.invoke(EventChannels.SAVE_SYSTEM_METADATA, systemMetadata);
  }

  public static async loadSystemMetadata(): Promise<SystemMetadata | null> {
    return electron.ipcRenderer.invoke(EventChannels.LOAD_SYSTEM_METADATA);
  }
}
