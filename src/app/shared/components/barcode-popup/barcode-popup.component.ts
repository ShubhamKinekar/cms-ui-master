import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-barcode-popup',
  templateUrl: './barcode-popup.component.html',
  styleUrls: ['./barcode-popup.component.css']
})
export class BarcodePopupComponent  {
  @Input() isVisibledata:boolean = false;
  openDialog() {
    throw new Error('Method not implemented.');
  }
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<BarcodePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }


  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}