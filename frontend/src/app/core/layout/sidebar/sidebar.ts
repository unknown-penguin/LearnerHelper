import {
  Component,
  inject,
  Input,
  signal,
  computed,
  effect,
  EventEmitter,
  Output,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DictionaryStateService } from '../../../features/dictionary/services/dictionary-state.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { provideTranslocoScope, TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslocoDirective],
  providers: [provideTranslocoScope('sidebar')],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  @Input() version!: string;

  private readonly router = inject(Router);
  readonly dictionaryState = inject(DictionaryStateService);
  private readonly authService = inject(AuthService);
  protected readonly isLoggedIn = this.authService.isLoggedIn;
  protected readonly user = this.authService.user;
  isDictionaryExpanded = signal(true);

  readonly currentUrl = toSignal(this.router.events.pipe(map(() => this.router.url)), {
    initialValue: this.router.url,
  });

  readonly isDictionaryRoute = computed(
    () => this.currentUrl()?.startsWith('/dictionary') ?? false,
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
  addDictionary(): void {
    this.router.navigate(['/manage-dictionaries'], { queryParams: { action: 'create' } });
  }

  toggleDictionary(): void {
    this.isDictionaryExpanded.update((v) => !v);
  }

  selectDictionary(id: string): void {
    this.dictionaryState.selectDictionary(id);
    this.router.navigate(['/dictionary']);
  }

  unselectDictionary(): void {
    this.dictionaryState.unselectDictionary();
  }

  @Output() loginRequested = new EventEmitter<void>();

  logoutUser(): void {
    this.authService.logout();
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
