import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStateService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-setup',
  imports: [CommonModule],
  templateUrl: './quiz-setup.html',
})
export class QuizSetup {
  readonly quizStateService = inject(QuizStateService);
  private readonly router = inject(Router);

  selectedDictionaryId = signal<string | null>(null);

  selectDictionary(id: string): void {
    this.selectedDictionaryId.set(id);
  }

  startQuiz(): void {
    const dictionaryId = this.selectedDictionaryId();
    if (!dictionaryId) return;

    this.router.navigate(['/quiz', dictionaryId]);
  }
}
