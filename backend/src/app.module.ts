import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DictionaryController } from './dictionary/dictionary.controller';
import { DictionaryService } from './dictionary/dictionary.service';
import { WordService } from './word/word.service';
import { WordController } from './word/word.controller';
import { LanguageController } from './language/language.controller';
import { LanguageService } from './language/language.service';


@Module({
  imports: [
  ],
  controllers: [AppController, DictionaryController, WordController, LanguageController],
  providers: [AppService, DictionaryService, WordService, LanguageService],
})
export class AppModule {}
