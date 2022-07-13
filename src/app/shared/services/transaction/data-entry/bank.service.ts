import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import { ServiceType } from 'src/app/shared/enums';
import {
    BaseModel,
    BaseListModel,
    BankModel,
    SortFilterModel,
} from 'src/app/shared/models';
import { WebHttpClient } from '../../WebHttpClient';

@Injectable({
    providedIn: 'root',
})
export class BankService extends BaseDataService {
    public service: ServiceType = ServiceType.None;
    constructor(http: WebHttpClient) {
        super(http);
    }

    addData(request: BankModel): Observable<number> {
        if (this.service != ServiceType.None) {
            const apiUrl = 'trans/' + this.service + '/createBankDetails';
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

    updateData(id: number, request: BankModel): Observable<number> {
        if (this.service != ServiceType.None) {
            const apiUrl = 'trans/' + this.service + '/createBankDetails';

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

    getDataById(id: number): Observable<BankModel> {
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

    getDataByDependentId(dependentId: number): Observable<BankModel> {
        if (this.service != ServiceType.None) {
            const apiUrl = 'trans/' + this.service + '/getBankDetails/' + dependentId

            return this.http
                .get(apiUrl)
                .pipe(
                    map((result: any) => {
                        return result as BankModel;
                    })
                ).pipe(
                    catchError((err) => {
                        return of(new BankModel);
                    })
                );
        }
        return of(new BankModel);

    }

    public getAllData<BankModel>(
        sortFilterData: any
    ): Observable<BaseListModel<BankModel>> {
        const records: BaseListModel<BankModel> = new BaseListModel<BankModel>();
        if (this.service != ServiceType.None) {
            const apiUrl = 'trans/' + this.service + '/getBankDetails';

            return this.http
                .post(
                    'trans/dataEntry/getBankDetails',
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

}
