

import { Status } from '../enums';
import { BaseModel } from './base.model' ;

export class IsdCodeModel extends BaseModel {

    public  cmsIsdId: number = 0;
    public  cmsIsdCode?: string;
    public  cmsIsdName?: number;
    public  status? : Status ;
    public description?:string;
   

}
