import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    constructor() {
    }
}
