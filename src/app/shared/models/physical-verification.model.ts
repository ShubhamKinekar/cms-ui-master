import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';
import { PermissionModel } from './permission.model';

export class PhysicalVerificationModel extends BaseModel {

    @DisplayColumn('Barcode No', 'left',true, true, true, true, 'asc', 2, 12)
    public barcode: string = '';
    @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 6, 16)
    public status: Status = Status.None;
}
