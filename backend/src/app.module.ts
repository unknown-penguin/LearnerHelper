import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DictionaryController } from './dictionary/dictionary.controller';
import { DictionaryService } from './dictionary/dictionary.service';
import { WordService } from './word/word.service';
import { WordController } from './word/word.controller';
import { LanguageController } from './language/language.controller';
import { LanguageService } from './language/language.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';


@Module({
  imports: [
  ],
  controllers: [AppController, DictionaryController, WordController, LanguageController, UserController, ProfileController],
  providers: [AppService, DictionaryService, WordService, LanguageService, UserService, ProfileService],
})
export class AppModule {}
