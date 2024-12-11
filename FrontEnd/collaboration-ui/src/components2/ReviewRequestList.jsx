import React, { useEffect, useState } from 'react';
import { getAllReviewRequests } from '../api/apiService';
import './ReviewRequestList.css';

const ReviewRequestList = () => {
  const [reviewRequests, setReviewRequests] = useState([]);

  useEffect(() => {
    const fetchReviewRequests = async () => {
      const response = await getAllReviewRequests();
      setReviewRequests(response.data);
    };
    fetchReviewRequests();
  }, []);

  return (
    <div className="review-request-list">
      <h2>Review Requests</h2>
      <ul>
        {reviewRequests.map(request => (
          <li key={request.id}>
            Task: {request.task.title}, Status: {request.status}, Feedback: {request.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewRequestList;