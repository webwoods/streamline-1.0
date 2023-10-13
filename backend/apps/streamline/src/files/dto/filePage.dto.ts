import { PaginateResult } from '@libs/core/entities/dto/paginateResult.dto';
import { ObjectType } from '@nestjs/graphql';
import { File } from '../file.entity';

@ObjectType()
export class FilePage extends PaginateResult(File) {}
