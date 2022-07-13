import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import { BaseModel, BaseListModel } from 'src/app/shared/models';
import { MasterRmModel } from '../../models/master-rm.model';
import { SystemConfigurationModel } from '../../models/system-configuration.model';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class SystemConfigurationService extends BaseDataService {
  constructor(http: WebHttpClient) {
    super(http);
  }
  addData(request: any): Observable<number> {
    return this.http.post('trans/sysConfig/saveSysConfig', request);
  }
  updateData(id:number,data: any): Observable<number> {
    return this.http.put('trans/sysConfig/updateSysConfig/'+id, data);
  }
  deleteData(id: number, request: BaseModel): Observable<BaseModel> {
    throw new Error('Method not implemented.');
  }
  isAlreadyExists(field: string, name: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  getDataById(data: any): Observable<SystemConfigurationModel> {
    return this.http.post('trans/sysConfig/searchSysConfig', data).pipe(
      map((result: any) => {
        if (result && result.data && result.data.length > 0) {
          return result.data[0];
        }
        return new SystemConfigurationModel();
      })
    );
  }
  public getAllData<SystemConfigurationModel>(
    sortFilterData: any
  ): Observable<BaseListModel<SystemConfigurationModel>> {
    const records: BaseListModel<SystemConfigurationModel> =
      new BaseListModel<SystemConfigurationModel>();
    return this.http
      .post('trans/sysConfig/searchSysConfig', sortFilterData)
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
