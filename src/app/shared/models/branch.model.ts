import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class BranchModel extends BaseModel {
  public solIdPk?: number;
  @DisplayColumn('Sole Id', 'left', true, true, true, true, 'asc', 2, 12)
  public solId?: number;
  @DisplayColumn('Pincode', 'left', true, true, true, true, 'asc', 6, 17)
  public pin?: string;
  @DisplayColumn('Branch Name', 'left', true, true, true, true, 'asc', 7, 17)
  public branchName?: string;
  @DisplayColumn('Address 1', 'left', true, true, true, true, 'asc', 3, 13)
  public add1?: string;
  @DisplayColumn('Address 2', 'left', true, true, true, true, 'asc', 4, 14)
  public add2?: string;
  @DisplayColumn('Address 3', 'left', true, true, true, true, 'asc', 5, 15)
  public add3?: string;
  // @DisplayColumn('Pincode', 'left', true, true, true, true, 'asc', 6, 17)
  // public pin?: string;
  public rmCodeIds?:string;
  public status?: Status;
}
