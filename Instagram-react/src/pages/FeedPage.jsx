import { useEffect, useState } from 'react';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/feed', {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar el feed');
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error al cargar el feed', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <img src={post.imageUrl} alt="post" width="300" />
            <p>{post.username}</p>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
