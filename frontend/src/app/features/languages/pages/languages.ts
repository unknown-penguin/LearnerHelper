import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../dictionary/services/language.service';
import { DictionaryStateService } from '../../dictionary/services/dictionary-state.service';
import { Language } from '../../dictionary/models/language.model';
import { BaseModalForm } from '../../../core/utils/base-modal-form';
import { FormConfigFactory, FormDefaultValues, LanguageFormValue } from '../../../core/utils/form-config.factory';
import { DataTableComponent, TableColumn } from '../../../core/components/data-table/data-table';
import { provideTranslocoScope, TranslocoDirective, TranslocoService } from '@jsverse/transloco';


@Component({
  selector: 'app-languages',
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, TranslocoDirective],
  providers: [provideTranslocoScope('languages')],
  templateUrl: './languages.html',
})
export class Languages extends BaseModalForm<Language, LanguageFormValue> {
  readonly languageService = inject(LanguageService);
  readonly dictionaryState = inject(DictionaryStateService);
  private readonly formFactory = inject(FormConfigFactory);
  private readonly translocoService = inject(TranslocoService);

  readonly editingLanguage = this.editingItem;

  get columns(): TableColumn<Language>[] {
    return [
      { 
        field: 'name', 
        label: this.translocoService.translate('languages.columns.name'), 
        width: '60%',
        cellClass: 'text-base font-semibold text-surface-100'
      },
      { 
        field: 'code', 
        label: this.translocoService.translate('languages.columns.code'), 
        width: '40%',
        format: (row) => `<span class="inline-flex items-center rounded bg-primary-900/70 px-2.5 py-1 text-[11px] font-semibold text-primary-100 ring-1 ring-primary-600/40">${row.code}</span>`
      },
    ];
  }

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
      return this.translocoService.translate('languages.deleteConflict', {
        count: dictionariesWithLanguage.length,
        names: dictionariesWithLanguage.map(d => d.name).join(', ')
      });
    }

    return null;
  }

  protected override async create(values: LanguageFormValue): Promise<Language> {
    return this.languageService.create(values);
  }

  protected override async update(id: string, values: LanguageFormValue): Promise<Language> {
    return this.languageService.update(id, values);
  }

  protected override async delete(id: string): Promise<void> {
    return this.languageService.delete(id);
  }
}
