import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DictionaryStateService } from '../../dictionary/services/dictionary-state.service';
import { LanguageService } from '../../dictionary/services/language.service';
import { Dictionary } from '../../dictionary/models/dictionary.model';

@Component({
  selector: 'app-manage-dictionaries',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-dictionaries.html',
})
export class ManageDictionaries {
  readonly dictionaryState = inject(DictionaryStateService);
  readonly languageService = inject(LanguageService);
  private readonly fb = inject(FormBuilder);

  isFormOpen = signal(false);
  editingDictionary = signal<Dictionary | null>(null);

  form: FormGroup<{
    name: FormControl<string>;
    languageId: FormControl<string>;
  }>;

  constructor() {
    this.form = this.fb.nonNullable.group({
      name: ['', Validators.required],
      languageId: ['', Validators.required],
    });
  }

  openCreateForm(): void {
    this.editingDictionary.set(null);
    this.form.reset({ name: '', languageId: '' });
    this.isFormOpen.set(true);
  }

  openEditForm(dict: Dictionary): void {
    this.editingDictionary.set(dict);
    this.form.reset({ name: dict.name, languageId: dict.languageId });
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.editingDictionary.set(null);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    const editing = this.editingDictionary();

    try {
      if (editing) {
        await this.dictionaryState.updateDictionary(editing.id, values);
      } else {
        await this.dictionaryState.createDictionary(values);
      }
      this.closeForm();
    } catch (error) {
      console.error('Error saving dictionary:', error);
    }
  }

  async onDelete(dict: Dictionary): Promise<void> {
    try {
      await this.dictionaryState.deleteDictionary(dict.id);
    } catch (error) {
      console.error('Error deleting dictionary:', error);
    }
  }

  getLanguageName(languageId: string): string {
    const lang = this.languageService.allLanguages().find(l => l.id === languageId);
    return lang?.name ?? '—';
  }
}
