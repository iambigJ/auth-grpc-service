import messages from '../../messages';
import * as bcrypt from 'bcrypt';

export class UtilsService {
  static generateSmsValidationCode(): { code: number; message: string } {
    const code = Math.floor(Math.random() * 89999 + 10000);
    const message = messages.AVANEGAR_CODE_SENDER + code;
    return { code, message };
  }
  static async hashPassword(textPassword: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(textPassword, salt);
  }
  static async validatePassword(textPassword: string, hash: string) {
    return await bcrypt.compare(textPassword, hash);
  }
}
