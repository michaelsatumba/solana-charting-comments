// src/components/Comments.js
import React, { useState } from 'react';

const mockComments = [
  { id: 1, text: 'Great project!', responses: [] },
  { id: 2, text: 'To the moon!', responses: [] },
];

const Comments = () => {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    setComments([...comments, { id: comments.length + 1, text: newComment, responses: [] }]);
    setNewComment('');
  };

  const addResponse = (id, response) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, responses: [...comment.responses, response] } : comment));
  };

  return (
    <div>
      <h3>Comments</h3>
      <input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment" />
      <button onClick={addComment}>Submit</button>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {comment.text}
            <ul>
              {comment.responses.map((response, index) => <li key={index}>{response}</li>)}
              <li>
                <input placeholder="Add a response" onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addResponse(comment.id, e.target.value);
                    e.target.value = '';
                  }
                }} />
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;