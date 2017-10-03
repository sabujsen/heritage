import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { GrobalDataService } from './../../shared/grobal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Component, OnInit } from '@angular/core';
import Utils from 'app/shared/utility';
@Component({
  selector: 'app-step-5',
  templateUrl: './step-5.component.html',
  styleUrls: ['./step-5.component.css']
})
export class Step5Component implements OnInit {
  returnStrings: ReturnString[] = [];
  uploadedFilesCount: number = 0;
  returnStringsChanged = new Subject<ReturnString[]>();
  subscription: Subscription;
  uploadedImages: ReturnString[];
  uploadStatus: boolean = false;

  constructor(private http: Http, private router: Router, private route: ActivatedRoute, private gd: GrobalDataService, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.subscription = this.returnStringsChanged
      .subscribe(
      (returnString: ReturnString[]) => {
        this.uploadedImages = returnString;
        this.uploadStatus = false;
        this.openSnackBar(returnString.length + " Images Upload.", "Done: Wait for 2 seconds.");
      });
  }

  fileChanged(e: Event) {
    var target: HTMLInputElement = e.target as HTMLInputElement;
    this.uploadedFilesCount = target.files.length;
    this.uploadStatus = true;
    for (var i = 0; i < target.files.length; i++) {
      this.upload(target.files[i]);
    }
  }
  upload(img: File) {
    var formData: FormData = new FormData();
    formData.append("file", img, img.name);
    let uploadAPI: string = Utils.UploadUrl();
    this.http.post(uploadAPI, formData)
      .map(
      (response: Response) => {
        return response.json();
      })
      .subscribe(
      (param: ReturnString) => {
        this.returnStrings.push(param);
        if (this.returnStrings.length === this.uploadedFilesCount) {
          this.returnStringsChanged.next(this.returnStrings.slice());
        }
      });

    /*
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
      //You can handle progress events here if you want to track upload progress (I used an observable<number> to fire back updates to whomever called this upload)
    });
    xhr.open("POST", "http://kuhook.com/api/upload.php", true);
    xhr.send(formData);

    */
  }
  onNextStepComplete() {
    this.gd.shareObj['savedimages'] = this.returnStrings;
    this.router.navigate(['step-complete']);
  }
  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.gd.shareObj['savedimages'] = this.returnStrings;
      this.router.navigate(['step-complete']);
    });
  }
}
export class ReturnString {
  constructor(
    public status: boolean,
    public originalName: string,
    public generatedName: string
  ) { }
}