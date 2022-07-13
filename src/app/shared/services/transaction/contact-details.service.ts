import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  SortFilterModel,
  CityModel,
  IncomeRangeModel,
  ContactModel,
} from 'src/app/shared/models';
import { LOV, ServiceType } from '../../enums';
import { IncomeRangesModel } from '../../models/income-ranges.model';
import { Reflection } from '../../reflection/reflection';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class ContactDetailsService extends BaseDataService {
  public service: ServiceType = ServiceType.None;
  getAllData<T>(sortFilterData: SortFilterModel): Observable<BaseListModel<T>> {
    throw new Error('Method not implemented.');
  }
  addData(request: BaseModel): Observable<number> {
    throw new Error('Method not implemented.');
  }
  // updateData(id: number, request: BaseModel): Observable<number> {
  //   throw new Error('Method not implemented.');
  // }
  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  getDataById(id: number, entity?: Reflection): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  constructor(http: WebHttpClient) {
    super(http);
  }

  updateData(id: number, request: ContactModel): Observable<number> {
    if (this.service != ServiceType.None) {
      const apiUrl = 'trans/' + this.service + '/createContactDetails';
      return this.http.post(apiUrl, request).pipe(
        map((result: any) => {
          if (result && result.cmsContactDetailsId) {
            return result.cmsContactDetailsId;
          }
          return 0;
        })
      );
    }
    else{
      return of(0);
    }

  }

  getDataByDependentId(cmsContactDetailsId: number): Observable<ContactModel> {
    if (this.service != ServiceType.None) {
      const apiUrl = 'trans/' + this.service + '/getContactDetails/' + cmsContactDetailsId;
      return this.http
        .get(
          apiUrl
        )
        .pipe(
          map((result: any) => {
            return result as ContactModel;
          })
        ).pipe(
          catchError((err) => {
            return of(new ContactModel);
          })
        );
    }
    else{
      return of(new ContactModel);
    }
  }

  saveContactDetails(request: ContactModel): Observable<boolean> {
    return this.http
      .post('trans/dataEntry/createContactDetails', request)
      .pipe(
        map((result: any) => {
          return (result && result.data && result.data > 0);
        })
      );
  }

}
