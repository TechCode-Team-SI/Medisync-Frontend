import { toast } from 'sonner';

import { Settings } from 'src/@types/types';
import { EventChannels } from 'src/channels/eventChannels';
import { Button } from 'src/components/ui/button';
import { useRendererListener } from 'src/hooks';
import { useCount } from 'src/hooks/useCountDemo';
import { SettingsHandler } from 'src/services/renderer/settingsHandler';
export function Home() {
  const { inc } = useCount();

  const save = async () => {
    const dummy: Settings = { BACK_API: 'BACKURL', SESSION: '123' };
    const isSaved = await SettingsHandler.saveSettings(dummy);
    if (!isSaved) {
      toast('Failed to save settings');
    } else {
      toast('Settings saved');
    }
  };

  const load = async () => {
    const settings = await SettingsHandler.loadSettings();
    if (settings) {
      toast(`Settings loaded ${settings.BACK_API} & ${settings.SESSION}`);
    } else {
      toast('Failed to load settings');
    }
  };

  useRendererListener(EventChannels.LOAD_SETTINGS, (_, data) => {
    console.log(data);
  });

  return (
    <div className='bg-gray-800 w-full h-full flex justify-center items-center flex-col gap-4 p-5'>
      <h1 className='text-white text-2xl font-bold uppercase'>Titulo</h1>
      <Button variant='secondary' onClick={inc}>
        Increase count{' '}
      </Button>
      <Button onClick={save} variant='outline'>
        Save
      </Button>
      <Button onClick={load} variant='outline'>
        Load
      </Button>
    </div>
  );
}
