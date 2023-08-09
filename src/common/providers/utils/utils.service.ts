import messages from '../../messages';

export class UtilsService {
  /**
   * Generates a validation code and message for SMS.
   * @returns {object} The validation code and message.
   */
  static generateSmsValidationCode(): { code: number; message: string } {
    const code = Math.floor(Math.random() * 89999 + 10000);
    const message = messages.AVANEGAR_CODE_SENDER + code;
    return { code, message };
  }
}
