import { BaseModel } from './base.model';

export class AccountClosureModel extends BaseModel {
  public cmsAccountCloserId: number = 0;
  public  cmsDataEntryId?: number;
  public  cmsCheckerId?: number;
  public dpId?:string;
  public dpHolding?:string;
  public targetDepository?:string;
  public targetDpId?: string;
  public targetClientId?:string; 
  public panNo?:string;
  public tcsCode?:string;
  public tradingClosureStatus?:string;
}
