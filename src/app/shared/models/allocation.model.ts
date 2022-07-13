import { Status } from '../enums';
import { BaseModel } from './base.model';

export class AllocationModel extends BaseModel {
  public allocatedUserId?: number;
  public status?: Status;
  [key: string]: any;
}
