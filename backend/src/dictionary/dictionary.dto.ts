import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDictionaryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  languageId: string;
}

export class UpdateDictionaryDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsString()
  languageId?: string;
}
