import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  CaseInitiationModel,
  SortFilterModel,
} from 'src/app/shared/models';
import { ClientViewModel } from '../../models/client-view.model';
import { Reflection } from '../../reflection/reflection';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class ClientViewService extends BaseDataService {
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
   
  public getAllData<ClientViewModel>(
    sortFilterData: SortFilterModel
  ): Observable<BaseListModel<ClientViewModel>> {
    const records: BaseListModel<ClientViewModel> =
      new BaseListModel<ClientViewModel>();
    return this.http
    .post('trans/clientView/getClientViewDataTable', sortFilterData)
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
  ): Observable<BaseListModel<ClientViewModel>> {
    const records: BaseListModel<ClientViewModel> =
      new BaseListModel<ClientViewModel>();
    const sortFilterData: SortFilterModel = new SortFilterModel();
    sortFilterData.length = 50;
    sortFilterData.start = 0;
    sortFilterData[fieldName] = value;
    if (value && value.length >= minCharLength) {
      return this.http
        .post('trans/clientView/getClientViewDataTable', sortFilterData)
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
