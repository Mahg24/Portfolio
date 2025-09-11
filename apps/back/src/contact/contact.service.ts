import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { createBaseContext, validateTemplateContext } from '../common/templates/template-config';

@Injectable()
export class ContactService {
  constructor(private readonly mailerService: MailerService) {}
  
  async create(createContactDto: CreateContactDto) {
    const baseContext = createBaseContext();
    const context = {
      ...baseContext,
      name: createContactDto.name,
      email: createContactDto.email,
      message: createContactDto.message,
    };
    
    try {

      validateTemplateContext('contact-email', context);


      const ownerEmail = await this.mailerService.sendMail({
        to: 'work@mahg.dev',
        from: 'work@mahg.dev',
        subject: `Nuevo mensaje de contacto de ${createContactDto.name}`,
        template: 'contact/contact-email',
        context
      });


    
      return {
        success: true,
        messageId: ownerEmail.messageId,
        message: 'Email enviado exitosamente'
      };
    } catch (error) {
      throw new Error(`Error al enviar el email: ${error.message}`);
    }
  }
}
