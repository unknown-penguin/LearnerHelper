import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CreateEditForm } from '../components/create-edit-form/create-edit-form';
import { wordEntity } from '../models/wordEntity.model';
import { LevelLabel } from '../components/level-label/level-label';
import { DictionaryService } from '../services/dictionary-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-dictionary',
  imports: [CommonModule, CreateEditForm, LevelLabel],
  templateUrl: './dictionary.html',
})
export class Dictionary implements OnInit {
  private readonly dictionaryService = inject(DictionaryService);

  isFormOpen = false;
  entries = signal<wordEntity[]>([]);
  selectedEntry: wordEntity | null = null;

  ngOnInit(): void {
    this.getEntries();
  }

  getEntries(): void {
    this.dictionaryService
      .getEntries()
      .subscribe((data) => {
        this.entries.set(data);
      });
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
