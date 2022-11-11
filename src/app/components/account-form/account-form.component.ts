import { TITLE_OPTIONS } from '../../constants/titleConstants';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AccountTitle } from 'src/app/types/Account';

@Component({
  selector: 'moneyme-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  @Input() parentForm: FormGroup;

  titleOptions: AccountTitle[] = TITLE_OPTIONS;

  constructor() {}

  ngOnInit(): void {}
}
