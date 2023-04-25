# 关于ngx-simple-uploader

ngx-simple-uploader是一个上传库，支持多并发上传，文件夹、拖拽、可暂停继续、秒传、分块上传、出错自动重传、手工重传、进度、剩余时间、上传速度等特性；该上传库依赖 HTML5 File API。

# 安装
```sh
# 依赖ts-md5
npm i ts-md5
# 安装ngx-simple-uploader
npm i ngx-simple-uploader
```
# 使用

```typescript
// 到使用的Module里面引入ngx-simple-uploader
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

    // 这个必须是空的，传参不会有任何变化
    public fileList: Array<any> = [];
    // 上传组件配置，可选，有默认值
    public options = {};
    // 上传组件
    @ViewChild('ngxSimpleUploader') ngxSimpleUploader: any;

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        // this.ngxSimpleUploader.uploadAll();
    }
}
```
