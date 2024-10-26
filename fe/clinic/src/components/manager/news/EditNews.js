import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditNews.css"; // Import CSS
import { api } from "../../utils/ApiFunction"; // Import your Axios instance

const EditNews = () => {
  const { newsId } = useParams();
  const [news, setNews] = useState({ title: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation after success

  useEffect(() => {
    const fetchNewsById = async (id) => {
      try {
        const response = await api.get(`/news/${id}`);
        const data = response.data;
        console.log(data);
        if (data.title && data.category) {
          setNews({
            title: data.title,
            content: data.content,
            category: data.category,
            status: data.status,
          });
        } else {
          toast.error("Fetched news data is incomplete");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsById(newsId);
  }, [newsId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const updatedNews = {
      title: news.title,
      content: news.content,
      category: news.category,
      status: news.status,

    };

    try {
      const response = await fetch(`http://localhost:9191/news/update/${newsId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
          body: JSON.stringify(updatedNews),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Failed to update news: " + errorMessage);
      }

      // Nếu cập nhật thành công
      toast.success("News updated successfully");
      setTimeout(() => {
        navigate("/news");
      }, 2000);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid h-100">
        <div className="error-message">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <h2 className="form-title">Edit News</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={news.title}
                onChange={(e) => setNews({ ...news, title: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Content</label>
              <input
                type="text"
                className="form-control"
                value={news.content}
                onChange={(e) => setNews({ ...news, content: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                value={news.category}
                onChange={(e) => setNews({ ...news, category: e.target.value })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={news.status}
                onChange={(e) => setNews({ ...news, status: e.target.value })}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-save">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
