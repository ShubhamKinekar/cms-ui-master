import { MatButton } from '@angular/material/button';
import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';
import { PermissionModel } from './permission.model';

export class BatchMasterModel extends BaseModel {
 
  
  public cmsBatchMastId: number = 0;
  
  @DisplayColumn('Batch Number', 'left',true, true, true, true, 'asc', 2, 12)
  public batchNumber: string= '';
  
  @DisplayColumn('Batch Date', 'left',true, true, true, true, 'asc', 3, 13)
  public creationDate: string= '';

  @DisplayColumn('Batch Type', 'left',true, true, true, true, 'asc', 4, 14)
  public batchType: string = '';

  @DisplayColumn('Count', 'left',true, true, true, true, 'asc', 5, 15)
  public count: string = '';
 
  @DisplayColumn('Operator Id', 'left',true, true, true, true, 'asc', 6, 16)
  public operatorId: string = '';
  public startDate?:any;
	public endDate?:any;
  public permissions?: string;
  public fileName?: string;
  public filePath?: string;
 
  
}
