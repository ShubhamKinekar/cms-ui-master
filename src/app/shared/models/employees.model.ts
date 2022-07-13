import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class EmployeesModel extends BaseModel {


   
    // public employeeId?: number= 0;
    public employeeId: number = 0;
  
    @DisplayColumn('Employee Code', 'left',true, true, true, true, 'asc', 5, 15)
    public employeeCode: string = '';
  
    @DisplayColumn('Name', 'left',true, true, true, true, 'asc', 6, 16)
    public name: string = '';
   
    @DisplayColumn('Designation', 'left',true, true, true, true, 'asc', 9, 19)
    public designation: string = '';
   
    @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 27, 37)
    public status: Status = Status.None;
    public branch: string = '';
    public location: string = '';
   public code: string = '';
   public superviserName: string = '';
   public grade: string = '';
   public department: string = '';
   public emailCompany: string = '';
   public mobileNumber: string = '';
   public dateOfJoining: string = '';
   public employmentStatus: string = '';
   public dateOfResignation: string = '';
    public lastWorkingDate: string = '';
    // public confirmPassword: string = '';
    // public isDefault: string= '';
  
    // public newPassword: string = '';
  
    
  }

