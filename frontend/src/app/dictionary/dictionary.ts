import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dictionary',
  imports: [CommonModule],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.css',
})
export class Dictionary {

  entries = [
    {
      term: 'Abstruse',
      partOfSpeech: 'adjective',
      definition: 'Difficult to understand; obscure.',
      example: 'The professor offered a simple analogy for the abstruse proof.'
    },
    {
      term: 'Brevity',
      partOfSpeech: 'noun',
      definition: 'Concise and exact use of words in writing or speech.',
      example: 'She appreciated the brevity of the meeting notes.'
    },
    {
      term: 'Conduit',
      partOfSpeech: 'noun',
      definition: 'A channel for conveying water or other fluid; a means of transmitting.',
      example: 'Open data serves as a conduit for innovation.'
    },
    {
      term: 'Delineate',
      partOfSpeech: 'verb',
      definition: 'To describe or portray something precisely.',
      example: 'The roadmap delineates each milestone clearly.'
    }
  ];

}
