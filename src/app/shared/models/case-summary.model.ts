import { DisplayColumn } from '../decorators/property';
import { BaseModel } from './base.model';

export class CaseSummaryModel extends BaseModel {
  public caseSummaryId?: number;
	public cmsCaseInitiationId?: number;
  @DisplayColumn('Barcode', 'left', true,true, true, true, 'asc', 2, 12,true)
	public barcode?:string;
  @DisplayColumn('Stage', 'left', true,true, true, true, 'asc', 8, 18)
	public caseStageStatus?:string;
  @DisplayColumn('Status', 'left', true,true, true, true, 'asc', 9, 19)
	public caseStatusDetails?:string;
	public cmsScrutinyId?: number;
	public cmsDataEntryId?: number;
	public cmsCheckerId?: number;
//   @DisplayColumn('Barcode', 'left', true,true, true, true, 'asc', 2, 12,true)
// 	public barcode?:string;
  @DisplayColumn('Trading Account No', 'left', true,true, true, true, 'asc', 3, 13)
	public tradingAccountNo?: number;
  @DisplayColumn('Demat Account No', 'left', true,true, true, true, 'asc', 4, 14)
	public dematAccountNo?: number;
  @DisplayColumn('Pan No', 'left', true,true, true, true, 'asc', 5, 15)
	public panNo?:string;
  @DisplayColumn('Receipt Date', 'left', true,true, true, true, 'asc', 7, 17)
	public receiptDate?:Date;
  @DisplayColumn('Awb No', 'left', true,true, true, true, 'asc', 7, 17)
	public awbNo?:string;
	public scrutinyDate?:Date;
	public dataEntryDate?:Date;
	public checkerDate?:Date;
	public physicalFormReceiptDate?:Date;
	public caseClosedDate?:Date;
	public startDate?:any;
	public endDate?:any;
  //@DisplayColumn('Case Initiation User', 'left', true,true, true, true, 'asc', 21, 31)
	public caseInitiationUserId?: number;
  //@DisplayColumn('Scrutiny User', 'left', true,true, true, true, 'asc', 22, 32)
	public scrutinyUserId?: number;
  //@DisplayColumn('Data Entry User', 'left', true,true, true, true, 'asc', 23, 33)
	public dataEntryUserId?: number;
  //@DisplayColumn('Check User', 'left', true,true, true, true, 'asc', 24, 34)
	public checkerUserId?: number;
	public physicalUserId?: number;
  @DisplayColumn('Request Type', 'left', true,true, true, true, 'asc', 6, 16)
	public requestTypeStr?: string;

	@DisplayColumn('Last Updated Date', 'left', true,true, true, true, 'asc', 6, 16)
	public lastUpdatedDate?: Date;

	@DisplayColumn('Rejection Reason', 'left', true,true, true, true, 'asc', 6, 16)
	public rejectionReason?: string;
}
