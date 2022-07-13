import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { BaseModel } from './base.model';

export class SystemConfigurationModel extends BaseModel {
 
  
    public cmsSysVariablesId: number = 0;

  @DisplayColumn('Key', 'left',true, true, true, true, 'asc', 1, 11)
  public key: string = '';
  
  
  @DisplayColumn('Value', 'left',true, true, true, true, 'asc', 2, 12)
  public value: string = '';
 
  @DisplayColumn('Description', 'left',true, true, true, true, 'asc', 3, 13)
  public description: string = '';

  @DisplayColumn('Status', 'left',true, true, true, true, 'asc', 4, 14)
  public status: string = '';

}
