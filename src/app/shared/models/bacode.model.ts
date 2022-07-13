import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class BacodeModel extends BaseModel {
  
  public cmsMasterBacodeId?: number;
  @DisplayColumn('Bacode', 'left', true, true, true, true, 'asc', 3, 13)
  public bacode?: string;
  @DisplayColumn('Mail', 'left', true, true, true, true, 'asc', 4, 14)
  public mailId?: string;
  @DisplayColumn('Emp Code', 'left', true, true, true, true, 'asc', 5, 15)
  public empCode?: string;
  public status?: Status;
  
}
