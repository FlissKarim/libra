import { IsDefined, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninRequestDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  public readonly email: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  public readonly password: string;
}
