import { Status } from '../enums';
import { BaseModel } from './base.model';

export class DynamicRequestTypeModel extends BaseModel {
  public cmsDataEntryId?: number;
  public cmsCheckerId?:number;
  public dedynamicRTSubList?: DynamicRequestModel[];
  public checkerDynamicRTSubList?: DynamicRequestModel[];
  
  public status? : Status
}


export class DynamicRequestModel extends BaseModel {
  public cmsDEDynamicId?: number;
  public lovRequestId?: number;
  public field?: string;
  public value?: string;
  public status? : Status
}
