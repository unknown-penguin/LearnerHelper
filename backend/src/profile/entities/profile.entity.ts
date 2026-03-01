import { AutoMap } from '@automapper/classes';

export class ProfileEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
