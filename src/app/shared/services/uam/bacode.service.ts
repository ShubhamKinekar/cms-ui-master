import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
} from 'src/app/shared/models';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class BacodeService extends BaseDataService {
  getDataById(id: number): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  constructor(http: WebHttpClient) {
    super(http);
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

  // getDataById(Pid: number): Observable<EmailModel> {
  //   return this.http.get('uam/email/getEmailByID?emailId='+Pid).pipe(
  //     map((result: any) => {
  //       if (result && result.data && result.data.length > 0) {
  //         return result.data[0];
  //       }
  //       return new EmailModel();
  //     })
  //   );
  
  //   }
  public getAllData<BacodeModel>(
    sortFilterData: any
  ): Observable<BaseListModel<BacodeModel>>{
    const records: BaseListModel<BacodeModel> = new BaseListModel<BacodeModel>();
    return this.http.post('master/bacode/getBacode', sortFilterData).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          records.data = result.data;
          records.totalRecords = result.recordsTotal;
        }
        return records;
      })
    );
  }
  
  

}
