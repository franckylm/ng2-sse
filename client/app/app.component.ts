import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
    <h1>Hello World {{ title }}</h1>
    <p [textContent]="title"></p>
    `
})
export class AppComponent {
    public title = '';

    constructor() {
        var source = new EventSource('http://localhost:8000/events', { withCredentials: true });
        source.onmessage = this.updateComponent;
    }

    updateComponent(e) {
        this.title = e.data;
        console.log(e.data);
    }

}
