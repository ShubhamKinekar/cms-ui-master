import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import { BaseModel, BaseListModel, UserModel, SortFilterModel, RoleModel } from 'src/app/shared/models';
import { Reflection } from 'src/app/shared/reflection/reflection';
import { LovmasterModel } from '../../models/lovmaster.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class LovService extends BaseDataService {
  constructor(http: WebHttpClient) {
    super(http);
  }

  addData(request: any): Observable<any> {
    return this.http.post('master/masterLov/saveLov',request);
  }
  updateData(id: number, data: any): Observable<number> {
    return this.http.put('master/masterLov/updateLov/'+id, data);
  }
  deleteData(id: number, request: UserModel): Observable<UserModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
   
  getlovName() {
    return this.http.get('master/masterLov/getLovNameList/');
    } 


    getDataById(data: any): Observable<LovmasterModel> {
      return this.http.post('master/masterLov/searchLov', data).pipe(
        map((result: any) => {
          if (result && result.data && result.data.length > 0) {
            return result.data[0];
          }
          return new LovmasterModel();
        })
      );
    }
  
    public getAllData<LovmasterModel>(
      sortFilterData: any
    ): Observable<BaseListModel<LovmasterModel>> {
      const records: BaseListModel<LovmasterModel> =
        new BaseListModel<LovmasterModel>();
      return this.http.post('master/masterLov/searchLov', sortFilterData).pipe(
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
