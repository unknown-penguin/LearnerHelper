import { AutoMap } from '@automapper/classes';
import { UserDto } from '../../user/dto/user.dto';

export class AuthResponseDto {
  accessToken: string;
  user: UserDto;
}
