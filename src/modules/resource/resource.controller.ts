import { Controller } from '@nestjs/common';
import { AbstractController } from '../common/abstract.controller';
import { Resource } from 'src/entity/resource';

@Controller('resource')
export class ResourceController extends AbstractController<Resource> { }
