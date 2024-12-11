import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewRequestById, updateReview } from '../api/apiService';
import './ReviewRequestDetail.css';

const ReviewRequestDetail = () => {
  const { id } = useParams();
  const [reviewRequest, setReviewRequest] = useState(null);
  const [updatedReview, setUpdatedReview] = useState({
    feedback: '',
    status: ''
  });

  useEffect(() => {
    const fetchReviewRequest = async () => {
      const response = await getReviewRequestById(id);
      setReviewRequest(response.data);
      setUpdatedReview({
        feedback: response.data.feedback,
        status: response.data.status
      });
    };
    fetchReviewRequest();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReview({ ...updatedReview, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReview(id, updatedReview.feedback, updatedReview.status);
      const response = await getReviewRequestById(id);
      setReviewRequest(response.data);
    } catch (error) {
      console.error('Error updating review request:', error);
    }
  };

  if (!reviewRequest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="review-request-detail">
      <h2>Review Request for Task: {reviewRequest.task.title}</h2>
      <p>Status: {reviewRequest.status}</p>
      <p>Feedback: {reviewRequest.feedback}</p>
      <p>Requested By: {reviewRequest.requestedBy.fullName}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          name="feedback"
          value={updatedReview.feedback}
          onChange={handleChange}
          placeholder="Feedback"
          required
        />
        <select
          name="status"
          value={updatedReview.status}
          onChange={handleChange}
          required
        >
          <option value="PENDING">PENDING</option>
          <option value="APPROVED">APPROVED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
        <button type="submit">Update Review</button>
      </form>
    </div>
  );
};

export default ReviewRequestDetail;