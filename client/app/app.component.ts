import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from 'angular2/core';
import {OnInit} from "angular2/core";


@Component({
    selector: 'my-app',
    changeDetection: ChangeDetectionStrategy.Detached,
    template: `Data from server : {{message}}`
})
export class AppComponent implements  OnInit {
    private EVENT_URL = 'http://localhost:8000/events';


    constructor(private changeDetector: ChangeDetectorRef) {
        this.message = '0';
    }

    ngOnInit() {
        // creates event object
        this.ws = new EventSource(this.EVENT_URL, { withCredentials: true });

        // listing to server messages
        this.ws.onmessage = (evt) => {
            this.message = evt.data;
            console.log(`message from server : ${evt.data}`);
        };

        // manually detect changes
        setInterval(() => {
            this.changeDetector.markForCheck();
        }, 300);
    }
}
