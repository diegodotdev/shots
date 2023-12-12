export interface Post {
  content: string;
  created_at: string;
  id: string;
  image: string;
  userId: string;
  user?: {
    id: string;
    name: string;
    image: string;
  };
  comments: Comment[];
  likes: Like[];
}

interface Comment {
  content: string;
  created_at: string;
  postId: string;
  userId: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
}

interface Like {
  userId: string;
  postId: string;
}

export interface User {
  id: string;
  name: string;
  image: string;
  posts?: Post[];
}
