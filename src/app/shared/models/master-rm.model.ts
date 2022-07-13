import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class MasterRmModel extends BaseModel {
 
  
    public cmsMasterRmId: number = 0;

  @DisplayColumn('Employee Id', 'left',true, true, true, true, 'asc', 2, 12)
  public employeeId?: number;
  
  
  @DisplayColumn('Employee Name', 'left',true, true, true, true, 'asc', 3, 13)
  public employeeName: string = '';
 
  @DisplayColumn('Role', 'left',true, true, true, true, 'asc', 4, 14)
  public role: string = '';

  @DisplayColumn('Branch Name', 'left',true, true, true, true, 'asc', 6, 16)
  public branchName: string = '';

  @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 14, 24)
  public status: string = '';


  public solId?: number;
  public clusterHead: string = '';
  public circle: string = '';
  public rmStatus: string = '';
  public branchCategory: string = '';
  public region: string = '';
  public type: string = '';
  public confirmPassword: string = '';

  public newPassword: string = '';


}
