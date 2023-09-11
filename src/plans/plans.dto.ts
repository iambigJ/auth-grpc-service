import { IsNotEmpty, IsString, ValidateNested, IsNumber, IsArray, IsOptional } from 'class-validator';
import { PlanData } from './plans.entity';

export class CreatePlansDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  data: PlanData;
}

export class PlanDataDto {
  @IsOptional()
  @IsNumber()
  unitCost?: number;

  @IsOptional()
  @IsArray()
  extension?: string[];

  @IsOptional()
  @IsNumber()
  unitDivision?: number;

  @IsOptional()
  @IsNumber()
  audioSizeLimit?: number;

  @IsOptional()
  @IsNumber()
  balanceWarning?: number;

  @IsOptional()
  @IsString()
  apiKeyExpireTime?: string;

  @IsOptional()
  @IsNumber()
  audioDurationLimit?: number;

  @IsOptional()
  @IsNumber()
  defaultWalletBalance?: number;
}
export class CreatePlanRequestDto {
  @IsString()
  name: string;

  @IsOptional()
  data: PlanDataDto;
}

export class ReadPlanRequestDto {
  @IsString()
  planId: string;
}

export class UpdatePlanRequestDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  data?: PlanDataDto;
}