import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-test',
    template: `
        <p>
            test works!
        </p>
    `,
    styles: []
})
export class TestComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
        if (typeof Worker !== 'undefined') {
            // Create a new
            const worker = new Worker('./test.worker', {type: 'module'});
            worker.onmessage = ({data}) => {
                console.log(`page got message: ${data}`);
            };
            worker.postMessage('hello');
        } else {
            // Web Workers are not supported in this environment.
            // You should add a fallback so that your program still executes correctly.
        }
    }

}

