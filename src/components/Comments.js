import React, { useState } from 'react';

const mockComments = [
  { id: 1, text: 'To the moon!', responses: [] }
];

const Comments = () => {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { id: comments.length + 1, text: newComment, responses: [] }]);
      setNewComment('');
    }
  };

  const addResponse = (id, response) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, responses: [...comment.responses, response] } : comment));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addComment();
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a comment"
        className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded p-2 mb-2 w-full"
      />
      <button
        onClick={addComment}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
      >
        Submit
      </button>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {comment.text}
            <ul>
              {comment.responses.map((response, index) => <li key={index}>{response}</li>)}
              <li>
                <input
                  placeholder="Add a response"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addResponse(comment.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded p-2 mb-2 w-full"
                />
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;