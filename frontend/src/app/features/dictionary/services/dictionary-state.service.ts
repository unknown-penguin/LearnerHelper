import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dictionary } from '../models/dictionary.model';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DictionaryStateService {
  private dictionaries = signal<Dictionary[]>([]);
  private selectedDictionaryId = signal<string | null>(null);

  public readonly allDictionaries = this.dictionaries.asReadonly();
  public readonly currentDictionaryId = this.selectedDictionaryId.asReadonly();
  
  public readonly selectedDictionary = computed(() => {
    const id = this.selectedDictionaryId();
    return this.dictionaries().find(d => d.id === id) || null;
  });

  constructor(private readonly http: HttpClient) {
    this.loadDictionaries();
  }

  public async loadDictionaries(): Promise<void> {
    try {
      const dicts = await firstValueFrom(
        this.http.get<Dictionary[]>(`${environment.apiUrl}/dictionaries`)
      );
      this.dictionaries.set(dicts);
      
      // Auto-select first dictionary if none selected
      if (!this.selectedDictionaryId() && dicts.length > 0) {
        this.selectedDictionaryId.set(dicts[0].id);
      }
    } catch (error) {
      console.error('Error loading dictionaries:', error);
      this.dictionaries.set([]);
    }
  }

  public selectDictionary(id: string): void {
    const exists = this.dictionaries().some(d => d.id === id);
    if (exists) {
      this.selectedDictionaryId.set(id);
    }
  }
}
