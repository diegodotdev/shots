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
