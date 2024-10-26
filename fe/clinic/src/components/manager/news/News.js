import React, { useCallback, useEffect, useState } from "react";
import { allNews, deleteNews } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Toast } from "react-bootstrap";
import "./News.css";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import colors from "../../../config/color";

function News() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchNews = useCallback(async () => {
    try {
      const newsData = await allNews();
      setNews(newsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      showToastMessage("Error fetching news data", "error");
    }
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async (newsId) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete News No ${newsId}?`
    );
    if (!confirmDelete) return;

    try {
      const result = await deleteNews(newsId);
      if (result.success) {
        showToastMessage(
          `News No ${newsId} was deleted successfully.`,
          "success"
        );
        fetchNews(); // Refresh danh sách sau khi xóa thành công
      } else {
        showToastMessage(`Error deleting news: ${result.message}`, "error");
      }
    } catch (error) {
      showToastMessage(`Error: ${error.message || "Unknown error"}`, "error");
    }
  };

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredNews = news.filter((news) => {
    const category = `${news.category} + ${news.title}`.toLowerCase();
    return category.includes(search);
  });

  const indexOfLastNews = currentPage * itemsPerPage;
  const indexOfFirstNews = indexOfLastNews - itemsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  // Tạo số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredNews.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Hàm chuyển đổi thời gian
  const convertToLocalTime = (dateString) => {
    const date = new Date(dateString);
  
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: "Asia/Bangkok", 
    };
    
    const timePart = date.toLocaleTimeString("vi-VN", timeOptions);
    
    const dateOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: "Asia/Bangkok",
    };
    
    const datePart = date.toLocaleDateString("vi-VN", dateOptions);
  
    return `${timePart} ${datePart}`;
  };
  

  return (
    <div className="news-wrapper">
      <div className="news-container">
        <ToastContainer position="top-end" className="custom-toast">
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            bg={toastType === "success" ? "success" : "danger"}
            delay={3000}
            autohide
          >
            <Toast.Header closeButton>
              <strong className="me-auto">
                {toastType === "success" ? "Success" : "Error"}
              </strong>
            </Toast.Header>
            <Toast.Body className={toastType === "success" ? "text-white" : ""}>
              {toastMessage}
            </Toast.Body>
          </Toast>
        </ToastContainer>

        <div className="search-section">
          <div className="search-add-wrapper">
            <div className="search-container">
              <BiSearchAlt className="search-icon" />
              <input
                type="search"
                className="search-input"
                placeholder="Search by name..."
                value={search}
                onChange={handleSearch}
              />
            </div>

            <button
              className="add-button"
              style={{
                background: colors.background,
              }}
              onClick={() => navigate("/add-news")}
            >
              <MdAdd className="add-icon" />
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="table-container">
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>CreatedAt</th>
                  <th>UpdatedAt</th>
                  <th>View</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredNews.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No news found
                    </td>
                  </tr>
                ) : (
                  currentNews.map((news, index) => (
                    <tr key={news.id}>
                      <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{news.title}</td>
                      <td>{news.content}</td>
                      <td>{news.category}</td>
                      <td>{news.status}</td>
                      <td>{convertToLocalTime(news.createdAt)}</td>
                      <td>{convertToLocalTime(news.updatedAt)}</td>
                      <td>{news.views}</td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/edit-news/${news.id}`}
                            className="edit-button"
                            title="Edit"
                          >
                            <MdEdit />
                          </Link>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(news.id)}
                            title="Delete"
                          >
                            <MdDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          <div className="pagination">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`page-button ${
                  currentPage === number ? "active" : ""
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
