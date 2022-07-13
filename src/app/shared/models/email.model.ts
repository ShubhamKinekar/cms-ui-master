import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';
import { PermissionModel } from './permission.model';

export class EmailModel extends BaseModel {
 

  public emailId?: number = 0; 
  
  @DisplayColumn('Email Subject', 'left',true, true, true, true, 'asc', 3,13)
  public emailSubject: string = '';

  @DisplayColumn('Send To', 'left',true, true, true, true, 'asc', 4, 14)
  public sendTo: string = '';

  @DisplayColumn('Creation Date', 'left',true, true, true, true, 'asc', 5, 15)
  public creationDate: string = '';
  
  @DisplayColumn('Email Status', 'left',true, true, true, true, 'asc', 6, 16)
  public emailStatus: Status = Status.None;
   public emailTemplate: string = '';
   public emailBody: string = '';
   public sendCc: string = '';
   public attachmentPath: string = '';
   public failureCount: string = '';
   public transactionalId: string = '';
   public lastUpdateDate: string = '';
   public createdBy: string = '';
   public lastUpdateLogin: string = '';
   public lastUpdatedBy: string = '';

}
