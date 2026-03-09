import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsDto } from './dto/settings.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('user/:userId')
  getByUserId(@Param('userId') userId: string): Promise<SettingsDto> {
    return this.settingsService.getByUserId(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateSettingsDto): Promise<SettingsDto> {
    return this.settingsService.update(id, data);
  }
}
