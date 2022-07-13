import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent  {
  message: string = ""
  cancelButtonText: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      if (data) {
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
      //this.dialogRef.updateSize('10000vw', '10000vw',);
      
    
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
