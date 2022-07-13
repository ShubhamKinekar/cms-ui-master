import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
} from 'src/app/shared/models';
import { MasterCdslBankModel } from '../../models/master-cdsl-bank.model';
import { MasterNsdlBankModel } from '../../models/master-nsdl-bank.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class MasterNsdlBankService extends BaseDataService {
  // getDataById(id: number): Observable<MasterNsdlBankModel> {
  //   throw new Error('Method not implemented.');
  // }
  constructor(http: WebHttpClient) {
    super(http);
  }
  addData(request: any): Observable<number> {
   return this.http.post('master/MasterNsdlBank/saveMasterNsdlBank', request);
  }
  updateData(id: number, data: any): Observable<number> {
    return this.http.put('master/MasterNsdlBank/updateMasterNsdl/'+ id,data);
  }
  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  getDataById(data: any): Observable<MasterNsdlBankModel> {
    return this.http.post('master/MasterNsdlBank/getNsdlBank' , data).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
        return new MasterNsdlBankModel();
      })
    );
  
    }
  public getAllData<MasterNsdlBankModel>(
    sortFilterData: any
  ): Observable<BaseListModel<MasterNsdlBankModel>>{
    const records: BaseListModel<MasterNsdlBankModel> = new BaseListModel<MasterNsdlBankModel>();
    return this.http.post('master/MasterNsdlBank/getNsdlBank', sortFilterData).pipe(
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
