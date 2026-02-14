import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DictionaryStateService } from '../../dictionary/services/dictionary-state.service';
import { LanguageService } from '../../dictionary/services/language.service';
import { Dictionary } from '../../dictionary/models/dictionary.model';
import { BaseModalForm } from '../../../core/utils/base-modal-form';
import { FormConfigFactory, FormDefaultValues, DictionaryFormValue } from '../../../core/utils/form-config.factory';
import { findNameById } from '../../../core/utils/lookup.util';


@Component({
  selector: 'app-manage-dictionaries',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-dictionaries.html',
})
export class ManageDictionaries extends BaseModalForm<Dictionary, DictionaryFormValue> {
  readonly dictionaryState = inject(DictionaryStateService);
  readonly languageService = inject(LanguageService);
  private readonly formFactory = inject(FormConfigFactory);

  readonly editingDictionary = this.editingItem;

  protected form: FormGroup<{
    name: FormControl<string>;
    languageId: FormControl<string>;
  }>;

  constructor() {
    super();
    this.form = this.formFactory.createDictionaryForm();
  }

  protected override getDefaultFormValues(): DictionaryFormValue {
    return FormDefaultValues.dictionary();
  }

  protected override mapEntityToFormValues(dictionary: Dictionary): DictionaryFormValue {
    return { name: dictionary.name, languageId: dictionary.languageId };
  }

  protected override getEntityId(dictionary: Dictionary): string {
    return dictionary.id;
  }

  protected override async create(values: DictionaryFormValue): Promise<Dictionary> {
    return this.dictionaryState.createDictionary(values);
  }

  protected override async update(id: string, values: DictionaryFormValue): Promise<Dictionary> {
    return this.dictionaryState.updateDictionary(id, values);
  }

  protected override async delete(id: string): Promise<void> {
    return this.dictionaryState.deleteDictionary(id);
  }

  getLanguageName(languageId: string): string {
    return findNameById(this.languageService.allLanguages(), languageId);
  }
}
