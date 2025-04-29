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

// enum
export enum ContentType {
  'ARTICLE',
  'GALLERY',
  'QUIZ',
  'QUIZ_PERSONALITY',
}
export const contentTypes = Object.keys(ContentType).filter((k) =>
  isNaN(Number(k))
);
export enum ContentStatus {
  'ACTIVE',
  'DRAFT',
  'PENDING',
}
export const contentStatuses = Object.keys(ContentStatus).filter((k) =>
  isNaN(Number(k))
);
