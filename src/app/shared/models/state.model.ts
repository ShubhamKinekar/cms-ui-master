import { Status } from '../enums';
import { BaseModel } from './base.model';

export class StateModel extends BaseModel {

    public cmsStateId? : number;
    public cmsCountryId? : number;
    public cmsStateCode? : string;
    public cmsStateName? : string;
    public cmsTradingParentCode? : string;
    public cmsTradingChildCode? : string;
    public cmsTradingName? : string;
    public cmsCdslParentCode? : string;
    public cmsCdslChildCode? : string;
    public cmsCdslName? : string;
    public cmsNsdlParentCode? : string;
    public cmsNsdlChildCode? : string;
    public cmsNsdlName? : string;
    public status? : Status;

}
