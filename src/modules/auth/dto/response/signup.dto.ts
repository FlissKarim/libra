import { IsDefined } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDto {
  @ApiProperty()
  @IsDefined()
  public readonly userId: number;
}
