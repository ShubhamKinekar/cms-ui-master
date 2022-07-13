import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class MasterBranchModel extends BaseModel {
  masterbranchId(masterbranchId: any) {
    throw new Error('Method not implemented.');
  }
 
  
  public cmsMasterBranchId: number = 0;

  @DisplayColumn('Sol Id', 'left',true, true, true, true, 'asc', 2, 12)
  public solId?: number;

  @DisplayColumn('Branch Name', 'left',true, true, true, true, 'asc', 3, 13)
  public branchName: string = '';
 
  @DisplayColumn('City', 'left',true, true, true, true, 'asc', 9, 19)
  public city: string = '';

  @DisplayColumn('Pin', 'left', true, true, true, true, 'asc', 13, 23)
  public pin?: number;

  @DisplayColumn('Status', 'left',true, true, true, true, 'asc',55 , 65)
  public status: Status = Status.None;
  public branchZone: string = '';
  public address1: string = '';
  public address2: string = '';
  public address3: string = '';
  public addState: string = '';
  public country: string = '';
  public brhead: string = '';
  public brheadTel: string = '';
  public boardNo: string = '';
  public fax1: string = '';
  public ophead: string = '';
  public opheadTel: string = '';
  public branchCat: string = '';
  public headquaters: string = '';
  public circleHead: string = '';
  public branchType: string = '';
  public hubCode: string = '';
  public hubName: string = '';
  public circleId: string = '';
  public branchheadEmail: string = '';
  public operationalheadEmail: string = '';
  public circleName: string = '';
  public micr: string = '';
  public micrSortCode: string = '';
  public ifscCode: string = '';
  public dematBranch: string = '';


}
