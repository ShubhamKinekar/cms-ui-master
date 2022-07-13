import { Status } from '../enums';
import { BaseModel } from './base.model';

export class CityModel extends BaseModel {

    public cmsCityId? : number;
    public cmsCountryId? : number;
    public cmsStateId? : number;
    public cmsCityCode? : string;
    public cmsCityName? : string;
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
