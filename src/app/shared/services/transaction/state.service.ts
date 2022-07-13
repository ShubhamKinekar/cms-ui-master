import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  SortFilterModel,
  StateModel,
} from 'src/app/shared/models';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class StateService extends BaseDataService {
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

  getAllData<StateModel>(sortFilterData: SortFilterModel): Observable<BaseListModel<StateModel>> {
    const records: BaseListModel<StateModel> =
      new BaseListModel<StateModel>();
    return this.http
      .post('trans/state/getState', sortFilterData)
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

  getDataById(id: number): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  constructor(http: WebHttpClient) {
    super(http);
  }
  public filterData(
    fieldName: string,
    value: string,
    minCharLength: number
  ): Observable<BaseListModel<StateModel>> {
    const records: BaseListModel<StateModel> =
      new BaseListModel<StateModel>();
    const sortFilterData: SortFilterModel = new SortFilterModel();
    sortFilterData.length = 5000;
    sortFilterData.start = 0;
    sortFilterData[fieldName] = value;
    if (value && value.length >= minCharLength) {
      return this.http
        .post('trans/state/getstate', sortFilterData)
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
    return new Observable((observer) => {
      observer.next(records);
    });
  }
}
