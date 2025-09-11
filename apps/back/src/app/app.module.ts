import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from '../contact/contact.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [ContactModule,
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  MailerModule.forRoot({
    transport: {
      host: process.env.EMAIL_HOST as string ,
      port: parseInt(process.env.EMAIL_PORT as string),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    },
    template: {
      dir: process.env.NODE_ENV === 'production'
        ? join(__dirname, '..', 'common', 'templates')
        : join(process.cwd(), 'src', 'common', 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
