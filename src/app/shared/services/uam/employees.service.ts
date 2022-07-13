import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
} from 'src/app/shared/models';
import { EmployeesModel } from '../../models/employees.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService 
extends BaseDataService {

  constructor(http: WebHttpClient) {
    super(http);
  }
  addData(request: any): Observable<number> {
    return this.http.post('master/Employees/insertEmployee', request);
  }
  updateData(id: number, data: any): Observable<number> {
    return this.http.put('master/Employees/updatemployee/'+id, data)
    }


  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  getDataById(data: any): Observable<EmployeesModel> {
    return this.http.post('master/Employees/getEmployees', data).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
        return new EmployeesModel();
      })
    );
  
    }

  public getAllData<EmployeesModel>(
    sortFilterData: any
  ): Observable<BaseListModel<EmployeesModel>>{
    const records: BaseListModel<EmployeesModel> = new BaseListModel<EmployeesModel>();
    return this.http.post('master/Employees/getEmployees', sortFilterData).pipe(
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
