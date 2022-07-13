import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class EmployeesUploadModel extends BaseModel {

    public fileUpload: string= '';
}