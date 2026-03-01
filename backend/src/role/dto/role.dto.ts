import { AutoMap } from '@automapper/classes';

export class RoleDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}