import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import { LOV, ServiceType } from 'src/app/shared/enums';
import {
    BaseModel,
    BaseListModel,
    SortFilterModel,
    AccountClosureModel,
    LovModel,
} from 'src/app/shared/models';
import { WebHttpClient } from '../../WebHttpClient';

@Injectable({
    providedIn: 'root',
})
export class AccountCloserService extends BaseDataService {
    public service: ServiceType = ServiceType.None;
    constructor(http: WebHttpClient) {
        super(http);
    }

    addData(request: AccountClosureModel): Observable<number> {
        if (this.service != ServiceType.None) {
            const apiUrl = 'trans/' + this.service + '/createAccountCloser';
            return this.http
                .post(apiUrl, request)
                .pipe(
                    map((result: any) => {

                        if (result && result.cmsAddressCorresId) {
                            return result.cmsAddressCorresId;
                        }
                        return 0;
                    })
                );
        }
        return of(0);
    }

    updateData(id: number, request: AccountClosureModel): Observable<number> {
        if (this.service != ServiceType.None) {
            const apiUrl = 'trans/' + this.service + '/createAccountCloser';

            return this.http.post(apiUrl, request).pipe(
                map((result: any) => {
                    if (result && result.cmsAddressCorresId) {
                        return result.cmsAddressCorresId;
                    }
                    return 0;
                })
            );
        }
        return of(0);
    }

    deleteData(id: number, request: BaseModel): Observable<BaseModel> {
        throw new Error('Method not implemented.');
    }
    isAlreadyExists(field: string, name: string): Observable<boolean> {
        throw new Error('Method not implemented.');
    }

    getDataById(id: number): Observable<AccountClosureModel> {
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

    getDataByDependentId(dependentId: number): Observable<AccountClosureModel> {
        if (this.service != ServiceType.None) {
            const apiUrl = 'trans/' + this.service + '/getCheckerAccountCloser/' + dependentId

            return this.http
                .get(
                    apiUrl
                )
                .pipe(
                    map((result: any) => {
                        return result.data as AccountClosureModel;
                    })
                ).pipe(
                    catchError((err) => {
                        return of(new AccountClosureModel);
                    })
                );
        }
        return of(new AccountClosureModel);

    }

    public getAllData<AccountClosureModel>(
        sortFilterData: any
    ): Observable<BaseListModel<AccountClosureModel>> {
        const records: BaseListModel<AccountClosureModel> = new BaseListModel<AccountClosureModel>();
        if (this.service != ServiceType.None) {
            const apiUrl = 'trans/' + this.service + '/getAccountCloser';

            return this.http
                .post(
                    'trans/dataEntry/getAccountCloser',
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
        return of(records);
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
}
