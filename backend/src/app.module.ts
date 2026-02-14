import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DictionaryController } from './dictionary/dictionary.controller';
import { DictionaryService } from './dictionary/dictionary.service';
import { WordService } from './word/word.service';
import { WordController } from './word/word.controller';


@Module({
  imports: [
  ],
  controllers: [AppController, DictionaryController, WordController],
  providers: [AppService, DictionaryService, WordService],
})
export class AppModule {}
