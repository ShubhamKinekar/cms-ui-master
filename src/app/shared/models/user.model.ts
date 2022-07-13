import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';
import { PermissionModel } from './permission.model';

export class UserModel extends BaseModel {
 
  public userId: number = 0;
  // @DisplayColumn('Employee  Code', 'left',true, true, true, true, 'asc', 2, 12)
  public employeeId: number = 0;
  @DisplayColumn('Username', 'left',true, true, true, true, 'asc', 2, 12)
  public userName: string = '';
  @DisplayColumn('Name', 'left',true, true, true, true, 'asc', 3, 13)
  public name: string = '';
  public userType: string = '';
  @DisplayColumn('Email', 'left',true, true, true, true, 'asc', 4, 14)
  public email: string = '';
  public password: string = '';
  @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 5, 15)
  public status: Status = Status.None;
  public confirmPassword: string = '';
  public newPassword: string = '';
  userRoleDTOList?: PermissionModel[] = [];
  public roleId?: number;
}
