import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  SortFilterModel,
} from 'src/app/shared/models';
import { BatchMasterPendingModel } from '../../models/batch-master-pending.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class BatchMasterPendingService extends BaseDataService {
    getDataById(id: number): Observable<BaseModel> {
        throw new Error('Method not implemented.');
    }


  constructor(http: WebHttpClient) {
    super(http);
  }
  addData(request: any): Observable<number> {
    return this.http.post('export/batchMaster/saveBatchMaster', request);
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

//   getDataById(data: number): Observable<BatchMasterModel> {
//     return this.http.post('',data).pipe(
//       map((result: any) => {
//         if (result && result.data && result.data.length > 0) {
//           return result.data[0];
//         }
//         return new BatchMasterModel();
//       })
//     );
  
//     }

getbatchType() {
    return this.http.get('trans/lov/getLov/EXPORTTYPE');
    }
    

   public getAllData<BatchMasterPendingModel>(
      sortFilterData: any
  ): Observable<BaseListModel<BatchMasterPendingModel>>{
    const records: BaseListModel<BatchMasterPendingModel> = new BaseListModel<BatchMasterPendingModel>();
    return this.http.post('export/batchMaster/resultBatchMaster', sortFilterData).pipe(
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
