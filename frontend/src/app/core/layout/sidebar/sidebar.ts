import { Component, inject, Input, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DictionaryStateService } from '../../../features/dictionary/services/dictionary-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  @Input() user?: { name: string };
  @Input() version!: string;

  private readonly router = inject(Router);
  readonly dictionaryState = inject(DictionaryStateService);
  isDictionaryExpanded = signal(true);

  toggleDictionary(): void {
    this.isDictionaryExpanded.update(v => !v);
  }

  selectDictionary(id: string): void {
    this.dictionaryState.selectDictionary(id);
    this.router.navigate(['/dictionary']);
  }
}
