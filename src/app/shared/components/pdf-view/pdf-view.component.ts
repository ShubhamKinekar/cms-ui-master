import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css'],
})
export class PdfViewComponent implements OnInit, OnChanges {
  controllerSrc: any;

  @Input() fileUpload1 = '';

  @Input() fileUpload2 = '';

  @Input() fileUpload3 = '';

  //baseFilePath = 'http://10.0.0.9:8080/';
  baseFilePath = environment.pdfFilePath;

  safeUrl1: SafeResourceUrl | null = null;
  safeUrl2: SafeResourceUrl | null = null;
  safeUrl3: SafeResourceUrl | null = null;
  constructor(private sanitizer: DomSanitizer) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.fileUpload1 && changes.fileUpload1.currentValue) {
      this.safeUrl1 = this.getSafeUrl(changes.fileUpload1.currentValue);
    }
    if (changes && changes.fileUpload2 && changes.fileUpload2.currentValue) {
      this.safeUrl2 = this.getSafeUrl(changes.fileUpload2.currentValue);
    }
    if (changes && changes.fileUpload3 && changes.fileUpload3.currentValue) {
      this.safeUrl3 = this.getSafeUrl(changes.fileUpload3.currentValue);
    }
  }

  ngOnInit(): void {}

  getSafeUrl(fileName: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.baseFilePath + fileName
    );
  }

  openLink(fileName: string) {
    window.open(this.baseFilePath + fileName);
  }
}
