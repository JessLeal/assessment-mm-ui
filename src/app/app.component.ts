import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Output() newLoadingEvent = new EventEmitter<boolean>();

  setLoading(value: boolean) {
    this.newLoadingEvent.emit(value);
  }
}
