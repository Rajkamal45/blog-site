export interface BlogPost {
    postId: string;
    title: string;
    content: string;
    excerpt: string;
    authorId: string;
    authorName: string;
    publishedAt: string | null;
    updatedAt: string;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    tags: string[];
    featuredImage?: string;
    slug: string;
    metaDescription: string;
    readingTime: number;
    viewCount: number;
  }
  
  export interface NewsletterSubscriber {
    email: string;
    subscribedAt: string;
    status: 'ACTIVE' | 'UNSUBSCRIBED' | 'BOUNCED';
    confirmationToken: string;
    unsubscribeToken: string;
    source: string;
    lastEmailSent?: string;
  }
  
  export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  }
  
  export interface PostsResponse {
    posts: BlogPost[];
    pagination: PaginationMeta;
  }
  
  export interface User {
    userId: string;
    email: string;
    name: string;
    groups?: string[];
  }

