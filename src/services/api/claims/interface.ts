import { Claim, getLista } from '../interface';

export abstract class modelClaims {
  abstract getClaim: () => Promise<getLista<Claim>>;
}
