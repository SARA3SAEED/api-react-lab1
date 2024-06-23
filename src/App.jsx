import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [submit, setSubmit] = useState({ posts: false, comments: false, users: false });

  const handlePostSubmit = () => {
    setSubmit((prev) => ({ ...prev, posts: true }));
  };

  const handleCommentSubmit = () => {
    setSubmit((prev) => ({ ...prev, comments: true }));
  };

  const handleUserSubmit = () => {
    setSubmit((prev) => ({ ...prev, users: true }));
  };

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (submit.comments) {
      axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
        .then(response => {
          setComments(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [submit.comments]);

  useEffect(() => {
    if (submit.users) {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [submit.users]);

  return (
    <>
      <div>
        <button onClick={handlePostSubmit}>Show Posts</button>
        {submit.posts && 
          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <small>{post.id}</small>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        }
      </div>

      <div>
        <button onClick={handleCommentSubmit}>Show Comments</button>
        {submit.comments && 
          <div>
            {comments.map((comment) => (
              <div key={comment.id}>
                <small>{comment.id}</small>
                <h2>{comment.name}</h2>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        }
      </div>

      <div>
        <button onClick={handleUserSubmit}>Show Users</button>
        {submit.users && 
          <div>
            {users.map((user) => (
              <div key={user.id}>
                <small>{user.id}</small>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        }
      </div>
    </>
  );
}

export default App;
