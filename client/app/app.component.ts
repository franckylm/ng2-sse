import {Component, OnInit, ChangeDetectorRef} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `Data from server : {{message}}`
})
export class AppComponent implements  OnInit {

    private EVENT_URL = 'http://localhost:8000/events';
    private message: string = '0';

    constructor (private changeDetector: ChangeDetectorRef) {

    }

    ngOnInit() {
        // creates event object
        this.ws = new EventSource(this.EVENT_URL, { withCredentials: true });

        // listing to server messages
        this.ws.onmessage = (evt) => {
            this.logServerMessage(evt.data);

            // update the model
            this.message = evt.data;

            // manually detect changes
            this.changeDetector.detectChanges();
        };
    }

    logServerMessage (data) {
        console.log(`message from server : ${data}`);
    }
}
