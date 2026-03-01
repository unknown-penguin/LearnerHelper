import { AutoMap } from '@automapper/classes';

export class RoleEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
