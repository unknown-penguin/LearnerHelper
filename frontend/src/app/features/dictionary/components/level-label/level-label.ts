import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-level-label',
  imports: [CommonModule, TranslocoPipe],
  providers: [provideTranslocoScope('dictionary')],
  templateUrl: './level-label.html'
})
export class LevelLabel {
    @Input() level!: string;

  public get levelClass(): string {
    switch ((this.level ?? '').toLowerCase()) {
      case 'beginner':
        return 'border-success-400/60 bg-success-900/40 text-success-100';
      case 'intermediate':
        return 'border-warning-400/60 bg-warning-900/40 text-warning-100';
      case 'advanced':
        return 'border-danger-400/60 bg-danger-900/40 text-danger-100';
      default:
        return 'border-primary-700/60 bg-primary-900/50 text-primary-100';
    }
  }
}
