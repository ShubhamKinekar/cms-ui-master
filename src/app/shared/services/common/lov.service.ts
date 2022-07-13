import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  CaseInitiationModel,
  SortFilterModel,
  LovModel,
} from 'src/app/shared/models';
import { LOV } from '../../enums';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class LOVService extends BaseDataService {
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
  getAllData<T>(sortFilterData: SortFilterModel): Observable<BaseListModel<T>> {
    throw new Error('Method not implemented.');
  }
  getDataById(id: number): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }

  getLOVData(lovType: LOV) : Observable<BaseListModel<LovModel>>{
    const records: BaseListModel<LovModel> = new BaseListModel<LovModel>();
    return this.http.get('trans/lov/getLov/' + lovType)
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

  getSubLOVData(lovType:LOV){
    return this.http.get('/trans/lov/getSubLov/' + lovType);
  }

  getUserType(){
    return this.http.get('trans/user/getUserForReports/ALL');
  }
  
}
