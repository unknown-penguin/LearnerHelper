import { IsString, IsNotEmpty, Length, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty({ example: 'English' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 5)
  @Matches(/^[a-z]{2}(-[A-Z]{2})?$/)
  code: string;
}

export class UpdateLanguageDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 5)
  @Matches(/^[a-z]{2}(-[A-Z]{2})?$/)
  code?: string;
}
