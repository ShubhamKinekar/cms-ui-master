import { DisplayColumn } from '../decorators/property';
import { BaseModel } from './base.model';

export class BatchMasterPendingModel extends BaseModel {
 
  
  public cmsBatchDetailsId: number = 0;
  
  @DisplayColumn('Barcode', 'left',true, true, true, true, 'asc', 2, 12)
  public barcode?: number;
  
  @DisplayColumn('Checker Id', 'left',true, true, true, true, 'asc', 3, 13)
  public cmsCheckerId?: string;

  @DisplayColumn('Treading Account No', 'left',true, true, true, true, 'asc', 4, 14)
  public tradingAccountNo?:number;

  @DisplayColumn('Demat Account No', 'left',true, true, true, true, 'asc', 5, 15)
  public dematAccountNo?: number;
 
  @DisplayColumn('Pan No', 'left',true, true, true, true, 'asc', 6, 16)
  public panNo?: number;

  @DisplayColumn('Receipt Date', 'left',true, true, true, true, 'asc', 7, 17)
  public receiptDate?: string;
  
  public columnSort?: number;
  public length?: number;
  public start?: number;
  
  endDate: any;
  startDate: any;


}
