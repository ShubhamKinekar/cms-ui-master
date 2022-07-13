import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
} from 'src/app/shared/models';
import { MasterBranchModel } from '../../models/master-branch.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class MasterBranchService extends BaseDataService {

  constructor(http: WebHttpClient) {
    super(http);
  }
  addData(request: any): Observable<number> {
    return this.http.post('master/branch/saveBranch', request);
  }
  updateData(id: number, data: any): Observable<number> {
    return this.http.put('master/branch/updateBranch/'+id, data);
  }
  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  getDataById(data: any): Observable<MasterBranchModel> {
    return this.http.post('master/branch/searchBranch', data).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
        return new MasterBranchModel();
      })
    );
  
    }
  public getAllData<MasterBranchModel>(
    sortFilterData: any
  ): Observable<BaseListModel<MasterBranchModel>>{
    const records: BaseListModel<MasterBranchModel> = new BaseListModel<MasterBranchModel>();
    return this.http.post('master/branch/searchBranch', sortFilterData).pipe(
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
