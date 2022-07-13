import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataService } from 'src/app/shared/base/base-service/base-data.service';
import {
  BaseModel,
  BaseListModel,
  CaseInitiationModel,
  SortFilterModel,
  LovModel,
} from 'src/app/shared/models';
import { LOV } from '../../enums';
import { WebHttpClient } from '../WebHttpClient';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: WebHttpClient) {
  }
  getDashboardData(userId: number): Observable<any> {
    let records: any = {};
    return this.http.get('trans/dashboard/getDashboard?userId=' + userId)
      .pipe(
        map((result: any) => {
          if (result && result.code && result.code == 200) {
            records = result.data.dashDetails;
          }
          return records;
        })
      );
  }

  getDashboardmsg() {
    return this.http.get('trans/sysConfig/getSysConfig/RELEASEBUILD');
  }

}
