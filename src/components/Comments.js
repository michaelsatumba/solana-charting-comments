import React, { useState } from 'react';

// Mock comments data
const mockComments = [
  { id: 1, text: 'To the moon!', responses: [] } // Initial comment with no responses
];

const Comments = () => {
  // State to hold the list of comments
  const [comments, setComments] = useState(mockComments);
  // State to hold the new comment input value
  const [newComment, setNewComment] = useState('');

  // Function to add a new comment
  const addComment = () => {
    if (newComment.trim() !== '') { // Check if the new comment is not empty
      setComments([...comments, { id: comments.length + 1, text: newComment, responses: [] }]); // Add the new comment to the list
      setNewComment(''); // Clear the input field
    }
  };

  // Function to add a response to a specific comment
  const addResponse = (id, response) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, responses: [...comment.responses, response] } : comment)); // Add the response to the correct comment
  };

  // Handle Enter key press for adding a new comment
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addComment(); // Add the comment when Enter is pressed
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Comments</h2> 
      <div className="mb-4">
        <input
          value={newComment} // Bind input value to newComment state
          onChange={(e) => setNewComment(e.target.value)} // Update newComment state on input change
          onKeyDown={handleKeyDown} // Handle Enter key press
          placeholder="Add a comment" // Input placeholder text
          className="bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded p-2 mb-2 w-full" // Input styling
        />
        <button
          onClick={addComment} // Add comment on button click
          className={`px-4 py-2 rounded w-full ${newComment.trim() !== '' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`} // Button styling with conditional classes
        >
          Submit
        </button>
      </div>
      <ul>
        {comments.map(comment => (
          <li key={comment.id} className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
            <p className="text-gray-900 dark:text-gray-100">{comment.text}</p> {/* Display comment text */}
            <ul className="mt-2">
              {comment.responses.map((response, index) => (
                <li key={index} className="mb-2 p-2 bg-gray-200 dark:bg-gray-600 rounded">
                  <p className="text-gray-800 dark:text-gray-200">{response}</p> {/* Display response text */}
                </li>
              ))}
              <li>
                <input
                  placeholder="Add a response" // Input placeholder text for responses
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addResponse(comment.id, e.target.value); // Add response on Enter key press
                      e.target.value = ''; // Clear the input field
                    }
                  }}
                  className="bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded p-2 mb-2 w-full" // Input styling
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