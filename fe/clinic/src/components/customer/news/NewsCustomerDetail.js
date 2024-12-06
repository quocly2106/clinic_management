// NewsDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import { getNewsById } from "../../utils/ApiFunction";
import "./NewsCustomerDetail.css";

const NewsCustomerDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      const response = await getNewsById(id);
      if (response.success) {
        setNews(response.data);
      } else {
        showToastMessage(response.message || "Error loading news");
      }
    } catch (error) {
      showToastMessage("Error loading news details");
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (!news) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="news-detail-container">
      <div className="news-detail-content">
        <div className="image-container">
          <img
            src={`http://localhost:9191/img/${news.image}`}
            alt={news.image}
            className="news-detail-image"
          />
        </div>
        
        <div className="content-wrapper">
          <h1 className="news-detail-title">{news.title}</h1>
          
          <div className="news-meta">
            <span className="news-date">
              <i className="far fa-calendar-alt"></i>
              {new Date(news.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="news-detail-description">
            <p>{news.description}</p>
          </div>
          
          <div className="news-detail-content-text">
            <p>{news.content}</p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="light">
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default NewsCustomerDetail;