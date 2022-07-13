import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  CaseInitiationModel,
  SortFilterModel,
} from 'src/app/shared/models';
import { Reflection } from 'src/app/shared/reflection/reflection';
import { ClientViewModel } from '../../models/client-view.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class CaseInitiationService extends BaseDataService {
  constructor(http: WebHttpClient) {
    super(http);
  }

  addData(request: CaseInitiationModel): Observable<number> {
    return this.http
      .post('trans/caseInitiation/create', request,)
      .pipe(
        map((result: any) => {
          return result &&
            result.cmsCaseInitiationId &&
            result.cmsCaseInitiationId > 0
            ? result.cmsCaseInitiationId
            : 0;
        })
      );
  }
  updateData(id: number, request: CaseInitiationModel): Observable<number> {
    return this.http.put(`trans/caseInitiation/update/${id}`, request).pipe(
      map((result: any) => {
        return result &&
          result.cmsCaseInitiationId &&
          result.cmsCaseInitiationId > 0
          ? result.cmsCaseInitiationId
          : 0;
      })
    );
  }
  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, value: string): Observable<boolean> {
    return this.http.get(`trans/caseInitiation/validateBarcode/${value}`).pipe(
      map((result: any) => {
        return result &&
          result.data == 'New' ? false : true;
      })
    );
  }

  getDataById(id: number): Observable<CaseInitiationModel> {
    const sortFilterModel: SortFilterModel = new SortFilterModel();
    sortFilterModel.pid = id;
    return this.getAllData(sortFilterModel).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
      })
    );
  }

  public getAllData<CaseInitiationModel>(
    sortFilterData: SortFilterModel
  ): Observable<BaseListModel<CaseInitiationModel>> {
    const records: BaseListModel<CaseInitiationModel> =
      new BaseListModel<CaseInitiationModel>();
    return this.http
      .post('trans/caseInitiation/getCaseInitiateDataTable', sortFilterData)
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
