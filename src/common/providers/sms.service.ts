import * as kavenegar from 'kavenegar';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
interface ISmsService {
  send(mobile: string, message: string): Promise<any>;
}

@Injectable()
export class SmsService implements ISmsService {
  private readonly apiKey: string;
  private readonly api: any;
  private readonly senderNumber: string;
  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('SMS_API_KEY');
    this.api = kavenegar.KavenegarApi({ apikey: this.apiKey });
    this.senderNumber = this.configService.get<string>('SMS_SENDER_NUMBER');
  }

  async send(mobile: string, message: string): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve({ mobile, message });
      this.api.Send(
        {
          message,
          sender: this.senderNumber,
          receptor: mobile,
        },
        (response, status) => {
          if (status === 200) {
            //TODO: add logger
            resolve(true);
          } else {
            reject();
          }
        },
      );
    });
  }
}
