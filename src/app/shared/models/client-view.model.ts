import { BaseModel } from '.';
import { DisplayColumn } from '../decorators/property';

export class ClientViewModel extends BaseModel {
  public cmsClientViewId?: number;
  @DisplayColumn('Pan No', 'left', true, true, true, true, 'asc', 2, 12, false, 8)
  public panNo?: string;
  @DisplayColumn('Trading Account No', 'left', true, true, true, true, 'asc', 2, 12, false, 5)
  public clientId?: number;
  @DisplayColumn('Demat Id', 'left', true, true, true, true, 'asc', 2, 12, false)
  public dpId?: string;
  @DisplayColumn('Demat Account No', 'left', true, true, true, true, 'asc', 2, 12, false, 8)
  public dpAccNo?: number;
  public dpType?: string;
  public entStatus?: string;
  // @DisplayColumn('Mobile No', 'left', true, true, true, true, 'asc', 2, 12, false)
  public mobile?: string;
  // @DisplayColumn('Email No', 'left', true, true, true, true, 'asc', 2, 12, false)
   public email?: string;
  // @DisplayColumn('Client', 'left', true, true, true, true, 'asc', 2, 12, false)
  public clientName?: string;
  [key: string]: any;
}
