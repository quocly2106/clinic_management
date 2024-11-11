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
    image: "",
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
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should not exceed 5MB");
        setShowToast(true);
        return;
      }

      // Kiểm tra định dạng file
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or JPG)");
        setShowToast(true);
        return;
      }

      // Tạo URL preview cho ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setNewsData({ ...newsData, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    if (!newsData.title || !newsData.content || !newsData.category || !newsData.status) {
      setError("Please fill in all required fields.");
      setShowToast(true);
      return;
    }
  

    try {
      // Gọi API để thêm tin tức

      const newsDto = {
        title: newsData.title,
        content: newsData.content,
        category: newsData.category,
        status: newsData.status,
        views: newsData.views
      };

      await addNews(newsDto,newsData.image);
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
      setImage(null); // Reset image
      navigate("/admin/news");
    } catch (error) {
      setError("Failed to add news.");
      setSuccessMessage("");
      setShowToast(true);
    }
  };

  return (
    <div className="add-news-container container">
      <h2 className="mt-4">Add News</h2>
      {error && <div className="alert alert-danger rounded-3">{error}</div>}
      {successMessage && <div className="alert alert-success rounded-3">{successMessage}</div>}
      
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
            required
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
          {image && <img src={image} alt="Preview" className="mt-2" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
        </div>
        <button type="submit" className="btn btn-primary">Add News</button>
      </form>

      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div className={`toast ${successMessage ? "bg-success" : "bg-danger"}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body text-white">
              {successMessage || error}
              <button type="button" className="btn-close btn-close-white" onClick={() => setShowToast(false)}></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNews;
