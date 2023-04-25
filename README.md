# Under development, please do not use...

# About ngx-simple-uploader

ngx-simple-uploader is an upload library that supports multiple concurrent uploads, folders, drag and drop, pausing and continuing, second transmission, block upload, error automatic retransmission, manual retransmission, progress, remaining time, upload speed and other features ; The upload library relies on the HTML5 File API.

# Install
```sh
npm i ngx-simple-uploader
yarn add ngx-simple-uploader
```
# use

```typescript
// Introduce ngx-simple-uploader into the used Module
import {NgxSimpleUploaderModule} from 'ngx-simple-uploader';
@NgModule({
    // ...
    imports: [
        // ...
        NgxSimpleUploaderModule
    ],
    // ...
})
export class AppModule {
}
```

```html
<ngx-simple-uploader #ngxSimpleUploader [options]="options"></ngx-simple-uploader>
```

```typescript
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    constructor() {}

    // This must be empty, there will be no change in passing parameters
    public fileList: Array<any> = [];
    // Upload component configuration, optional
    public options = {};
    // upload component
    @ViewChild('ngxSimpleUploader') ngxSimpleUploader: any;

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        // this.ngxSimpleUploader.uploadAll();
    }
}
```
