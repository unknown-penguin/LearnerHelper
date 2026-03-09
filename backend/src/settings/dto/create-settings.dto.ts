import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateSettingsDto {
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  pushNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  smsNotifications?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(['public', 'team', 'private'])
  profileVisibility?: string;

  @IsOptional()
  @IsBoolean()
  searchEngineIndexing?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(['cyan', 'green', 'medium-gray'])
  theme?: string;

  @IsOptional()
  @IsString()
  @IsIn(['comfortable', 'compact', 'cozy'])
  density?: string;

  @IsOptional()
  @IsString()
  @IsIn(['en', 'es', 'bg'])
  language?: string;
}
