import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxSimpleUploaderModule} from 'ngx-simple-uploader';
import {IndexComponent} from './pages/index/index.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxSimpleUploaderModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
