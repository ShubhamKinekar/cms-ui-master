import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class MasterNsdlBankModel extends BaseModel {
 
  
    public masternsdlbankId: number= 0;

  @DisplayColumn('Branch Name', 'left',true, true, true, true, 'asc', 2, 12)
  public branchName: string = '';
  
  
  @DisplayColumn('MICR Code', 'left',true, true, true, true, 'asc', 3, 13)
  public micrCode: string = '';
 
  @DisplayColumn('Address 1', 'left',true, true, true, true, 'asc', 4, 14)
  public address1: string = '';

  @DisplayColumn('City', 'left',true, true, true, true, 'asc', 5, 15)
  public city: string = '';

  public bankName: string= '';
  public ifscCode: string= '';
  public address2: string= '';
  public state: string= '';
  public zip: string= '';
  public country: string= '';

}
