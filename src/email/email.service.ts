import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(email, message) {
    console.log(email, message);
    //TODO: check when get email from part best engineers
    await this.mailerService.sendMail({
      to: email,
      subject: 'Greeting from NestJS NodeMailer',
      template: './welcome',
      context: {
        message,
      },
    });
  }
}
