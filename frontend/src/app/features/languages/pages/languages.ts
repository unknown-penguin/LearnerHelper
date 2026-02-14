import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../dictionary/services/language.service';
import { DictionaryStateService } from '../../dictionary/services/dictionary-state.service';
import { Language } from '../../dictionary/models/language.model';
import { BaseModalForm } from '../../../core/utils/base-modal-form';
import { FormConfigFactory, FormDefaultValues, LanguageFormValue } from '../../../core/utils/form-config.factory';


@Component({
  selector: 'app-languages',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './languages.html',
})
export class Languages extends BaseModalForm<Language, LanguageFormValue> {
  readonly languageService = inject(LanguageService);
  readonly dictionaryState = inject(DictionaryStateService);
  private readonly formFactory = inject(FormConfigFactory);

  readonly editingLanguage = this.editingItem;

  protected form: FormGroup<{
    name: FormControl<string>;
    code: FormControl<string>;
  }>;

  constructor() {
    super();
    this.form = this.formFactory.createLanguageForm();
  }

  protected override getDefaultFormValues(): LanguageFormValue {
    return FormDefaultValues.language();
  }

  protected override mapEntityToFormValues(language: Language): LanguageFormValue {
    return { name: language.name, code: language.code };
  }

  protected override getEntityId(language: Language): string {
    return language.id;
  }

  protected override validateDelete(language: Language): string | null {
    const dictionariesWithLanguage = this.dictionaryState.allDictionaries().filter(
      d => d.languageId === language.id
    );

    if (dictionariesWithLanguage.length > 0) {
      return `Cannot delete this language. It is used by ${dictionariesWithLanguage.length} dictionary(ies): ${dictionariesWithLanguage.map(d => d.name).join(', ')}`;
    }

    return null;
  }

  protected override async create(values: LanguageFormValue): Promise<Language> {
    return this.languageService.createLanguage(values);
  }

  protected override async update(id: string, values: LanguageFormValue): Promise<Language> {
    return this.languageService.updateLanguage(id, values);
  }

  protected override async delete(id: string): Promise<void> {
    return this.languageService.deleteLanguage(id);
  }
}
