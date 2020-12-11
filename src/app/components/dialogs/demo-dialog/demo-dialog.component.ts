import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-demo-dialog',
  templateUrl: './demo-dialog.component.html',
  styleUrls: ['./demo-dialog.component.css']
})
export class DemoDialogComponent implements OnInit {

  constructor(public thisDialogRef:MatDialogRef<DemoDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:string) { }

  ngOnInit(): void {
  }

  onCloseConfirm(){
    this.thisDialogRef.close('Confirm');
  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }
}
