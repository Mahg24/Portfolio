import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from '../contact/contact.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule } from '@nestjs/config';

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
      dir: 'src/common/templates',
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
