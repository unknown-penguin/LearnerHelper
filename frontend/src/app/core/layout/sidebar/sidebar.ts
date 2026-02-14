import { Component, inject, Input, signal, computed, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DictionaryStateService } from '../../../features/dictionary/services/dictionary-state.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

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

  readonly currentUrl = toSignal(this.router.events.pipe(map(() => this.router.url)),
    { initialValue: this.router.url }
  );

  readonly isDictionaryRoute = computed(() => 
    this.currentUrl()?.startsWith('/dictionary') ?? false
  );

  constructor() {
    effect(() => {
      if (this.isDictionaryRoute()) {
        this.isDictionaryExpanded.set(true);
      } else {
        this.unselectDictionary();
      }
    });
  }

  toggleDictionary(): void {
    this.isDictionaryExpanded.update(v => !v);
  }

  selectDictionary(id: string): void {
    this.dictionaryState.selectDictionary(id);
    this.router.navigate(['/dictionary']);
  }

  unselectDictionary(): void {
    this.dictionaryState.unselectDictionary();
  }
}
