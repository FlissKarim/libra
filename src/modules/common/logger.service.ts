
import { Logger } from 'tslog';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService<T> extends Logger<T> { }