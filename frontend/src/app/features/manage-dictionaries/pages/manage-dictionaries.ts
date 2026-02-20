import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DictionaryStateService } from '../../dictionary/services/dictionary-state.service';
import { LanguageService } from '../../dictionary/services/language.service';
import { Dictionary } from '../../dictionary/models/dictionary.model';
import { BaseModalForm } from '../../../core/utils/base-modal-form';
import { FormConfigFactory, FormDefaultValues, DictionaryFormValue } from '../../../core/utils/form-config.factory';
import { findNameById } from '../../../core/utils/lookup.util';
import { DataTableComponent, TableColumn } from '../../../core/components/data-table/data-table';


@Component({
  selector: 'app-manage-dictionaries',
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent],
  templateUrl: './manage-dictionaries.html',
})
export class ManageDictionaries extends BaseModalForm<Dictionary, DictionaryFormValue> {
  readonly dictionaryState = inject(DictionaryStateService);
  readonly languageService = inject(LanguageService);
  private readonly formFactory = inject(FormConfigFactory);

  readonly editingDictionary = this.editingItem;

  readonly columns: TableColumn<Dictionary>[] = [
    { 
      field: 'name', 
      label: 'Name', 
      width: '35%',
      cellClass: 'text-base font-semibold text-surface-100'
    },
    { 
      field: 'languageId', 
      label: 'Language', 
      width: '25%',
      format: (row) => {
        const langName = this.getLanguageName(row.languageId);
        return `<span class="inline-flex items-center rounded bg-primary-900/70 px-2.5 py-1 text-[11px] font-semibold text-primary-100 ring-1 ring-primary-600/40">${langName}</span>`;
      }
    },
    { 
      field: '_count', 
      label: 'Words', 
      width: '40%',
      cellClass: 'text-surface-300',
      format: (row) => String(row._count?.words ?? 0)
    },
  ];

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
    return findNameById(this.languageService.all(), languageId);
  }
}
