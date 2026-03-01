import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DictionaryController } from './dictionary/dictionary.controller';
import { DictionaryService } from './dictionary/dictionary.service';
import { DictionaryProfile } from './dictionary/dictionary.profile';
import { WordService } from './word/word.service';
import { WordController } from './word/word.controller';
import { WordProfile } from './word/word.profile';
import { LanguageController } from './language/language.controller';
import { LanguageService } from './language/language.service';
import { LanguageProfile } from './language/language.profile';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserProfile } from './user/user.profile';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ProfileProfile } from './profile/profile.profile';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { RoleProfile } from './role/role.profile';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';
import { PermissionProfile } from './permission/permission.profile';
import { jwtConfig } from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    JwtModule.register(jwtConfig)
  ],
  controllers: [
    AppController,
    DictionaryController,
    WordController,
    LanguageController,
    UserController,
    AuthController,
    ProfileController,
    RoleController,
    PermissionController,
  ],
  providers: [
    AppService,
    DictionaryService, DictionaryProfile,
    WordService, WordProfile,
    LanguageService, LanguageProfile,
    UserService, UserProfile,
    AuthService,
    ProfileService, ProfileProfile,
    RoleService, RoleProfile,
    PermissionService, PermissionProfile,
  ],
})
export class AppModule {}
