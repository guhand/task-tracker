import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class GetProjectDto {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsPositive()
  page: number;

  @IsOptional()
  @IsString()
  search: string;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}
