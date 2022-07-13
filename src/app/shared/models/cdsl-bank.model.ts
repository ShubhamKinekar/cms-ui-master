import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class CDSLBankModel extends BaseModel {
    public cmsMaterCDSLBankId?: number;
    @DisplayColumn('Bank Code', 'left', true, true, true, true, 'asc', 2, 12)
    public bankCode?: string;
    @DisplayColumn('Bank AC Type', 'left', true, true, true, true, 'asc', 3, 13)
    public bankACType?: string;
    @DisplayColumn('Bank Name', 'left', true, true, true, true, 'asc', 2, 12)
    public bankName?: string;
    @DisplayColumn('Branch No', 'left', true, true, true, true, 'asc', 2, 12)
    public branchNo?: string;
    @DisplayColumn('Address Id', 'left', true, true, true, true, 'asc', 2, 12)
    public addressId?: string;
    public uniqueId?: string;
    @DisplayColumn('Address 1', 'left', true, true, true, true, 'asc', 2, 12)
    public address1?: string;
    @DisplayColumn('Address 2', 'left', true, true, true, true, 'asc', 2, 12)
    public address2?: string;
    @DisplayColumn('Address 3', 'left', true, true, true, true, 'asc', 2, 12)
    public address3?: string;
    @DisplayColumn('Address 4', 'left', true, true, true, true, 'asc', 2, 12)
    public address4?: string;
    @DisplayColumn('City', 'left', true, true, true, true, 'asc', 2, 12)
    public city?: string;
    @DisplayColumn('Zip', 'left', true, true, true, true, 'asc', 2, 12)
    public zip?: string;
    @DisplayColumn('Country', 'left', true, true, true, true, 'asc', 2, 12)
    public country?: string;
    @DisplayColumn('State', 'left', true, true, true, true, 'asc', 2, 12)
    public state?: string;
    public status?: Status;
}
