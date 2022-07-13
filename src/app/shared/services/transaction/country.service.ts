import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  SortFilterModel,
  CountryModel,
} from 'src/app/shared/models';
import { Reflection } from '../../reflection/reflection';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class CountryService extends BaseDataService {
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

  getAllData<CountryModel>(sortFilterData: SortFilterModel): Observable<BaseListModel<CountryModel>> {
    const records: BaseListModel<CountryModel> =
      new BaseListModel<CountryModel>();
    return this.http
      .post('trans/country/getCountry', sortFilterData)
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
  ): Observable<BaseListModel<CountryModel>> {
    const records: BaseListModel<CountryModel> =
      new BaseListModel<CountryModel>();
    const sortFilterData: SortFilterModel = new SortFilterModel();
    sortFilterData.length = 5000;
    sortFilterData.start = 0;
    sortFilterData[fieldName] = value;
    if (value && value.length >= minCharLength) {
      return this.http
        .post('trans/country/getCountry', sortFilterData)
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
