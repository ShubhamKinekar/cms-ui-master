import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class EmployeeModel extends BaseModel {
  public employeeId?: number;
  @DisplayColumn('Branch', 'left', true, true, true, true, 'asc', 2, 12)
  public branch?: string;
  @DisplayColumn('Branch Code', 'left', true, true, true, true, 'asc', 3, 13)
  public code?: number;
  @DisplayColumn('Location 1', 'left', true, true, true, true, 'asc', 4, 14)
  public location?: string;
  @DisplayColumn('Employee Code', 'left', true, true, true, true, 'asc', 5, 15)
  public employeeCode?: string;
  @DisplayColumn('Name', 'left', true, true, true, true, 'asc', 6, 16)
  public name?: string;
  @DisplayColumn('Superviser Name', 'left', true, true, true, true, 'asc', 7, 17)
  public superviserName?: string;
  @DisplayColumn('Grade', 'left', true, true, true, true, 'asc', 8, 18)
  public grade?: string;
  @DisplayColumn('Designation', 'left', true, true, true, true, 'asc', 9, 19)
  public designation?: string;
  @DisplayColumn('Department', 'left', true, true, true, true, 'asc', 6, 17)
  public department?: string;
  @DisplayColumn('Email Company', 'left', true, true, true, true, 'asc', 6, 17)
  public emailCompany?: string;
  @DisplayColumn('Joining Date', 'left', true, true, true, true, 'asc', 6, 17)
  public dateOfJoining?: Date;
  @DisplayColumn('Employment Status', 'left', true, true, true, true, 'asc', 6, 17)
  public employmentStatus?: string;
  @DisplayColumn('Resignation Date', 'left', true, true, true, true, 'asc', 6, 17)
  public dateOfResignation?: Date;
  @DisplayColumn('Last Working Date', 'left', true, true, true, true, 'asc', 6, 17)
  public lastWorkingDate?: Date;
  public userType?: string;
  public status?: Status;
}
