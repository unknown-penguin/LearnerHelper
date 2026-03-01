import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ example: 'read:dictionaries' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;
}
