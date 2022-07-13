import { Status } from '../enums';
import { BaseModel } from './base.model';

export class AddressModificationModel extends BaseModel {
  public cmsAddressCorresId: number = 0;
  public cmsAddressPermId: number = 0;
  public cmsDataEntryId: number = 0;
  public cmsCheckerId: number = 0;
  public accountType: number = 0;
  public add1?: string;
  public add2?: string;
  public add3?: string;
  public countryId?: number;
  public stateId?: number;
  public cityId?: number;
  public zipId?: number;
  public userRemarks?: string;
  public fileName?: string;
  public boStatus?: string;
  public status?: Status;
}
