import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Settings } from '../../settings/pages/settings';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, DatePipe, Settings],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  private readonly userService = inject(UserService);

  readonly user = this.userService.currentUser;

  name = '';
  email = '';

  saving = signal(false);
  saved = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const u = this.user();
    if (u) {
      this.name = u.name;
      this.email = u.email;
    }
  }

  async save(): Promise<void> {
    this.saving.set(true);
    this.saved.set(false);
    this.error.set(null);
    try {
      const success = await this.userService.updateCurrentUser({ name: this.name, email: this.email });
      if (success) {
        this.saved.set(true);
        setTimeout(() => this.saved.set(false), 3000);
      } else {
        this.error.set('Failed to save changes.');
      }
    } finally {
      this.saving.set(false);
    }
  }
}
