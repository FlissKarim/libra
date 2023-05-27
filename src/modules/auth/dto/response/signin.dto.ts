import { IsDefined, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninResponseDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  public readonly id: number;

  @ApiProperty()
  @IsString()
  @IsDefined()
  public readonly token: string;
}
