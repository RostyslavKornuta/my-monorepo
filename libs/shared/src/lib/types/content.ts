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
  type: ContentType;
}

export interface Details {
  slides: Slide[];
  type: ContentType;
}

export interface Slide {
  title: string;
  description: SlideDescription[];
  answerExplanation: SlideExplanation[];
  answers: SlideAnswer[];
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
export const contentTypes: ContentType[] = ['ARTICLE', 'GALLERY', 'QUIZ', 'QUIZ_PERSONALITY']

export type ContentStatus = 'ACTIVE' | 'DRAFT' | 'PENDING'
export const contentStatuses: ContentStatus[] = ['ACTIVE', 'DRAFT', 'PENDING']
