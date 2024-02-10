import { registerEnumType } from '@nestjs/graphql';

export enum Region {
  LOCAL = 'local',
  FOREIGN = 'foreign'
}

registerEnumType(Region, {
  name: 'Region',
});
