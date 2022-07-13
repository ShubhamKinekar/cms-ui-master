import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  SortFilterModel,
  CityModel,
  IncomeRangeModel,
} from 'src/app/shared/models';
import { LOV, ServiceType } from '../../enums';
import { IncomeRangesModel } from '../../models/income-ranges.model';
import { Reflection } from '../../reflection/reflection';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class IncomeRangeService extends BaseDataService {
  public service: ServiceType = ServiceType.None;
  getAllData<T>(sortFilterData: SortFilterModel): Observable<BaseListModel<T>> {
    throw new Error('Method not implemented.');
  }
  addData(request: BaseModel): Observable<number> {
    throw new Error('Method not implemented.');
  }
  // updateData(id: number, request: BaseModel): Observable<number> {
  //   throw new Error('Method not implemented.');
  // }
  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  getDataById(id: number, entity?: Reflection): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  constructor(http: WebHttpClient) {
    super(http);
  }

  updateData(id: number, request: IncomeRangeModel): Observable<number> {
    if (this.service != ServiceType.None) {
      const apiUrl = 'trans/' + this.service + '/createIncomeRange';
      return this.http.post(apiUrl, request).pipe(
        map((result: any) => {
          if (result && result.cmsIncomeRangeId) {
            return result.cmsIncomeRangeId;
          }
          return 0;
        })
      );
    }
    else {
      return of(0);
    }
  }

  getDataByDependentId(cmsDataEntryId: number): Observable<IncomeRangeModel> {
    if (this.service != ServiceType.None) {
      const apiUrl = 'trans/' + this.service + '/getIncomeRange/' + cmsDataEntryId
      return this.http
        .get(
          apiUrl
        )
        .pipe(
          map((result: any) => {
            return result as IncomeRangeModel;
          })
        ).pipe(
          catchError((err) => {
            return of(new IncomeRangeModel);
          })
        );
    }
    else{
      return of(new IncomeRangeModel);
    }
  }

  getIncomeRange(type: LOV): Observable<BaseListModel<IncomeRangesModel>> {
    const sortFilterData = new SortFilterModel();
    sortFilterData['systemType'] = type;
    sortFilterData.start = 0;
    sortFilterData.length = 1000;
    const records: BaseListModel<IncomeRangesModel> =
      new BaseListModel<IncomeRangesModel>();
    return this.http
      .post(`trans/incomeRange/getIncomeRangeDataTable`, sortFilterData)
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

  saveIncomeRange(request: IncomeRangeModel): Observable<boolean> {
    return this.http
      .post('trans/dataEntry/createIncomeRange', request)
      .pipe(
        map((result: any) => {
          return (result && result.data && result.data > 0);
        })
      );
  }

}
