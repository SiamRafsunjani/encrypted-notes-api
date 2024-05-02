import * as crypto from 'crypto';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class EncryptionService {
  key: string;
  encryptionIV: string;
  encryptionMethod: string;

  constructor(
    private configService: ConfigService,
    private logger: PinoLogger,
  ) {
    const secretKey = this.configService.get<string>('AES_SECRET_KEY');
    this.encryptionMethod = this.configService.get<string>(
      'AES_ENCRYPTION_METHOD',
    );

    // Secret key must be 32 characters long
    this.key = crypto
      .createHash('sha512')
      .update(secretKey)
      .digest('hex')
      .substring(0, 32);
  }

  // Encrypts data and converts to base64
  encryptData(data: string): { encryptedData: string; encryptionIV: string } {
    const encryptionIV = crypto
      .createHash('sha512')
      .update('secret_iv')
      .digest('hex')
      .substring(0, 16);

    const cipher = crypto.createCipheriv(
      this.encryptionMethod,
      this.key,
      encryptionIV,
    );

    const encryptedData = Buffer.from(
      cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
    ).toString('base64');

    console.log('encryptedData', encryptedData);
    console.log('encryptedData', this.key);
    console.log('encryptedData', encryptionIV);

    return { encryptedData, encryptionIV: encryptionIV };
  }

  // Decrypts data and converts to utf8
  decryptData(encryptedData: string, encryptionIV: string) {
    try {
      console.log('encryptedData', encryptedData);
      console.log('encryptedData', this.key);
      console.log('encryptedData', encryptionIV);

      const buff = Buffer.from(encryptedData, 'base64');
      const decipher = crypto.createDecipheriv(
        this.encryptionMethod,
        this.key,
        encryptionIV,
      );

      return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
      );
    } catch (error) {
      console.log(error);

      this.logger.error({
        message:
          'Failed to decrypt data, please check the encryption key or IV',
        error,
      });

      throw new Error('Failed to decrypt data');
    }
  }
}
