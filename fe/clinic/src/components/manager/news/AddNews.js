import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNews } from "../../utils/ApiFunction"; // Đảm bảo hàm này đã được định nghĩa
import "./AddNews.css";

function AddNews() {
  const [newsData, setNewsData] = useState({
    title: "",
    content: "",
    status: "Draft",
    category: "",
    views: 0,
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData({ ...newsData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("news", new Blob([JSON.stringify(newsData)], { type: "application/json" }));
    if (image) formData.append("imageFile", image);

    try {
      await addNews(formData);
      setSuccessMessage("News added successfully!");
      setError("");
      setShowToast(true);
      setNewsData({
        title: "",
        content: "",
        status: "Draft",
        category: "",
        views: 0,
      });
      setImage(null);
      navigate("/admin/news");
    } catch (error) {
      console.error("Error adding news:", error);
      setError("Failed to add news.");
    }
  };

  return (
    <div className="add-news-container container">
      <h2 className="mt-4">Add News</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={newsData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            value={newsData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={newsData.status}
            onChange={handleChange}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={newsData.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="views" className="form-label">Views</label>
          <input
            type="number"
            className="form-control"
            id="views"
            name="views"
            value={newsData.views}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add News</button>
      </form>
      {error && <p className="text-danger">{error}</p>}
      {showToast && <p className="text-success">{successMessage}</p>}
    </div>
  );
}

export default AddNews;
