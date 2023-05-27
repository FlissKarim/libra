import { IsDefined, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly password: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  public readonly passwordConfirmation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly firstName: string;

  @ApiProperty()
  public readonly birthday: Date;

  @ApiProperty()
  public readonly biography: string;
}
