import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import { ServiceType } from 'src/app/shared/enums';
import {
  BaseModel,
  BaseListModel,
  AddressModificationModel,
  SortFilterModel,
} from 'src/app/shared/models';
import { WebHttpClient } from '../../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class AddressModificatioPermanentService extends BaseDataService {
  constructor(http: WebHttpClient) {
    super(http);
  }

  public service: ServiceType = ServiceType.None;

  addData(request: AddressModificationModel): Observable<number> {
    if (this.service != ServiceType.None) {
      const apiUrl = 'trans/' + this.service + '/createAddressPerm/';

      return this.http
        .post(apiUrl, request)
        .pipe(
          map((result: any) => {

            if (result && result.cmsAddressPermId) {
              return result.cmsAddressPermId;
            }
            return 0;
          })
        );
    }
    else {
      return of(0);
    }
  }

  updateData(id: number, request: AddressModificationModel): Observable<number> {
    if (this.service != ServiceType.None) {
      const apiUrl = 'trans/' + this.service + '/createAddressPerm/';
      return this.http.post(apiUrl, request).pipe(
        map((result: any) => {
          if (result && result.cmsAddressPermId) {
            return result.cmsAddressPermId;
          }
          return 0;
        })
      );
    }
    else {
      return of(0);
    }
  }

  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  getDataById(id: number): Observable<AddressModificationModel> {
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

  getDataByDependentId(cmsDataEntryId: number): Observable<AddressModificationModel> {
    if (this.service != ServiceType.None) {
      const apiUrl = 'trans/' + this.service + '/getAddressCorres/' + cmsDataEntryId
      return this.http
        .get(
          apiUrl 
        )
        .pipe(
          map((result: any) => {
            return result as AddressModificationModel;
          })
        ).pipe(
          catchError((err) => {
            return of(new AddressModificationModel);
          })
        );
    }
    else{
      return of(new AddressModificationModel);
    }
  }

  public getAllData<AddressModificationModel>(
    sortFilterData: any
  ): Observable<BaseListModel<AddressModificationModel>> {
    const records: BaseListModel<AddressModificationModel> = new BaseListModel<AddressModificationModel>();
    return this.http
      .post(
        'trans/dataEntry/getAddressPerm',
        sortFilterData
      )
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
