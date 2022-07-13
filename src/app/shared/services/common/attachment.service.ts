import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IRequestOptions, WebHttpClient } from '../WebHttpClient';

import { BaseModel, DownloadAttachmentModel } from '../../models';
import { Reflection } from '../../reflection/reflection';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {

  constructor(private http: WebHttpClient) {}

  uploadFile(request: FormData): Observable<string | null> {
    let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options: any = { headers: headers };
    return this.http
      .post(
        'trans/caseInitiation/upload',
        request,
        options
      )
      .pipe(
        map((result: any) => {
          if (result && result.data) {
            return result.data as string;
          }
          return null;
        })
      );
  }
  downloadFile(attachment: DownloadAttachmentModel): Observable<Blob> {
    const url = '';

    const options: IRequestOptions = {
      responseType: 'blob',
    };

    return this.http.post<Blob>(url, attachment, options).pipe(
      map((result) => {
        return result;
      })
    );
  }

  downloadFiles(attachments: DownloadAttachmentModel[]): Observable<Blob> {
    const url = '';
    const options: IRequestOptions = {
      responseType: 'blob',
    };
    return this.http.post<Blob>(url, attachments, options).pipe(
      map((result) => {
        return result;
      })
    );
  }

  deleteTempFolder(folder: string): any {
    const url = '';
    const param = { folder: folder };

    return this.http.post<any>(url, param).subscribe((res) => {
      return res;
    });
  }

  getFileNameFromHttpResponse(httpResponse: any): string {
    try {
      const contentDispositionHeader = httpResponse.headers.get(
        'Content-Disposition'
      );

      const result = contentDispositionHeader
        .split(';')[1]
        .trim()
        .split('=')[1];

      return result.replace(/"/g, '');
    } catch (err) {
      return '';
    }
  }
}
