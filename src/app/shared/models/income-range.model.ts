import { Status } from '../enums';
import { BaseModel } from './base.model' ;

export class IncomeRangeModel extends BaseModel {

    public  cmsIncomeRangeId: number = 0;
    public  cmsDataEntryId?: number;
    public  cmsCheckerId?: number;
    public  incomeRangeId?: number;
    public  status? : Status ;
    public description?:string;
    
}
