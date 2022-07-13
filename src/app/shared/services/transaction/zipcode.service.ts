import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  SortFilterModel,
  ZipCodeModel,
} from 'src/app/shared/models';
import { Reflection } from '../../reflection/reflection';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class ZipCodeService extends BaseDataService {
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

  getAllData<ZipCodeModel>(sortFilterData: SortFilterModel): Observable<BaseListModel<ZipCodeModel>> {
    const records: BaseListModel<ZipCodeModel> =
      new BaseListModel<ZipCodeModel>();
    return this.http
      .post('trans/zip/getZip', sortFilterData)
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

  getDataById(id: number): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  constructor(http: WebHttpClient) {
    super(http);
  }
  public filterData(
    fieldName: string,
    value: string,
    minCharLength: number
  ): Observable<BaseListModel<ZipCodeModel>> {
    const records: BaseListModel<ZipCodeModel> =
      new BaseListModel<ZipCodeModel>();
    const sortFilterData: SortFilterModel = new SortFilterModel();
    sortFilterData.length = 5000;
    sortFilterData.start = 0;
    sortFilterData[fieldName] = value;
    if (value && value.length >= minCharLength) {
      return this.http
        .post('trans/ZipCode/getZipCode', sortFilterData)
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
    return new Observable((observer) => {
      observer.next(records);
    });
  }
}
