import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class CheckerModel extends BaseModel {
  public cmsCheckerId: number = 0;
  public cmsCaseInitiationId: number = 0;
  public cmsDataEntryId: number = 0;
  public cmsScrutinyId: number = 0;
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
  public receiptDate?:Date; 
  public inwardMode?:string;
  public clientNameTrading?:string;
  public clientNameDemat?:string;
  public customerEmail?:string;
  public otherRejectionRemarks?:string;
  public customerMobile?:number;
  public awbNo?:number;
  public branchCode?:string;
  public branchCodeEmail?:string;
  public bacode?:string;
  public requesttypeOther?:string;
  public rmCodeEmail?:string;
  public checkerStatus?:string;
  public checkerRemark?: string;
  public rejectionRemarks?: string;
  public requestType?:string;
  public fileUpload1?:string;
  public fileUpload2?:string;
  public fileUpload3?:string;
  public selectAccount?: string;
  public isUserExist?: string;
  public docReceived?: string;
  public selectAccountFiled?: string;
  public changesApplicableTo?:string;
  public allocatedTo?:number;
  @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 8, 18)
  public status: Status = Status.None;
}
