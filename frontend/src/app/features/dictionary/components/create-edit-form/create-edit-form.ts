import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartOfSpeech, wordEntity } from '../../models/wordEntity.model';
import { LevelLabel } from '../level-label/level-label';
@Component({
  selector: 'app-create-edit-form',
  imports: [CommonModule, ReactiveFormsModule, LevelLabel],
  templateUrl: './create-edit-form.html'
})
export class CreateEditForm implements OnChanges {
  private readonly defaultValue: wordEntity = {
    id: '',
    word: '',
    definition: '',
    languageLevel: 'Intermediate',
    language: 'English',
    partOfSpeech: 'noun',
  };

  @Input() isOpen = true;
  @Input() entry: wordEntity = this.defaultValue;
  @Output() save = new EventEmitter<wordEntity>();
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
  public readonly languages = ['English', 'Spanish', 'French', 'German'];
  public form: FormGroup<{
    id: FormControl<string>;
    word: FormControl<string>;
    definition: FormControl<string>;
    languageLevel: FormControl<string>;
    language: FormControl<string>;
    partOfSpeech: FormControl<PartOfSpeech>;
  }>;

  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.nonNullable.group({
      id: this.defaultValue.id,
      word: [this.defaultValue.word, Validators.required],
      definition: [this.defaultValue.definition, Validators.required],
      languageLevel: [this.defaultValue.languageLevel, Validators.required],
      language: [this.defaultValue.language, Validators.required],
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

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.entry,
      ...this.form.getRawValue(),
    } as wordEntity;

    this.save.emit(payload);
  }

  public onCancel():  void {
    this.isOpen = false;
    this.cancel.emit();
  };

  
}
