import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPendingReviews } from '../api/apiService';
import './PendingReviews.css';

const PendingReviews = () => {
  const { mentorId } = useParams();
  const [pendingReviews, setPendingReviews] = useState([]);

  useEffect(() => {
    const fetchPendingReviews = async () => {
      const response = await getPendingReviews(mentorId);
      setPendingReviews(response.data);
    };
    fetchPendingReviews();
  }, [mentorId]);

  return (
    <div className="pending-reviews">
      <h2>Pending Reviews</h2>
      <ul>
        {pendingReviews.map(review => (
          <li key={review.id}>
            Task: {review.task.title}, Status: {review.status}, Feedback: {review.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingReviews;