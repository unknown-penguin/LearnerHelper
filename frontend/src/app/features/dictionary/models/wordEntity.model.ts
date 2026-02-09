export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'preposition' | 'conjunction' | 'interjection';

export interface wordEntity{
    id: string;
    word: string;
    definition: string;
    languageLevel: string;
    language: string;
    partOfSpeech: PartOfSpeech;
    
}