import { IsNotEmpty, IsString } from 'class-validator';

export class SendVerificationDto {
  @IsNotEmpty()
  @IsString()
  strategy: string;

  @IsNotEmpty()
  @IsString()
  verifier: string;
}

export class VerifyValidationCodeDto {
  @IsNotEmpty()
  @IsString()
  strategy: string;

  @IsNotEmpty()
  @IsString()
  verifier: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
