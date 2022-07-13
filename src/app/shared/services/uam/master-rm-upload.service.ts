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

import { IRequestOptions, WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class MasterRmUploadService extends BaseDataService {
  updateData(id: number, request: BaseModel): Observable<number> {
    throw new Error('Method not implemented.');
  }
  constructor(http: WebHttpClient) {
    super(http);
  }

  addData(request: any): Observable<number> {
    return this.http.get('master/masterRm/readMasterRmCsvUpload/' + request);
  }

  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }

  isAlreadyExists(field: string, value: string): Observable<boolean> {
    return this.http.get(`trans/caseInitiation/validateBarcode/${value}`).pipe(
      map((result: any) => {
        return result && result.data == 'New' ? false : true;
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

  uploadFile(request: FormData): Observable<string | null> {
    let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options: any = { headers: headers };
    return this.http
      .post('master/masterRm/masterRmCsvUpload', request, options)
      .pipe(
        map((result: any) => {
          if (result && result.fileName) {
            return result.fileName as string;
          }
          return null;
        })
      );
  }
}
