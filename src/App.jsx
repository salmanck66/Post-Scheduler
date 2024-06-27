import { useState } from 'react';
import moment from 'moment';
import './App.css';

function App() {
  const [post, setPost] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');

  function handlePost() {
    const scheduledDate = date ? moment(date, 'YYYY-MM-DDTHH:mm') : moment();
    const now = moment();
    const timeDiff = scheduledDate.diff(now);

    const newPost = {
      text,
      image: image ? URL.createObjectURL(image) : null,
      link,
      date: scheduledDate.format('MMMM Do YYYY, h:mm:ss a')
    };

    if (timeDiff > 0) {
      setTimeout(() => {
        setPost((prevPosts) => [...prevPosts, newPost]);
      }, timeDiff);
    } else {
      setPost((prevPosts) => [...prevPosts, newPost]);
    }

    // Clear inputs
    setText('');
    setImage(null);
    setLink('');
    setDate('');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="header">
        <h1>Post Scheduler</h1>
      </div>
      <div className="container">
        <div className="create-post">
          <h2>Create a Post</h2>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder="Enter text"
            required
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            required
          />
          <input
            onChange={(e) => setLink(e.target.value)}
            value={link}
            type="url"
            placeholder="Enter link"
            required
          />
          <input
            onChange={(e) => setDate(e.target.value)}
            value={date}
            type="datetime-local"
            placeholder="Select date and time"
          />
          <button
            onClick={handlePost}
            disabled={!text}
          >
            Post
          </button>
        </div>
        <div className="mt-6">
          {post.map((item, index) => (
            <div key={index} className="post">
              <h1>{item.text}</h1>
              {item.image && <img src={item.image} alt="Post" />}
              <a href={item.link}>{item.link}</a>
              <p>{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
