import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModel,BaseListModel, SortFilterModel } from '../../models/base.model';
import { Reflection } from '../../reflection/reflection';
import { WebHttpClient } from '../../services/WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDataService {
  constructor(protected http:WebHttpClient) {}

  abstract addData(request: BaseModel): Observable<number>;
  abstract updateData(id: number, request: BaseModel): Observable<number>;
  abstract deleteData(id: number, request: BaseModel): Observable<BaseModel>;
  abstract isAlreadyExists(field: string, name: string): Observable<boolean>;
  abstract getAllData<T>(sortFilterData: SortFilterModel): Observable<BaseListModel<T>>;
  abstract getDataById(id: number): Observable<BaseModel>;
}
