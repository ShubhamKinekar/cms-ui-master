import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  SortFilterModel,
  BacodeModel,
} from 'src/app/shared/models';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class BacodeService extends BaseDataService {
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
  // getDataById(id: number): Observable<BaseModel> {
  //   throw new Error('Method not implemented.');
  // }
  constructor(http: WebHttpClient) {
    super(http);
  }
  
  public getAllData<BacodeModel>(
    sortFilterData: SortFilterModel
  ): Observable<BaseListModel<BacodeModel>> {
    const records: BaseListModel<BacodeModel> =
      new BaseListModel<BacodeModel>();
    return this.http
      .post('trans/ba/getBacodeDataTabale', sortFilterData)
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

  getDataById(id: number): Observable<BacodeModel> {
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


  // getDataById(id: number): Observable<BacodeModel> {
  //   return this.http.post('trans/ba/getBacodeDataTabale/' + id).pipe(
  //     map((result: any) => {
  //       if (result && result.length > 0) {
  //         return result;
  //       }
  //     })
  //   );
  // }
 }
