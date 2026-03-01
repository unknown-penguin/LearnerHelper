import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Settings } from '../../settings/pages/settings';
import { provideTranslocoScope, TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { ProfileForm } from '../models/profile';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, DatePipe, Settings, TranslocoDirective],
  providers: [provideTranslocoScope('profile')],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly translocoService = inject(TranslocoService);

  protected readonly user = signal<User | null>(null);

  protected form: ProfileForm = { name: '', email: '' };

  saving = signal(false);
  saved = signal(false);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const u = this.user();
      if (u) {
        this.form.name = u.name;
        this.form.email = u.email;
      }
    });
  }

  ngOnInit(): void {
    const id = this.authService.user()?.id;
    if (id) {
      this.userService.getUserById(id).then(u => this.user.set(u));
    }
  }

  async save(): Promise<void> {
    this.saving.set(true);
    this.saved.set(false);
    this.error.set(null);
    try {
      const success = await this.authService.updateCurrentUser({ name: this.form.name, email: this.form.email });
      if (success) {
        this.user.set(this.authService.user());
        this.saved.set(true);
        setTimeout(() => this.saved.set(false), 3000);
      } else {
        this.error.set(this.translocoService.translate('profile.saveError'));
      }
    } finally {
      this.saving.set(false);
    }
  }
}
