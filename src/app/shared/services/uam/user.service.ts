import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import { BaseModel, BaseListModel, UserModel, SortFilterModel, RoleModel } from 'src/app/shared/models';
import { Reflection } from 'src/app/shared/reflection/reflection';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseDataService {
  constructor(http: WebHttpClient) {
    super(http);
  }

  addData(request: any): Observable<any> {
    return this.http.post('uam/user/resetPassword',request);
  }
  updateData(id: number, request: UserModel): Observable<number> {
    throw new Error('Method not implemented.');
  }
  deleteData(id: number, request: UserModel): Observable<UserModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
   
  getUserName(name:any) {
    return this.http.get('uam/user/getTokenForResetPassword?userName='+ name);
  }

  // getUserByID(id:any) {
  //   return this.http.get('uam/user/getUserByID?userId=' + id);
  // }

   
  // getDataById(id: number): Observable<UserModel> {
  //   const sortFilterModel: SortFilterModel = new SortFilterModel();
  //   sortFilterModel.pid = id;
  //   return this.http.get('uam/user/getUserByID?userId=' + id).pipe(
  //     map((result: any) => {
  //       if (result && result.data && result.data.length > 0) {
  //           return result.data[0]
  //       }
  //     })
  //   );
  // }

  getDataById(id: number): Observable<UserModel> {
    return this.http.get('uam/user/getUserByID?userId=' + id).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
      })
    );
  }

  public getAllData<ScrutinyModel>(
    sortFilterData: any
  ): Observable<BaseListModel<ScrutinyModel>> {
    const records: BaseListModel<ScrutinyModel> =
      new BaseListModel<ScrutinyModel>();
    return this.http.post('uam/user/getAllUserDataTable', sortFilterData).pipe(
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
