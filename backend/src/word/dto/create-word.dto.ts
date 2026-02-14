import { PartOfSpeech } from '@prisma/client';
import { IsString, IsNotEmpty, Length, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  word: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(5, 500)
  definition: string;

  @ApiProperty({ enum: PartOfSpeech })
  @IsEnum(PartOfSpeech)
  partOfSpeech: PartOfSpeech;

  @ApiProperty({ example: 'A1' })
  @IsString()
  @IsNotEmpty()
  languageLevel: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dictionaryId: string;
}
