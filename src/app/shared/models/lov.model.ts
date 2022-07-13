import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class LovModel extends BaseModel {
  public cmsMasterLovId?: number;
  public lovName?: string;
  public value?: string;
  public isDynamic?: 'Y'|'N';
  public status?: Status;
}

export class SubLovModel extends BaseModel {
  public cmsMasterLovSub?: number;
  public cmsLovId?: number;
  public subLovName?: string;
  public value?: string;
  public status?: Status;
}
