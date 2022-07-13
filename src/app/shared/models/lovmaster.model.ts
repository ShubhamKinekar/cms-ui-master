import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';
import { PermissionModel } from './permission.model';

export class LovmasterModel extends BaseModel {
 
  public cmsMasterLovId: number = 0;
 
  @DisplayColumn('LovName', 'left',true, true, true, true, 'asc', 2, 12)
  public lovName: string = '';
 
  @DisplayColumn('Value', 'left',true, true, true, true, 'asc', 3, 13)
  public value: string = '';
 
  @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 4, 14)
  public status: Status = Status.None;
  public confirmPassword: string = '';

  public newPassword: string = '';

  @DisplayColumn('IsDynamic', 'left',true, true, true, true, 'asc', 5, 15)
  public isDynamic: string = '';

  @DisplayColumn('DaysRequired', 'left',true, true, true, true, 'asc', 6, 16)
  public daysRequired: string = '';
  
  @DisplayColumn('Skip Data Entry', 'left',true, true, true, true, 'asc', 7, 17)
  public skipDataEntry: string = '';

}