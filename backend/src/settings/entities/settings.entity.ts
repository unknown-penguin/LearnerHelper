import { AutoMap } from '@automapper/classes';

export class SettingsEntity {
  @AutoMap()
  id: string;

  @AutoMap()
  emailNotifications: boolean;

  @AutoMap()
  pushNotifications: boolean;

  @AutoMap()
  smsNotifications: boolean;

  @AutoMap()
  profileVisibility: string;

  @AutoMap()
  searchEngineIndexing: boolean;

  @AutoMap()
  theme: string;

  @AutoMap()
  density: string;

  @AutoMap()
  language: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
