import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  public videosrc;
  public videoShow = false;

  constructor(private sanitizer:DomSanitizer, private element:ElementRef, private ngZone: NgZone) { }

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
