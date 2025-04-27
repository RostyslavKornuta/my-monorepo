export interface Content {
  article: Article;
  details: Details;
}

export interface Article {
  author: string;
  category?: string;
  createdAt: string;
  description: string;
  domain: string;
  favoriteImage?: string;
  id: string;
  modifiedAt: string;
  path: string;
  publicPage: boolean;
  status: string;
  title: string;
  trending: boolean;
  type: string;
}

export interface Details {
  elements: Array<Slide>;
  type: ContentType;
}

export interface Slide {
  title: string;
  description: Array<SlideDescription>;
  answerExplanation: Array<SlideExplanation>;
  answers: Array<SlideAnswer>;
}

export interface SlideDescription {
  text: string;
}

export interface SlideExplanation {
  text: string;
  level: number;
}

export interface SlideAnswer {
  text: string;
  score: number;
}

export type ContentType = 'ARTICLE' | 'GALLERY' | 'QUIZ' | 'QUIZ_PERSONALITY'
