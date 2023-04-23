import {NgModule} from '@angular/core';
import {NgxSimpleUploaderComponent} from './ngx-simple-uploader.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [NgxSimpleUploaderComponent],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [NgxSimpleUploaderComponent]
})
export class NgxSimpleUploaderModule {
}
