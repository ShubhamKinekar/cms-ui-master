import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  ScrutinyModel,
  SortFilterModel,
  AllocationModel,
} from 'src/app/shared/models';
import { Reflection } from 'src/app/shared/reflection/reflection';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class ScrutinyService extends BaseDataService {
  constructor(http: WebHttpClient) {
    super(http);
  }

  addData(request: BaseModel): Observable<number> {
    throw new Error('Method not implemented.');
  }
  updateData(id: number, request: ScrutinyModel): Observable<number> {
    return this.http.put(`trans/scrutiny/update/${id}`, request).pipe(
      map((result: any) => {
        return result && result.cmsScrutinyId && result.cmsScrutinyId > 0
          ? result.cmsScrutinyId
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
  getDataById(id: number): Observable<ScrutinyModel> {
    const sortFilterModel: SortFilterModel = new SortFilterModel();
    sortFilterModel.pid = id;
    return this.getAllData<ScrutinyModel>(sortFilterModel)
      .pipe(
        map((result: any) => {
         return result.data[0];
        })
      );
  }

  public getAllData<ScrutinyModel>(
    sortFilterData: any
  ): Observable<BaseListModel<ScrutinyModel>> {
    const records: BaseListModel<ScrutinyModel> =
      new BaseListModel<ScrutinyModel>();
    return this.http
      .post('trans/scrutiny/getScrutinyDataTable', sortFilterData)
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

  getAllocatedUserData() {
    return this.http.get('trans/user/getUsersDetailsByPermisssion/SCRUTINY');
  }

  saveAllocation(allocation: AllocationModel): Observable<boolean> {
    return this.http
      .post('trans/scrutiny/allocateScrutiny', allocation)
      .pipe(
        map((result: any) => {
          return (result && result.data && result.data > 0);
        })
      );
  }
}
