import { Status } from '../enums';
import { BaseModel } from './base.model' ;

export class IncomeRangesModel extends BaseModel {

    public  cmsMasterNSDLIncomeRangeId: number = 0;
    public  incomeType?: string;
    public  incomeRangeId?: number;
    public  status? : Status ;
    public description?:string;
    
}
