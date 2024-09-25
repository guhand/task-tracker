import { OmitType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @Transform(({ value }) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  })
  @IsNumberString({}, { each: true })
  taskAssigneeIds: number[];
}

export class GetTaskDto {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  page: number;

  @IsOptional()
  @IsString()
  search: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  type: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  status: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  user: number;
}

export class UpdateTaskDto extends OmitType(CreateTaskDto, [
  'projectId',
] as const) {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsPositive()
  status: number;
}
