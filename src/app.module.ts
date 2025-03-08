import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import {
  AppointmentsModule,
  AuthModule,
  ServicesModule,
  UsersModule,
} from 'src/modules';

import { ScheduleModule } from '@nestjs/schedule';

import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

import { validate } from 'src/@shared/environments';

import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    ScheduleModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: process.env.FALLBACK_LANGUAGE || 'pt-BR',
      loaderOptions: {
        path: path.join(__dirname, '/@shared/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    UsersModule,
    AuthModule,
    ServicesModule,
    AppointmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
