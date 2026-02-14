export interface Dictionary {
  id: string;
  name: string;
  languageId: string;
  _count?: {
    words: number;
  };
}
