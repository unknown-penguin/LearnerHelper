import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-results',
  imports: [CommonModule],
  templateUrl: './quiz-results.html',
})
export class QuizResults implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  dictionaryId = signal<string>('');
  score = signal(0);
  total = signal(0);

  readonly percentage = computed(() => {
    const total = this.total();
    return total > 0 ? (this.score() / total * 100).toFixed(0) : '0';
  });

  ngOnInit(): void {
    const state = history.state;
    if (!state.score || !state.total || !state.dictionaryId) {
      this.router.navigate(['/quiz-setup']);
      return;
    }

    this.score.set(state.score);
    this.total.set(state.total);
    this.dictionaryId.set(state.dictionaryId);
  }

  retryQuiz(): void {
    const id = this.dictionaryId();
    if (id) {
      this.router.navigate(['/quiz', id]);
    }
  }

  resetQuiz(): void {
    this.router.navigate(['/quiz-setup']);
  }
}
