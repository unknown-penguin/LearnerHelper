import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DictionaryController } from './dictionary/dictionary.controller';
import { DictionaryService } from './dictionary/dictionary.service';


@Module({
  imports: [
  ],
  controllers: [AppController, DictionaryController],
  providers: [AppService, DictionaryService],
})
export class AppModule {}
