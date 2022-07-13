import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class ScrutinyModel extends BaseModel {
  public cmsScrutinyId: number = 0;
  public cmsCaseInitiationId: number = 0;
  @DisplayColumn('Barcode No', 'left',true, true, true, true, 'asc', 2, 12,true)
  public barcode: string = '';
  @DisplayColumn('Trading Account No', 'left',true, true, true, true, 'asc', 3, 13)
  public tradingAccountNo: string = '';
  @DisplayColumn('Demat Account No', 'left', true,true, true, true, 'asc', 4, 14)
  public dematAccountNo: number = 0;
  @DisplayColumn('PAN No', 'left',true, true, true, true, 'asc', 5, 15)
  public panNo: string = '';
  @DisplayColumn('Request Type', 'left', true,true, true, true, 'asc', 6, 16)
  public requestTypeStr: string = '';
  @DisplayColumn('Receipt Date', 'left',true, true, true, true, 'asc', 7, 17)
  //public panNo: string = '';
  //public receiptDate?:Date; 
 // public receiptDate?:Date;
  public inwardMode?:string;
  public clientNameTrading?:string;
  public clientNameDemat?:string;
  public customerEmail?:string;
  public customerMobile?:number;
  public branchCode?:string;
  public branchCodeEmail?:string;
  public employeeCodeRm?:string;
  public requestType?:string;
  public bacode?:string;
  public scrutinyStatus?:string;
  public scrutinyRemark?:string;
  public rejectionRemarkInput?:string;
  public otherRejectionRemarks?:string;
  public rejectionRemarks?:string;
  public fileUpload1?:string;
  public fileUpload2?:string;
  public fileUpload3?:string;
  public changesApplicableTo?:string;
  public requesttypeOther?:string;
  public isUserExist?: string;
  public docReceived?: string;
  public allocatedTo?:number;
  @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 8, 18)
  public status: Status = Status.None;
}
