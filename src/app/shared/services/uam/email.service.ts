import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  SortFilterModel,
  UserModel,
} from 'src/app/shared/models';
import { EmailModel } from '../../models/email.model';
import { PermissionModel } from '../../models/permission.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class EmailService extends BaseDataService {

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

   getDataById(data: any): Observable<EmailModel> {
    return this.http.post('master/email/searchEmail', data).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
        return new EmailModel();
      })
    );
  
    }
  public getAllData<EmailModel>(
    sortFilterData: any
  ): Observable<BaseListModel<EmailModel>> {
    const records: BaseListModel<EmailModel> = new BaseListModel<EmailModel>();
    return this.http.post('master/email/searchEmail', sortFilterData).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          records.data = result.data;
          records.totalRecords = result.recordsTotal;
        }
        return records;
      })
    );
  }
  
  // getAllPermission(): Observable<BaseListModel<PermissionModel>> {
  //   const sortFilterData = new SortFilterModel();
  //   sortFilterData.start = 0;
  //   sortFilterData.length = 1000;
  //   const records: BaseListModel<PermissionModel> = 
  //   new BaseListModel<PermissionModel>();
  //   return this.http
  //     .post(`master/email/getAllPermissionDataTable`, sortFilterData)
  //     .pipe(
  //       map((result: any) => {
  //         if (result && result.data && result.data.length > 0) {
  //           records.data = result.data;
  //           records.totalRecords = result.recordsTotal;
  //         }
  //         return records;
  //       })
  //     );
  // }
}
