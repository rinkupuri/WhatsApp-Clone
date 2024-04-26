import { User } from '../entities/user.entity';

export interface RegisterRespopnce {
  user: User;
  token: string;
}
