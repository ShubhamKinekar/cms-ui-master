import { Status } from '../enums' ;
import { BaseModel } from './base.model' ;

export class ContactModel extends BaseModel {

    public cmsContactDetailsId: number = 0;
	public cmsDataEntryId? : number;
	public cmsCheckerId? : number;
	public accountType? : number;
	public fhEmailId? : string;
	public ffFhForEmailId? :  string;
	public fhIsdCodeForMobileNo? :  string;
	public fhOfMobileNo? :  string;
	public fhFfForMobileNo? :  string;
	public shEmailId? :  string;
	public shFfForEmailId? :  string;
	public shIsdCodeForMobileNo? :  string;
	public shOfMobileNo? :  string;
	public shFfForMobileNo? :  string;
	public thEmailId? :  string;
	public thFfForEmailId? :  string;
	public thIsdCodeForMobileNo? :  string;
	public thOfMobileNo? :  string;
	public thFfForMobileNo? :  string;
    public status? : Status;

}
