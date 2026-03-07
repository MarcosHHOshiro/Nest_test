import { SetMetadata } from '@nestjs/common';
import { VALIDATE_RESOURCES_IDS_KEY } from '../constants/validate-resources-ids.constant';

export const ValidateResourcesIds = (...args: string[]) =>
  SetMetadata(VALIDATE_RESOURCES_IDS_KEY, args);
