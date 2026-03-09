export interface UserSettings {
  id: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  profileVisibility: 'public' | 'team' | 'private';
  searchEngineIndexing: boolean;
  theme: string;
  density: 'comfortable' | 'compact' | 'cozy';
  language: 'en' | 'es' | 'bg';
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserSettings {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  smsNotifications?: boolean;
  profileVisibility?: 'public' | 'team' | 'private';
  searchEngineIndexing?: boolean;
  theme?: string;
  density?: 'comfortable' | 'compact' | 'cozy';
  language?: 'en' | 'es' | 'bg';
}
