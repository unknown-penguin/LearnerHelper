import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dictionary } from '../models/dictionary.model';
import { BaseHttpService } from '../../../core/utils/base-http.service';

@Injectable({
  providedIn: 'root',
})
export class DictionaryStateService extends BaseHttpService<Dictionary> {
  protected endpoint = 'dictionaries';
  
  private selectedDictionaryId = signal<string | null>(null);

  public readonly allDictionaries = this.all;
  public readonly currentDictionaryId = this.selectedDictionaryId.asReadonly();
  
  public readonly selectedDictionary = computed(() => {
    const id = this.selectedDictionaryId();
    return this.rows().find(d => d.id === id) || null;
  });

  constructor(http: HttpClient) {
    super(http);
    this.loadDictionaries();
  }

  public async loadDictionaries(): Promise<void> {
    await this.load();
    
    if (!this.selectedDictionaryId() && this.rows().length > 0) {
      this.selectedDictionaryId.set(this.rows()[0].id);
    }
  }

  public selectDictionary(id: string): void {
    const exists = this.rows().some(d => d.id === id);
    if (exists) {
      this.selectedDictionaryId.set(id);
    }
  }

  public unselectDictionary(): void {
    this.selectedDictionaryId.set(null);
  }


  public async createDictionary(data: { name: string; languageId: string }): Promise<Dictionary> {
    return await this.create(data);
  }

  public async updateDictionary(id: string, data: { name?: string; languageId?: string }): Promise<Dictionary> {
    return await this.update(id, data);
  }

  public async deleteDictionary(id: string): Promise<void> {
    if (this.selectedDictionaryId() === id) {
      this.selectedDictionaryId.set(null);
    }
    await this.delete(id);
  }
}
