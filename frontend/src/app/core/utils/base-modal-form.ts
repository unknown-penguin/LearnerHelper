import { signal, Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class BaseModalForm<TEntity, TFormValue = any> {
  readonly isFormOpen = signal(false);
  readonly editingItem = signal<TEntity | null>(null);
  readonly errorMessage = signal<string | null>(null);

  protected abstract form: FormGroup;

  openCreateForm(): void {
    this.editingItem.set(null);
    this.form.reset(this.getDefaultFormValues());
    this.isFormOpen.set(true);
  }

  openEditForm(item: TEntity): void {
    this.editingItem.set(item);
    this.form.reset(this.mapEntityToFormValues(item));
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.editingItem.set(null);
    this.errorMessage.set(null);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    const editing = this.editingItem();

    try {
      if (editing) {
        await this.update(this.getEntityId(editing), values);
      } else {
        await this.create(values);
      }
      this.closeForm();
    } catch (error) {
      this.handleError('Error saving item', error);
    }
  }

  async onDelete(item: TEntity): Promise<void> {
    const validationError = this.validateDelete(item);
    if (validationError) {
      this.errorMessage.set(validationError);
      return;
    }

    try {
      await this.delete(this.getEntityId(item));
      this.closeForm();
    } catch (error) {
      this.handleError('Error deleting item', error);
    }
  }

  protected abstract getDefaultFormValues(): TFormValue;

  protected abstract mapEntityToFormValues(item: TEntity): TFormValue;

  protected abstract getEntityId(item: TEntity): string;

  protected validateDelete(item: TEntity): string | null {
    return null;
  }

  protected abstract create(values: TFormValue): Promise<any>;

  protected abstract update(id: string, values: TFormValue): Promise<any>;

  protected abstract delete(id: string): Promise<void>;

  protected handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage.set(`${message}. Please try again.`);
  }
}
