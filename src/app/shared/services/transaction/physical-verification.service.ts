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
import { PhysicalVerificationModel } from '../../models/physical-verification.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class PhysicalVerificationService extends BaseDataService {
  updateData(id: number, request: BaseModel): Observable<number> {
      throw new Error('Method not implemented.');
  }
 

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

  savePhysicalVerification(request: PhysicalVerificationModel): Observable<boolean> {
    return this.http
      .put('trans/physicalVerification/update', request)
      .pipe(
        map((result: any) => {
          return (result && result.data && result.data > 0);
        })
      );
  }
}
