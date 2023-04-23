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
    // 上传组件配置，可选
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



```shell
# https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md#%E9%85%8D%E7%BD%AE
# https://www.cnblogs.com/xiahj/p/vue-simple-uploader.html
# https://ng.ant.design/components/upload/zh

# 关于在库中web-worker
# https://github.com/angular/angular-cli/issues/15059
# 这个是我的提问
# https://stackoverflow.com/q/76061504/19731648
```

