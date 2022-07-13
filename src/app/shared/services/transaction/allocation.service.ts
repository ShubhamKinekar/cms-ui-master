import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
    BaseModel,
    BaseListModel,
    SortFilterModel,
    AllocationModel,
} from 'src/app/shared/models';
import { ServiceType } from '../../enums';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
    providedIn: 'root',
})
export class AllocationService extends BaseDataService {
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
    getDataById(id: number): Observable<BaseModel> {
        throw new Error('Method not implemented.');
    }
    constructor(http: WebHttpClient) {
        super(http);
    }
    
    saveAllocation(serviceType: ServiceType, allocation: AllocationModel): Observable<boolean> {
        const endPoint = serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
        return this.http
            .post('trans/' + serviceType + '/allocate' + endPoint, allocation)
            .pipe(
                map((result: any) => {
                    return (result && result.data && result.data > 0);
                })
            );
    }

    public getAllData<BranchModel>(
        sortFilterData: SortFilterModel
    ): Observable<BaseListModel<BranchModel>> {
        const records: BaseListModel<BranchModel> =
            new BaseListModel<BranchModel>();
        return this.http
            .post('trans/branch/getBranchDataTable', sortFilterData)
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
