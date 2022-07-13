import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
} from 'src/app/shared/models';
import { MasterRmModel } from '../../models/master-rm.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class MasterRmService extends BaseDataService {

  constructor(http: WebHttpClient) {
    super(http);
  }
  addData(request: any): Observable<number> {
    return this.http.post('master/masterRm/SaveRM', request);
  }
  updateData(id: number, data: any): Observable<number> {
    return this.http.put('master/masterRm/updateMasterRm/'+id, data);
  }
  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  getDataById(data: any): Observable<MasterRmModel> {
    return this.http.post('master/masterRm/searchMasterRm', data).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
        return new MasterRmModel();
      })
    );
  
    }
  public getAllData<MasterRmModel>(
    sortFilterData: any
  ): Observable<BaseListModel<MasterRmModel>>{
    const records: BaseListModel<MasterRmModel> = new BaseListModel<MasterRmModel>();
    return this.http.post('master/masterRm/searchMasterRm', sortFilterData).pipe(
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
