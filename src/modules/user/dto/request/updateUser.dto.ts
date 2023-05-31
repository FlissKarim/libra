import { ApiProperty } from '@nestjs/swagger';
import { Resource } from 'src/modules/resource/entity/resource';

export class UpdateUserRequestDto {
  @ApiProperty({ required: false })
  public resource?: Resource;
}
