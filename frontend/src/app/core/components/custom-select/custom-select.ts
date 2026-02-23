import {
  Component,
  Input,
  forwardRef,
  signal,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-custom-select',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelect),
      multi: true,
    },
  ],
  templateUrl: './custom-select.html',
})
export class CustomSelect implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Select an option';
  @Input() showPlaceholderOption = false;

  private readonly el = inject(ElementRef);

  readonly isOpen = signal(false);
  value: string = '';
  isDisabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  selectedLabel(): string {
    return this.options.find((o) => o.value === this.value)?.label ?? '';
  }

  toggleOpen(): void {
    if (!this.isDisabled) {
      this.isOpen.update((v) => !v);
      this.onTouched();
    }
  }

  selectOption(option: SelectOption): void {
    this.value = option.value;
    this.onChange(this.value);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
