import { InMemoryDbService } from 'angular-in-memory-web-api';

export class MemoryMockApiService implements InMemoryDbService {
  createDb() {
    let dictionary = [
      {
        id: '1',
        word: 'Idempotent',
        partOfSpeech: 'adjective',
        definition: 'Producing the same result even when performed multiple times.',
        languageLevel: 'Advanced',
        language: 'English'
      },
      {
        id: '2',
        word: 'Telemetry',
        partOfSpeech: 'noun',
        definition: 'Automated collection and transmission of system metrics and events.',
        languageLevel: 'Advanced',
        language: 'English'
      }
    ];
    return { dictionary };
  }
}