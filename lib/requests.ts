export const fetchUserId = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-id`,
    {
      cache: "no-store",
    }
  );
  const result = await response.json();
  return result;
};

export const createPost = async (body: {
  content: string;
  image: string;
  userId: string;
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
};

export const createComment = async (body: {
  content: string;
  userId: string;
  postId: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const result = await response.json();
  return result;
};

export const createLike = async (body: { userId: string; postId: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
};

export const removeLike = async (body: { id: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/remove-like`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const result = await response.json();
  return result;
};

export const removePost = async (body: { id: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const result = await response.json();
  return result;
};
