import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
} from 'src/app/shared/models';
import { LovsubModel } from '../../models/lovsub.model';
import { PermissionModel } from '../../models/permission.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class LovsubService extends BaseDataService {
  
  constructor(http: WebHttpClient) {
    super(http);
  }
  addData(data: any): Observable<number> { 
    return this.http.post('master/masterLovSub/postLovSubId',data);
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
     
  getlovSub() {
    return this.http.get('master/masterLovSub/getLovList/');
    } 

  getsub(id: number){
    return this.http.get('master/masterLovSub/getLovSubId/'+id)
  }
  
  getDataById(id: number): Observable<LovsubModel> {
    return this.http.get('').pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
        return new LovsubModel();
      })
    );
  
    }
  public getAllData<LovsubModel>(
    sortFilterData: any
  ): Observable<BaseListModel<LovsubModel>> {
    const records: BaseListModel<LovsubModel> = new BaseListModel<LovsubModel>();
    return this.http.post('', sortFilterData).pipe(
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
