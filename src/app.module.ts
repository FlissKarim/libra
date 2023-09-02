import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserAccessGuard } from './modules/auth/user-auth-guard';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ResourceModule } from './modules/resource/resource.module';
import { CommonModule } from './modules/common/common.module';
import { CommandModule } from 'command/command.module';
import { BrockerModule } from './modules/broker/broker.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
export const DEFAULT_TYPEORM_CONFIG: object = config.get('typeorm');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DEFAULT_TYPEORM_CONFIG,
      entities: [
        __dirname + '/src/**/entity/*{.js,.ts}',
        __dirname + '/src/entity/*{.js,.ts}',
      ],
      migrations: [__dirname + '/migration/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: 'src/i18n/',
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    AuthModule,
    UserModule,
    ResourceModule,
    CommonModule,
    CommandModule,
    BrockerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserAccessGuard,
    },
  ],
})
export class AppModule {}
