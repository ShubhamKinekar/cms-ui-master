import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  SortFilterModel,
  IsdCodeModel,
} from 'src/app/shared/models';
import { Reflection } from '../../reflection/reflection';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class IsdCodeService extends BaseDataService {
  
  constructor(http: WebHttpClient) {
    super(http);
  }

  getAllData<IsdCodeModel>(sortFilterData: SortFilterModel):
    Observable<BaseListModel<IsdCodeModel>> {
    const records: BaseListModel<IsdCodeModel> =
      new BaseListModel<IsdCodeModel>();
    return this.http
      .post('trans/isd/getIsd', sortFilterData)
      .pipe(
        map((result: any) => {
          if (result && result.data && result.data.length > 0) {
            records.data = result.data;
            records.totalRecords = result.recordsTotal;
          }
          return records;
        })
      );
  }
  addData(request: BaseModel): Observable<number> {
    throw new Error('Method not implemented.');
  }
  updateData(id: number, request: BaseModel): Observable<number> {
    throw new Error('Method not implemented.');
  }
  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }


  getDataById(id: number): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
}
