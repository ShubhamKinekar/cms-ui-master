import { Status } from '../enums';
import { BaseModel } from './base.model';

export class BankModel extends BaseModel {

    public cmsBankDetailsId?: number;
    public cmsDataEntryId?: number;
    public cmsCheckerId?: number;
    public accountType?: number;
    public bankName?: string;
    public bankIfscCode?: string;
    public bankCode?: string;
    public bankAccountType?: string;
    public bankAccountNo?: string;
    public bankAddress1?: string;
    public bankAddress2?: string;
    public bankCity?: string;
    public bankPincode?: string;
    public bankMicrCode?: string;
    public accountCurrency?: string;
    public status?: Status;

}
