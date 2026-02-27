import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DictionaryStateService } from '../../dictionary/services/dictionary-state.service';
import { LanguageService } from '../../dictionary/services/language.service';
import { Dictionary } from '../../dictionary/models/dictionary.model';
import { BaseModalForm } from '../../../core/utils/base-modal-form';
import { FormConfigFactory, FormDefaultValues, DictionaryFormValue } from '../../../core/utils/form-config.factory';
import { findNameById } from '../../../core/utils/lookup.util';
import { DataTableComponent, TableColumn } from '../../../core/components/data-table/data-table';
import { CustomSelect, SelectOption } from '../../../core/components/custom-select/custom-select';
import { provideTranslocoScope, TranslocoDirective, TranslocoService } from '@jsverse/transloco';


@Component({
  selector: 'app-manage-dictionaries',
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, CustomSelect, TranslocoDirective],
  providers: [provideTranslocoScope('manage-dictionaries')],
  templateUrl: './manage-dictionaries.html',
})
export class ManageDictionaries extends BaseModalForm<Dictionary, DictionaryFormValue> implements OnInit {
  readonly dictionaryState = inject(DictionaryStateService);
  readonly languageService = inject(LanguageService);
  private readonly formFactory = inject(FormConfigFactory);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly translocoService = inject(TranslocoService);

  readonly editingDictionary = this.editingItem;

  get languageOptions(): SelectOption[] {
    return this.languageService.all().map((l) => ({ value: l.id, label: `${l.name} (${l.code})` }));
  }

  get columns(): TableColumn<Dictionary>[] {
    return [
      { 
        field: 'name', 
        label: this.translocoService.translate('manageDictionaries.columns.name'), 
        width: '35%',
        cellClass: 'text-base font-semibold text-surface-100'
      },
      { 
        field: 'languageId', 
        label: this.translocoService.translate('manageDictionaries.columns.language'), 
        width: '25%',
        format: (row) => {
          const langName = this.getLanguageName(row.languageId);
          return `<span class="inline-flex items-center rounded bg-primary-900/70 px-2.5 py-1 text-[11px] font-semibold text-primary-100 ring-1 ring-primary-600/40">${langName}</span>`;
        }
      },
      { 
        field: 'wordCount', 
        label: this.translocoService.translate('manageDictionaries.columns.words'), 
        width: '40%',
        cellClass: 'text-surface-300',
        format: (row) => String(row.wordCount ?? 0)
      },
    ];
  }

  protected form: FormGroup<{
    name: FormControl<string>;
    languageId: FormControl<string>;
  }>;

  constructor() {
    super();
    this.form = this.formFactory.createDictionaryForm();
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('action') === 'create') {
        this.openCreateForm();
      }
    });
  }

  override closeForm(): void {
    super.closeForm();
    this.router.navigate([], { queryParams: {}, replaceUrl: true });
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
