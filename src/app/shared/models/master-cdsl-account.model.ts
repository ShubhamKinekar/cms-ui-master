import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class MasterCdslAccountModel extends BaseModel {
 
  
  public mastercdslaccountId: number = 0;

  @DisplayColumn('Parent Code', 'left',true, true, true, true, 'asc', 2, 12)
  public parentCode: string = '';

  @DisplayColumn('Code', 'left',true, true, true, true, 'asc', 3, 12)
  public code: string = '';
 
  @DisplayColumn('Discription', 'left',true, true, true, true, 'asc', 4, 14)
  public discription: string = '';

  @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 5, 15)
  public status: Status = Status.None;
  public confirmPassword: string = '';

  public newPassword: string = '';


}
