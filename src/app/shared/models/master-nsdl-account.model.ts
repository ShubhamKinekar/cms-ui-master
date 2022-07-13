import { DisplayColumn } from '../decorators/property';
import { BaseModel } from './base.model';

export class MasterNsdlAccountModel extends BaseModel {
 
  
  public masternsdlaccountId: number = 0;

  @DisplayColumn('Parent_Code', 'left',true, true, true, true, 'asc', 2, 12)
  public parentCode: string = '';

  @DisplayColumn('Code', 'left',true, true, true, true, 'asc', 3, 13)
  public code: string = '';
 
  @DisplayColumn('Description', 'left',true, true, true, true, 'asc', 4, 14)
  public Discription: string = '';

  @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 5, 15)
  public status: string= '';


}
