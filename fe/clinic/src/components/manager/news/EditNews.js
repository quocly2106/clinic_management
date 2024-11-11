import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditNews.css";
import { api } from "../../utils/ApiFunction";

const EditNews = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();

  const [newsData, setNewsData] = useState({
    title: "",
    content: "",
    status: "Draft",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchNewsById = async (id) => {
      try {
        const response = await api.get(`/news/${id}`);
        const data = response.data;

        setNewsData({
          title: data.title,
          content: data.content,
          category: data.category,
          status: data.status,
          image: data.image,
        });

        if (data.image) {
          setImagePreview(`http://localhost:9191/img/${data.image}`);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        toast.error("File size should be less than 5MB");
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, JPG)");
        return;
      }

      setImagePreview(URL.createObjectURL(file)); // Update image preview
      setNewsData((prev) => ({ ...prev, image: file })); // Store image for form submission
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!newsData.title || !newsData.content || !newsData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();

    // Wrap news data in a JSON object and append it as a Blob
    formData.append(
      "newsDto",
      new Blob(
        [
          JSON.stringify({
            title: newsData.title,
            content: newsData.content,
            category: newsData.category,
            status: newsData.status,
          }),
        ],
        { type: "application/json" }
      )
    );

    // Append the image if it's a file
    if (newsData.image) {
      formData.append("image", newsData.image);
    }

    try {
      const response = await fetch(
        `http://localhost:9191/news/update/${newsId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update news");
      }

      toast.success("News updated successfully");
      setTimeout(() => {
        navigate("/admin/news");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <h2 className="form-title">Edit News</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={newsData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Category *</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={newsData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">Content *</label>
              <textarea
                className="form-control"
                name="content"
                value={newsData.content}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={newsData.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
                accept="image/*"
              />
              {imagePreview && (
                <div className="mt-2 image-preview-container">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="img-preview"
                  />
                </div>
              )}
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
