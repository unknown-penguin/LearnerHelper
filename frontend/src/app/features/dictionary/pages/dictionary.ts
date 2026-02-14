import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { CreateEditForm } from '../components/create-edit-form/create-edit-form';
import { wordEntity } from '../models/wordEntity.model';
import { LevelLabel } from '../components/level-label/level-label';
import { DictionaryService } from '../services/dictionary-service';
import { DictionaryStateService } from '../services/dictionary-state.service';

@Component({
  selector: 'app-dictionary',
  imports: [CommonModule, CreateEditForm, LevelLabel],
  templateUrl: './dictionary.html',
})

export class Dictionary implements OnInit {
  private readonly dictionaryService = inject(DictionaryService);
  readonly dictionaryState = inject(DictionaryStateService);

  isFormOpen = false;
  entries = signal<wordEntity[]>([]);
  selectedEntry: wordEntity | null = null;
  isDropdownOpen = signal(false);

  constructor() {
    effect(() => {
      const dictionaryId = this.dictionaryState.currentDictionaryId();
      if (dictionaryId) {
        this.getEntries(dictionaryId);
      }
    });
  }

  ngOnInit(): void {
  }

  getEntries(dictionaryId: string): void {
    this.dictionaryService
      .getEntries(dictionaryId)
      .subscribe((data) => {
        this.entries.set(data);
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

  closeForm(): void {
    this.isFormOpen = false;
  }

  handleSave(entry: wordEntity): void {
    const trimmedId = entry.id.trim();
    const entryId = trimmedId.length > 0 ? trimmedId : this.generateId();
    const currentEntries = this.entries();
    const exists = currentEntries.some((item) => item.id === entryId);

    if (exists) {
      this.entries.set(
        currentEntries.map((item) =>
          item.id === entryId ? { ...entry, id: entryId } : item,
        ),
      );
    } else {
      this.entries.set([...currentEntries, { ...entry, id: entryId }]);
    }

    this.closeForm();
  }

  private generateId(): string {
    return `entry-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
}
