import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartOfSpeech, WordEntry } from '../../models/wordEntity.model';
import { LevelLabel } from '../level-label/level-label';
import { CustomSelect, SelectOption } from '../../../../core/components/custom-select/custom-select';
import { provideTranslocoScope, TranslocoDirective, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-create-edit-form',
  imports: [CommonModule, ReactiveFormsModule, LevelLabel, CustomSelect, TranslocoDirective],
  providers: [provideTranslocoScope('dictionary')],
  templateUrl: './create-edit-form.html'
})
export class CreateEditForm implements OnChanges {
  private readonly translocoService = inject(TranslocoService);
  private readonly defaultValue: WordEntry = {
    id: '',
    word: '',
    definition: '',
    languageLevel: 'Intermediate',
    language: '',
    partOfSpeech: 'noun',
    dictionaryId: '',
  };

  @Input() isOpen = true;
  @Input() entry: WordEntry | null = this.defaultValue;
  @Input() language = '';
  @Output() save = new EventEmitter<WordEntry>();
  @Output() delete = new EventEmitter<WordEntry>();
  @Output() cancel = new EventEmitter<void>();

  public readonly partOfSpeechOptions: PartOfSpeech[] = [
    'noun',
    'verb',
    'adjective',
    'adverb',
    'pronoun',
    'preposition',
    'conjunction',
    'interjection',
  ];
  public readonly languageLevels = ['Beginner', 'Intermediate', 'Advanced'];

  get partOfSpeechSelectOptions(): SelectOption[] {
    return this.partOfSpeechOptions.map((o) => ({
      value: o,
      label: this.translocoService.translate(`dictionary.partsOfSpeech.${o}`),
    }));
  }

  get languageLevelSelectOptions(): SelectOption[] {
    return this.languageLevels.map((l) => ({
      value: l,
      label: this.translocoService.translate(`dictionary.levels.${l}`),
    }));
  }

  public form: FormGroup<{
    id: FormControl<string>;
    word: FormControl<string>;
    definition: FormControl<string>;
    languageLevel: FormControl<string>;
    partOfSpeech: FormControl<PartOfSpeech>;
  }>;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.nonNullable.group({
      id: this.defaultValue.id,
      word: [this.defaultValue.word, Validators.required],
      definition: [this.defaultValue.definition, Validators.required],
      languageLevel: [this.defaultValue.languageLevel, Validators.required],
      partOfSpeech: [this.defaultValue.partOfSpeech, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entry']) {
      const incoming = changes['entry'].currentValue ?? this.defaultValue;
      this.form.reset({
        ...this.defaultValue,
        ...incoming,
      });
    }
  }

  public get isEditing(): boolean {
    return !!this.entry?.id?.trim();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.entry,
      ...this.form.getRawValue(),
      language: this.language,
    } as WordEntry;

    this.save.emit(payload);
  }

  public onDelete(): void {
    if (this.entry) {
      this.delete.emit(this.entry);
    }
  }

  public onCancel(): void {
    this.isOpen = false;
    this.cancel.emit();
  };

  
}
