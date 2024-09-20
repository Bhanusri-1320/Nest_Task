/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

/* eslint-disable prettier/prettier */
export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
    message:"password is too week"
  })
  password: string;
}
