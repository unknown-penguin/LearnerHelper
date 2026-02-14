import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../dictionary/services/language.service';
import { Language } from '../../dictionary/models/language.model';

@Component({
  selector: 'app-languages',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './languages.html',
})
export class Languages {
  readonly languageService = inject(LanguageService);
  private readonly fb = inject(FormBuilder);

  isFormOpen = signal(false);
  editingLanguage = signal<Language | null>(null);

  form: FormGroup<{
    name: FormControl<string>;
    code: FormControl<string>;
  }>;

  constructor() {
    this.form = this.fb.nonNullable.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.maxLength(5)]],
    });
  }

  openCreateForm(): void {
    this.editingLanguage.set(null);
    this.form.reset({ name: '', code: '' });
    this.isFormOpen.set(true);
  }

  openEditForm(language: Language): void {
    this.editingLanguage.set(language);
    this.form.reset({ name: language.name, code: language.code });
    this.isFormOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.editingLanguage.set(null);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    const editing = this.editingLanguage();

    try {
      if (editing) {
        await this.languageService.updateLanguage(editing.id, values);
      } else {
        await this.languageService.createLanguage(values);
      }
      this.closeForm();
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }

  async onDelete(language: Language): Promise<void> {
    try {
      await this.languageService.deleteLanguage(language.id);
    } catch (error) {
      console.error('Error deleting language:', error);
    }
  }
}
