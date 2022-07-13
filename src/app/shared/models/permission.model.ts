import { Status } from '../enums';
import { BaseModel } from './base.model';

export class PermissionModel extends BaseModel {
  public code?: string;
  public status?: Status;
  public total?:number;
  public start?:string;
  public length?:number;
  public columnSort?:number;
  public pid?:number;
  public createdById?:number;
  public permissionTypeId?:number;
  public roleId?:number;
  public name?:string;
  
  
 
  
}
