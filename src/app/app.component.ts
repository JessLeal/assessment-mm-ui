import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './node-modules/ngx-toastr/toastr.css'],
})
export class AppComponent {
  @Output() newLoadingEvent = new EventEmitter<boolean>();

  setLoading(value: boolean) {
    this.newLoadingEvent.emit(value);
  }
}
