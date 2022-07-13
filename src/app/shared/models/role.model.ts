import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';
import { PermissionModel } from './permission.model';

export class RoleModel extends BaseModel {
  public roleId?: number | null = null;
  //public roleId?: number;
  @DisplayColumn('Name', 'left', true, true, true, true, 'asc', 2, 12)
  public name: string = '';
  public isDefault: string = '';
  permissionDTOList?: PermissionModel[] = [];
  @DisplayColumn('Status', 'left', true, true, true, true, 'asc', 4, 14)
  public status: Status = Status.None;
  public permissionTypeId?: number;
  public permissions?: string;
}
