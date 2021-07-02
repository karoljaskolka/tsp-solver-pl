import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'tsp-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonsComponent {
  @Output() solve = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();
  @Input() disabled: boolean = false;

  onSolve() {
    this.solve.emit();
  }

  onClear() {
    this.clear.emit();
  }
}
