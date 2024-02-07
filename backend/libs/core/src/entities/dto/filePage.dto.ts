import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { File } from '../file.entity';

@ObjectType()
export class FilePage extends PaginateResult(File) {}
