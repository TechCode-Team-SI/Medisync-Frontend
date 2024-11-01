import { Suggestion, getLista } from '../interface';

export abstract class modelSuggestions {
  abstract getSugestion: () => Promise<getLista<Suggestion>>;
}
