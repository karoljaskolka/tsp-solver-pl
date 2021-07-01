import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tsp-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true }
  ]
})
export class SelectComponent implements ControlValueAccessor {

  value: string | number | null;

  @Input() label: string;
  @Input() disabled = false;

  constructor(private cdRef: ChangeDetectorRef) { }

  _onChange = (obj: any) => {};
  _onTouch = () => {};

  writeValue(obj: any): void {
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === null) {
			this.value = obj;
      this.cdRef.markForCheck();
		}
  }

  onChange(value): void {
    this.value = value;
    this._onChange(this.value);
    this.cdRef.markForCheck();
  }

  onTouch(): void {
    this._onTouch();
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
