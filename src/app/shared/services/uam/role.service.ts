import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  RoleModel,
  SortFilterModel,
} from 'src/app/shared/models';
import { Reflection } from 'src/app/shared/reflection/reflection';
import { PermissionModel } from '../../models/permission.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseDataService {
  constructor(http: WebHttpClient) {
    super(http);
  }

  addData(request: RoleModel): Observable<number> {
    return this.http.post('uam/role/saveRole', request);
  }
  updateData(id: number, request: RoleModel): Observable<number> {
    throw new Error('Method not implemented.');
  }
  deleteData(id: number, request: RoleModel): Observable<RoleModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  // getDataById(id: number): Observable<RoleModel> {
  //   throw new Error('Method not implemented.');
  // }

  getDataById(id: number): Observable<RoleModel> {
    return this.http.get('uam/role/getRoleByID?roleId='+id).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
        return new RoleModel();
      })
    );
  }

  public getAllData<RoleModel>(
    sortFilterData: any
  ): Observable<BaseListModel<RoleModel>> {
    const records: BaseListModel<RoleModel> = new BaseListModel<RoleModel>();
    return this.http.post('uam/role/getAllRoleDataTable', sortFilterData).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          records.data = result.data;
          records.totalRecords = result.recordsTotal;
        }
        return records;
      })
    );
  }

  getAllPermission(): Observable<BaseListModel<PermissionModel>> {
    const sortFilterData = new SortFilterModel();
    sortFilterData.start = 0;
    sortFilterData.length = 1000;
    const records: BaseListModel<PermissionModel> = 
    new BaseListModel<PermissionModel>();
    return this.http
      .post(`uam/permission/getAllPermissionDataTable`, sortFilterData)
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
}
