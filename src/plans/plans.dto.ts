import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { PlanData } from './plans.entity';

export class CreatePlansDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  data: PlanData;
}
