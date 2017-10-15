import { Component, OnInit, ElementRef, NgZone, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, DialogPosition } from '@angular/material';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  public videosrc;
  public videoShow = false;
  public totalPrice: number = 9.5;
  public items: Array<any> = [];

  constructor(private sanitizer:DomSanitizer, private element:ElementRef, private ngZone: NgZone, private db: AngularFireDatabase, public dialog: MatDialog) {
    db.object('item').valueChanges().subscribe((value) => {
      if (value === 'milk') {
        this.items.push({
          description: 'Milk 365',
          price: 1.2
        });
        this.totalPrice += 1.2;
      } else if (value === 'coke') {
        let config: MatDialogConfig = new MatDialogConfig();
        config.width = '250px';
        // config.position = {
        //   top: '20px',
        //   left: '10px',
        //   right: '10px'
        // };
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, config);
        dialogRef.afterClosed().subscribe(result => {
          this.items.unshift({
            description: 'Coke Zero',
            price: 2.3
          });
          this.totalPrice += 2.3;
        });
      }
    })
  }

  ngOnInit() {
    this.getDevices();
  }

  private getDevices() {
    let nav = <any>navigator;
    nav.mediaDevices.enumerateDevices().then((devices) => {
      let videoStreams: Array<any> = devices.filter((device) => device.kind === 'videoinput');
      this.showCam(videoStreams.pop());
    })
  }

  private createObjectURL(object) {
    return (window.URL) ? window.URL.createObjectURL(object) : window['webkitURL'].createObjectURL(object);
  }

  private showCam(videoStream) {
    // 1. Casting necessary because TypeScript doesn't
    // know object Type 'navigator';
    let nav = <any>navigator;

    // 2. Adjust for all browsers
    nav.getUserMedia = nav.getUserMedia || nav.mozGetUserMedia || nav.webkitGetUserMedia;

    // 3. Trigger lifecycle tick (ugly, but works - see (better) Promise example below)
    //setTimeout(() => { }, 100);

    // 4. Get stream from webcam
    let constraints = {
      audio: false,
      video: {
        optional: [{
          sourceId: videoStream.deviceId
        }]
      }
    };
    nav.getUserMedia(
      constraints,
      (stream) => {
        let webcamUrl = this.createObjectURL(stream);

        // 4a. Tell Angular the stream comes from a trusted source
        this.ngZone.run(() => {
          this.videosrc = this.sanitizer.bypassSecurityTrustUrl(webcamUrl);
          this.videoShow = true;
        })


        // 4b. Start video element to stream automatically from webcam.
        //this.element.nativeElement.querySelector('video').autoplay = true;
      },
      (err) => console.log(err));
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClick(): void {
    this.dialogRef.close();
  }

}
