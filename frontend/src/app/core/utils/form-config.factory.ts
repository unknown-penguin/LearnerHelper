import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export interface LanguageFormValue {
  name: string;
  code: string;
}

export interface DictionaryFormValue {
  name: string;
  languageId: string;
}

export interface WordFormValue {
  word: string;
  definition: string;
  partOfSpeech: string;
  languageLevel: string;
}

@Injectable({ providedIn: 'root' })
export class FormConfigFactory {
  constructor(private fb: FormBuilder) {}

  createLanguageForm(): FormGroup<{
    name: FormControl<string>;
    code: FormControl<string>;
  }> {
    return this.fb.nonNullable.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.maxLength(5)]],
    });
  }

  createDictionaryForm(): FormGroup<{
    name: FormControl<string>;
    languageId: FormControl<string>;
  }> {
    return this.fb.nonNullable.group({
      name: ['', Validators.required],
      languageId: ['', Validators.required],
    });
  }

  createWordForm(): FormGroup<{
    word: FormControl<string>;
    definition: FormControl<string>;
    partOfSpeech: FormControl<string>;
    languageLevel: FormControl<string>;
  }> {
    return this.fb.nonNullable.group({
      word: ['', Validators.required],
      definition: ['', Validators.required],
      partOfSpeech: ['', Validators.required],
      languageLevel: ['', Validators.required],
    });
  }
}

export class FormDefaultValues {
  static language(): LanguageFormValue {
    return { name: '', code: '' };
  }

  static dictionary(): DictionaryFormValue {
    return { name: '', languageId: '' };
  }

  static word(): WordFormValue {
    return {
      word: '',
      definition: '',
      partOfSpeech: '',
      languageLevel: '',
    };
  }
}
