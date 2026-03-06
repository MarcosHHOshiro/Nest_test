import { SetMetadata } from '@nestjs/common';
import { VAlIDATE_RESOURCES_IDS_KEY } from 'src/consts';

export const ValidateResourcesIds = (...args: string[]) =>
  SetMetadata(VAlIDATE_RESOURCES_IDS_KEY, args);
