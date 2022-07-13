import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';
import { PermissionModel } from './permission.model';

export class LovsubModel extends BaseModel {
 
  public cmsMasterLovSub: number = 0;

  // @DisplayColumn('cmsMasterLovSub', 'left',true, true, true, true, 'asc', 2, 12)
  // public cmsMasterLovSub: string = '';

  @DisplayColumn('subLovName', 'left',true, true, true, true, 'asc', 3, 13)
  public subLovName: string = '';
 
  @DisplayColumn('Value', 'left',true, true, true, true, 'asc', 4, 14)
  public value: string = '';
 
  @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 5, 15)
  public status: Status = Status.None;
  public confirmPassword: string = '';
  public cmsLovId: string = '';

  public newPassword: string = '';

  userRoleDTOList?: PermissionModel[] = [];

  public roleId?: string;
}