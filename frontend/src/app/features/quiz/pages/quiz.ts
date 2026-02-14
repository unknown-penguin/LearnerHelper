import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WordService } from '../../dictionary/services/word.service';
import { WordEntry } from '../../dictionary/models/wordEntity.model';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.html',
})
export class Quiz implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly wordService = inject(WordService);

  questions = signal<WordEntry[]>([]);
  currentQuestionIndex = signal(0);
  score = signal(0);
  userAnswer = signal('');

  readonly currentQuestion = computed(() => {
    const questions = this.questions();
    const index = this.currentQuestionIndex();
    return questions[index] || null;
  });

  readonly progress = computed(() => {
    const total = this.questions().length;
    const current = this.currentQuestionIndex();
    return total > 0 ? Math.round(((current + 1) / total) * 100) : 0;
  });

  ngOnInit(): void {
    const dictionaryId = this.route.snapshot.paramMap.get('id');
    if (!dictionaryId) {
      this.router.navigate(['/quiz-setup']);
      return;
    }
    this.loadQuiz(dictionaryId);
  }

  private async loadQuiz(dictionaryId: string): Promise<void> {
    const words = await this.wordService.getByDictionary(dictionaryId);
    if (words.length === 0) {
      this.router.navigate(['/quiz-setup']);
      return;
    }
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    this.questions.set(shuffled);
    this.currentQuestionIndex.set(0);
    this.score.set(0);
  }

  submitAnswer(): void {
    const question = this.currentQuestion();
    if (!question) return;

    const userAnswer = this.userAnswer().trim().toLowerCase();
    const correctAnswer = question.word.toLowerCase();

    if (userAnswer === correctAnswer) {
      this.score.update(s => s + 1);
    }

    this.nextQuestion();
  }

  nextQuestion(): void {
    this.userAnswer.set('');
    const nextIndex = this.currentQuestionIndex() + 1;

    if (nextIndex >= this.questions().length) {
      this.navigateToResults();
    } else {
      this.currentQuestionIndex.set(nextIndex);
    }
  }

  private navigateToResults(): void {
    const dictionaryId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/quiz-results'], {
      state: {
        score: this.score(),
        total: this.questions().length,
        dictionaryId: dictionaryId
      }
    });
  }
}
