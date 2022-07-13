import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  BaseListModel,
  SortFilterModel,
  DynamicRequestTypeModel,
  DynamicRequestModel,
} from 'src/app/shared/models';
import { ServiceType } from '../../enums';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class DynamicRequestTypeService {
  public service: ServiceType = ServiceType.None;
  constructor(private http: WebHttpClient) {

  }
  saveData(request: DynamicRequestTypeModel): Observable<number> {
    if (this.service != ServiceType.None) {
      const apiUrl = 'trans/' + this.service + '/saveUpdateDynamicRT'
      return this.http.post<number>(apiUrl, request)
        .pipe(map((result: any) => {
          return 1 as number;
        }));
    }
    else {
      return of(0);
    }
  }

  getAllData<T>(sortFilterData: SortFilterModel): Observable<BaseListModel<T>> {
    throw new Error('Method not implemented.');
  }

  getDataByDependentId(dependentId: number): Observable<DynamicRequestModel[]> {
    if (this.service != ServiceType.None) {
      const apiUrl = 'trans/' + this.service + '/getDynamicRT/' + dependentId;
      return this.http
        .get<DynamicRequestModel[]>(apiUrl)
        .pipe(
          map((result: any) => {
            if (this.service == ServiceType.DataEntry && result && result.data && result.data.dedynamicRTSubList) {
              return result.data.dedynamicRTSubList;
            }
            else  if (this.service == ServiceType.Checker && result && result.data && result.data.checkerDynamicRTSubList) {
              return result.data.checkerDynamicRTSubList;
            }
            return new Array();
          }));
    }
    else {
      return of(new Array());
    }
  }
}
