import { DisplayColumn } from '../decorators/property';
import { EmitType, Status } from '../enums';
import { BaseModel } from './base.model';

export class FormValidityModel extends BaseModel {
  public emitType?: EmitType;
  public isValid:boolean = false;
  public isDestroyed:boolean = false;
  public status?: Status;
}
