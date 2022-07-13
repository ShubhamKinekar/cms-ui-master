import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  DataEntryModel,
  AllocationModel,
  SortFilterModel,
} from 'src/app/shared/models';
import { WebHttpClient } from '../../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class DataEntryService extends BaseDataService {
  constructor(http: WebHttpClient) {
    super(http);
  }

  addData(request: BaseModel): Observable<number> {
    throw new Error('Method not implemented.');
  }

  updateData(id: number, request: DataEntryModel): Observable<number> {
    return this.http.put(`trans/dataEntry/update/${id}`, request).pipe(
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

  getDataById(id: number): Observable<DataEntryModel> {
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
    return this.http.get('trans/user/getUsersDetailsByPermisssion/DATA ENTRY');
  }

  public getAllData<DataEntryModel>(
    sortFilterData: any
  ): Observable<BaseListModel<DataEntryModel>> {
    const records: BaseListModel<DataEntryModel> = new BaseListModel<DataEntryModel>();
    return this.http
      .post(
        'trans/dataEntry/getDataEntryDataTable',
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
      .post('trans/dataEntry/allocateDataEntry', allocation)
      .pipe(
        map((result: any) => {
          return (result && result.data && result.data > 0);
        })
      );
  }

}
