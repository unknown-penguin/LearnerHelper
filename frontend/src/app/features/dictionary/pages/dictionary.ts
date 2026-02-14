import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { CreateEditForm } from '../components/create-edit-form/create-edit-form';
import { WordEntry } from '../models/wordEntity.model';
import { LevelLabel } from '../components/level-label/level-label';
import { WordService } from '../services/word.service';
import { DictionaryStateService } from '../services/dictionary-state.service';
import { LanguageService } from '../services/language.service';
import { DataTableComponent, TableColumn } from '../../../core/components/data-table/data-table';

@Component({
  selector: 'app-dictionary',
  imports: [CommonModule, CreateEditForm, LevelLabel, DataTableComponent],
  templateUrl: './dictionary.html',
})
export class Dictionary {
  private readonly wordService = inject(WordService);
  readonly dictionaryState = inject(DictionaryStateService);
  private readonly languageService = inject(LanguageService);

  isFormOpen = false;
  entries = signal<WordEntry[]>([]);
  selectedEntry: WordEntry | null = null;
  isDropdownOpen = signal(false);

  readonly columns: TableColumn<WordEntry>[] = [
    { 
      field: 'word', 
      label: 'Word', 
      width: '15%',
      cellClass: 'text-base font-semibold text-surface-100'
    },
    { 
      field: 'partOfSpeech', 
      label: 'Part of Speech', 
      width: '15%',
      cellClass: 'capitalize text-surface-300'
    },
    { 
      field: 'definition', 
      label: 'Definition', 
      width: '45%',
      cellClass: 'text-surface-100'
    },
    { 
      field: 'language', 
      label: 'Language', 
      width: '12%',
      format: (row) => `<span class="inline-flex items-center rounded bg-primary-900/70 px-2.5 py-1 text-[11px] font-semibold text-primary-100 ring-1 ring-primary-600/40">${row.language}</span>`
    },
    { 
      field: 'languageLevel', 
      label: 'Level', 
      width: '13%',
      component: true
    },
  ];

  readonly dictionaryLanguage = computed(() => {
    const dict = this.dictionaryState.selectedDictionary();
    if (!dict) return '';
    return this.languageService.allLanguages().find(l => l.id === dict.languageId)?.name ?? '';
  });

  constructor() {
    effect(() => {
      const dictionaryId = this.dictionaryState.currentDictionaryId();
      if (dictionaryId) {
        this.loadEntries(dictionaryId);
      }
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update(v => !v);
  }

  selectDictionary(id: string): void {
    this.dictionaryState.selectDictionary(id);
    this.isDropdownOpen.set(false);
  }

  openNewEntryForm(): void {
    this.selectedEntry = null;
    this.isFormOpen = true;
  }

  openEditForm(entry: WordEntry): void {
    this.selectedEntry = entry;
    this.isFormOpen = true;
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.selectedEntry = null;
  }

  handleSave(entry: WordEntry): void {
    const dictionaryId = this.dictionaryState.currentDictionaryId();
    if (!dictionaryId) return;

    const isEditing = entry.id?.trim().length > 0;

    if (isEditing) {
      this.wordService.update(entry.id, {
        word: entry.word,
        definition: entry.definition,
        partOfSpeech: entry.partOfSpeech,
        languageLevel: entry.languageLevel,
      }).subscribe(() => {
        this.loadEntries(dictionaryId);
        this.dictionaryState.loadDictionaries();
        this.closeForm();
      });
    } else {
      this.wordService.create({
        word: entry.word,
        definition: entry.definition,
        partOfSpeech: entry.partOfSpeech,
        languageLevel: entry.languageLevel,
        dictionaryId,
      }).subscribe(() => {
        this.loadEntries(dictionaryId);
        this.dictionaryState.loadDictionaries();
        this.closeForm();
      });
    }
  }

  handleDelete(entry: WordEntry): void {
    const dictionaryId = this.dictionaryState.currentDictionaryId();
    if (!dictionaryId || !entry.id) return;

    this.wordService.delete(entry.id).subscribe(() => {
      this.loadEntries(dictionaryId);
      this.dictionaryState.loadDictionaries();
      this.closeForm();
    });
  }

  private loadEntries(dictionaryId: string): void {
    this.wordService
      .getByDictionary(dictionaryId)
      .subscribe((data) => this.entries.set(data));
  }
}
