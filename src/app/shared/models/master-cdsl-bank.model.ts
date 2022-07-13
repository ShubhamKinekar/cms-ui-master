import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class MasterCdslBankModel extends BaseModel {
 
  
  // public bankCode: number = 0;

  @DisplayColumn('Bank code', 'left',true, true, true, true, 'asc', 2, 12)
  public bankCode: string = '';
  
  
  @DisplayColumn('Bank AC Type', 'left',true, true, true, true, 'asc', 3, 13)
  public bankAcType: string = '';
 
  @DisplayColumn('Branch No', 'left',true, true, true, true, 'asc', 4, 14)
  public branchNo: string = '';

  @DisplayColumn('Address 1', 'left',true, true, true, true, 'asc', 5, 15)
  public address1: string = '';

  @DisplayColumn('City', 'left',true, true, true, true, 'asc', 6, 16)
  public city: string = '';
  public confirmPassword: string = '';

  public newPassword: string = '';


}
