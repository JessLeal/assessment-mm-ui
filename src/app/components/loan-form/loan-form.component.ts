import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { Product } from 'src/app/types/Product';

@Component({
  selector: 'moneyme-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
})
export class LoanFormComponent implements OnInit {
  @Input() parentForm: FormGroup;
  //Amount slider variables
  amountSliderPosition: String = '0px';
  amountMax: number = 15000;
  amountMin: number = 2100;
  amountStep: number = 100;

  //Term slider variables
  termSliderPosition: String = '0px';
  termMax: number = 60;
  termMin: number = 1;
  termStep: number = 1;

  //Product variables
  productOptions: Product[] = [];

  constructor() {
    this.productOptions = [
      { id: 1, value: 'ProductA', name: 'Product A' },
      { id: 2, value: 'ProductB', name: 'Product B' },
      { id: 3, value: 'ProductC', name: 'Product C' },
    ];
  }

  ngOnInit(): void {
    this.amountSliderPosition = this.getNewSliderPosition(
      this.parentForm.value.amount,
      this.amountMax,
      this.amountMin
    );

    this.termSliderPosition = this.getNewSliderPosition(
      this.parentForm.value.term,
      this.termMax,
      this.termMin
    );

    this.parentForm.get('term')?.valueChanges.subscribe((newTerm) => {
      this.termSliderPosition = this.getNewSliderPosition(
        newTerm,
        this.termMax,
        this.termMin
      );
    });

    this.parentForm.get('amount')?.valueChanges.subscribe((newAmount) => {
      this.amountSliderPosition = this.getNewSliderPosition(
        newAmount,
        this.amountMax,
        this.amountMin
      );
    });

    this.parentForm.get('product')?.valueChanges.subscribe((newProduct) => {
      if (!this.parentForm.value.term) return;

      switch (newProduct) {
        case 'ProductA':
          this.termMin = 1;

          this.termSliderPosition = this.getNewSliderPosition(
            this.parentForm.value.term,
            this.termMax,
            this.termMin
          );
          break;
        case 'ProductB':
          this.termMin = 6;

          const newTermValue =
            this.parentForm.value.term < this.termMin
              ? this.termMin
              : this.parentForm.value.term;

          this.parentForm.patchValue({
            term: newTermValue,
          });

          this.termSliderPosition = this.getNewSliderPosition(
            newTermValue,
            this.termMax,
            this.termMin
          );

          break;
        case 'ProductC':
          this.termMin = 1;

          this.termSliderPosition = this.getNewSliderPosition(
            this.parentForm.value.term,
            this.termMax,
            this.termMin
          );
          break;
        default:
          break;
      }
    });
  }

  getNewSliderPosition(currentVal: number, max: number, min: number): string {
    const newValue = Number(((currentVal - min) * 100) / (max - min));

    const newPosition = 10 - newValue * 0.2;

    return `calc(${newValue}% + (${newPosition}px))`;
  }
}
