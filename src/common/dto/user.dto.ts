import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Role } from '../enum/enum';
import { Transform } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^[6-9]{1}[0-9]{9}$')
  // @IsPhoneNumber('IN)
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(Role)
  roleId: number;

  @IsNotEmpty()
  @IsString()
  @Matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,16}$')
  password: string;
}

export class GetUsersDto {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  page: number;

  @IsOptional()
  @IsString()
  search: string;
}

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,16}$')
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,16}$')
  newPassword: string;
}
