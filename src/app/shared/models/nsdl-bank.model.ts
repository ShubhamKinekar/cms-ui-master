import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class NSDLBankModel extends BaseModel {
    public cmsMasterNSDLBankId?: number;
    @DisplayColumn('Bank Name', 'left', true, true, true, true, 'asc', 2, 12)
    public bankName?: string;
    @DisplayColumn('Branch Name', 'left', true, true, true, true, 'asc', 2, 12)
    public branchName?: string;
    @DisplayColumn('IFSC Code', 'left', true, true, true, true, 'asc', 2, 12)
    public ifscCode?: string;
    @DisplayColumn('MICR Code', 'left', true, true, true, true, 'asc', 2, 12)
    public micrCode?: string;
    @DisplayColumn('Address 1', 'left', true, true, true, true, 'asc', 2, 12)
    public address1?: string;
    @DisplayColumn('Address 2', 'left', true, true, true, true, 'asc', 2, 12)
    public address2?: string;
    @DisplayColumn('City', 'left', true, true, true, true, 'asc', 2, 12)
    public city?: string;
    @DisplayColumn('State', 'left', true, true, true, true, 'asc', 2, 12)
    public state?: string;
    @DisplayColumn('Zip', 'left', true, true, true, true, 'asc', 2, 12)
    public zip?: string;
    @DisplayColumn('Country', 'left', true, true, true, true, 'asc', 2, 12)
    public country?: string;
    public status?: Status;
}
