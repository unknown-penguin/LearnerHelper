import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { prisma } from '../prisma';
import { SettingsDto } from './dto/settings.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsEntity } from './entities/settings.entity';

@Injectable()
export class SettingsService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async getByUserId(userId: string): Promise<SettingsDto> {
    const settings = await prisma.settings.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });
    return this.mapper.map(settings as SettingsEntity, SettingsEntity, SettingsDto);
  }

  async update(id: string, data: UpdateSettingsDto): Promise<SettingsDto> {
    try {
      const settings = await prisma.settings.update({ where: { id }, data });
      return this.mapper.map(settings as SettingsEntity, SettingsEntity, SettingsDto);
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Settings not found');
      }
      throw error;
    }
  }
}
