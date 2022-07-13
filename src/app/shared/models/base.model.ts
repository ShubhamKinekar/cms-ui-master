import { DisplayColumn } from '../decorators/property';
import { Status } from '../enums';
import { Reflection } from '../reflection/reflection';

export class BaseModel extends Reflection {}

export class SortFilterModel {
  public start: number = 0;
  public length: number = 100;
  public columnSort?: number = 35;
  public pid?: number;
  public createdById?: number;
  public startDate?:any;
  public endDate?:any;
  [key: string]: any;
}

export class BaseListModel<T> extends Reflection {
  public totalRecords: number = 0;
  public data: T[] = [];
}
