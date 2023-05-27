import { ApiProperty } from '@nestjs/swagger';
import { Resource } from 'src/entity/resource';

export class UpdateUserRequestDto {
  @ApiProperty({ required: false })
  public resource?: Resource;
}
