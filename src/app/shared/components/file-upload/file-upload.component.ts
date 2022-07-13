import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  forwardRef,
  AfterViewInit,
} from '@angular/core';
import * as _ from 'lodash';
import { FileUpload, DownloadAttachmentModel } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AttachmentService } from '../../services';

export const CUSTOM_FILE_UPLOAD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => FileUploadComponent),
  multi: true,
};

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [CUSTOM_FILE_UPLOAD_CONTROL_VALUE_ACCESSOR],
})
export class FileUploadComponent
  implements OnInit, ControlValueAccessor, AfterViewInit
{
  @Input() fileExtensions: string[] = [];
  @Input() dragAndDrop = false;
  @Input() multiple = false;
  @Input() showFiles = false;
  @Input() downloadFiles = false;
  @Input() uploadStatus = false;
  @Input() buttonText = 'Label.SelectFile';
  @Input() fileUploadId = '';
  @Input() limitCount = -1;
  @Input() limitTotalSize = -1;
  disabled = false;

  @Output() fileImported = new EventEmitter<any>();
  @Output() filesModified = new EventEmitter<any>();

  _files: FileUpload[] = [];
  @Input()
  public set files(_value: FileUpload[]) {
    this._files = _value;
  }

  public get files(): FileUpload[] {
    return this._files;
  }

  @ViewChild('fileInput')
  fileInput!: { nativeElement: { accept: string } };

  constructor(private _apiService: AttachmentService) {}

  // tslint:disable-next-line:no-shadowed-variable
  propagateChange = (_: any) => {};
  onChanged = () => {};

  writeValue(obj: any[]): void {
    this._files = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onChanged = fn;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.fileInput.nativeElement.accept =
      '.' + this.fileExtensions.toString().replace(/,/g, ',.');
  }

  onFileChanged(files: FileList) {
    if (this._files.length > 0 && !this.multiple) {
      this._files.splice(0);
    }
    // Prevalidation to check if "already uploaded files (_files) + currently selected files (files)" is greater than the upload limit.
    // Show alert and return false if the above check passes as we should not exceed the limit.
    if (
      this.limitCount > 0 &&
      this._files.length + files.length > this.limitCount
    ) {
      //TODO: FileUploadExceedLimitCount
      return false;
    }
    if (this.limitTotalSize > 0) {
      let totalSizeKB = 0;
      this._files.forEach((file) => {
        totalSizeKB += file && file.file ? file.file.size : 0;
      });
      totalSizeKB += files[0].size;
      const totalSizeMB = totalSizeKB / (1024 * 1024);
      if (totalSizeMB > this.limitTotalSize) {
        //TODO: FileUploadExceedLimitSize
        return false;
      }
    }

    let hasInvalidFileTypes = false;
    Array.from(files).forEach((file) => {
      const exist = _.find(this._files, (x: { name: string }) => {
        return x.name === file.name;
      });

      if (!exist) {
        if (this.checkForValidExtension(file)) {
          this._files.push(new FileUpload(file, true));

          let warningMessage;

          if (this.limitCount > 0) {
            warningMessage = `Number of files allowed to upload remaining is: ${
              this.limitCount - this._files.length
            }`;
          }

          if (this.limitTotalSize > 0) {
            let totalSizeKB = 0;
            this._files.forEach((f) => {
              totalSizeKB += f && f.file ? f.file.size : 0;
            });

            const totalSizeMB = totalSizeKB / (1024 * 1024);

            warningMessage += `,`;

            warningMessage += `File size remaining for upload: ${(
              this.limitTotalSize - totalSizeMB
            ).toFixed(5)}MB`;
          }

          if (warningMessage) {
            //TODO: Show warning message
          }
        } else {
          hasInvalidFileTypes = true;
          this._files.push(new FileUpload(file));
        }
      } else {
        setTimeout(() => {
          //TODO: Check if file exists message
        }, 100);
      }
    });

    if (hasInvalidFileTypes) {
      //TODO: Invalid file type error message
    }

    if (this.fileImported.observers.length > 0) {
      this.fileImported.emit(this._files.filter((x) => x.isValid === true));
    } else {
      this.uploadFile(this._files);
    }

    this.propagateChange(this._files);

    this.onChanged();
    return true;
  }

  onFileDropped(event: any) {
    this.onFileChanged(event);
  }

  checkForValidExtension(file: File) {
    const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);

    if (
      this.fileExtensions.includes('*') ||
      this.fileExtensions.includes(fileExtension.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  }

  uploadFile(files: FileUpload[]) {
    if (this.fileUploadId !== '') {
      files.forEach((file) => {
        if (!file.status && file.isValid) {
          const formData = new FormData();
          const uploadFile: any = file.file;
          formData.append('file', uploadFile);
          file.progress = 1;
          this._apiService.uploadFile(formData).subscribe(
            (res: any) => {
              file.status = true;
              file.progress = 0;
              file.filePath = res.name;
              file.name = uploadFile.name;
            },

            (err: any) => {
              file.status = false;
              file.progress = 0;
            }
          );
        }
      });
    } else {
      this._files = [];
      //TODO Error for file upload id
    }
  }

  removeFile(fileIndex: number) {
    this._files.splice(fileIndex, 1);
    if (this.filesModified.observers.length > 0) {
      this.filesModified.emit(this._files.filter((x) => x.isValid === true));
    }
    this.propagateChange(this._files);
    this.onChanged();
  }

  downloadFile(id?: number, filePath?: string, fileName?: string) {
    const attachment = {
      id: id,
      savePath: filePath,
      name: fileName,
    }  as DownloadAttachmentModel;

    this._apiService.downloadFile(attachment).subscribe(
      (res: BlobPart) => {
        const blob = new Blob([res], { type: 'application/octet-stream' });
        const fileNameFromResponse =
          this._apiService.getFileNameFromHttpResponse(res);
        saveAs(
          blob,
          fileNameFromResponse !== '' ? fileNameFromResponse : fileName
        );
      },
      (err: any) => {}
    );
  }

  downloadAllFiles() {
    if (this.files.length > 0) {
      const attachments: DownloadAttachmentModel[] = [];
      this.files.forEach((file) => {
        if (file.name !== '' && file.filePath !== '') {
          attachments.push({
              id: file.id,
              savePath: file.filePath,
              name: file.name,
            } as unknown as DownloadAttachmentModel);
        }
      });

      if (attachments.length > 0) {
        if (attachments.length === 1) {
          this.downloadFile(
            attachments[0].id,
            attachments[0].savePath,
            attachments[0].name
          );
        } else {
          this._apiService.downloadFiles(attachments).subscribe(
            (res: BlobPart) => {
              const blob = new Blob([res], {
                type: 'application/octet-stream',
              });
              const fileNameFromResponse =
                this._apiService.getFileNameFromHttpResponse(res);
              saveAs(
                blob,
                fileNameFromResponse !== ''
                  ? fileNameFromResponse
                  : 'Downloads.zip'
              );
            },
            (err: any) => {}
          );
        }
      }
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
