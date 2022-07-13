import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  CheckerModel,
  AllocationModel,
  SortFilterModel,
} from 'src/app/shared/models';
import { Reflection } from 'src/app/shared/reflection/reflection';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class CheckerService extends BaseDataService {
  constructor(http: WebHttpClient) {
    super(http);
  }

  addData(request: BaseModel): Observable<number> {
    throw new Error('Method not implemented.');
  }
  // updateData(id: number, request: BaseModel): Observable<number> {
  //   throw new Error('Method not implemented.');
  // }
  updateData(id: number, request: CheckerModel): Observable<number> {
    return this.http.put(`trans/checker/update/${id}`, request).pipe(
      map((result: any) => {
        return result && result.cmsDataEntryId && result.cmsDataEntryId > 0
          ? result.cmsDataEntryId
          : 0;
      })
    );
  }
  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  getDataById(id: number, entity?: Reflection): Observable<CheckerModel> {
    const sortFilterModel: SortFilterModel = new SortFilterModel();
    sortFilterModel.pid = id;
    return this.getAllData(sortFilterModel).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
      })
    );
  }

  getAllocatedUserData() {
    return this.http.get('trans/user/getUsersDetailsByPermisssion/CHECKER');
  }

  public getAllData<CheckerModel>(
    sortFilterData: any
  ): Observable<BaseListModel<CheckerModel>> {
    const records: BaseListModel<CheckerModel> =
      new BaseListModel<CheckerModel>();
    return this.http
      .post(
        'trans/checker/getCheckerDataTable',
        sortFilterData
      )
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

  saveAllocation(allocation: AllocationModel): Observable<boolean> {
    return this.http
    .post('trans/checker/allocateChecker', allocation)
    .pipe(
      map((result: any) => {
        return (result && result.data && result.data > 0) ;
      })
    );
  }

}
