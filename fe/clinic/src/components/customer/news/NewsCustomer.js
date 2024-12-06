import React, { useState, useEffect } from "react";
import { Toast, ToastContainer, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NewsCustomer.css";
import { allNews } from "../../utils/ApiFunction";
import { BiSearchAlt } from "react-icons/bi";

const NewsCustomer = () => {
  const [news, setNews] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await allNews();
      setNews(data);
    } catch (error) {
      showToastMessage("Error loading news. Please try again.");
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle click on news item
  const handleNewsClick = (newsId) => {
    navigate(`/newss/detail/${newsId}`);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  // Apply filter for search
  const filteredNews = news.filter((news) => {
    const category = ` ${news.title}`.toLowerCase();
    return category.includes(search);
  });

  // Get current news items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  // Generate page items
  const pageItems = [];
  for (let number = 1; number <= totalPages; number++) {
    pageItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="news-container container-fluid p-4">
      <div className="search-container-customer d-flex justify-content-center mb-4">
        <BiSearchAlt className="search-icon" />
        <input
          type="search"
          className="search-input"
          placeholder="Tìm kiếm theo tiêu đề"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="container">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="news-item row mb-4 cursor-pointer news-hover"
            onClick={() => handleNewsClick(item.id)}
          >
            <div className="col-12 col-md-4">
              <img
                src={`http://localhost:9191/img/${item.image}`}
                alt={item.image}
                className="news-image img-fluid"
              />
            </div>
            <div className="col-12 col-md-8">
              <div className="news-content">
                <h3 className="news-title">{item.title}</h3>
                <div className="news-text-container">
                  <p className="news-text">{item.description}</p>
                </div>
                <div className="news-read-more">
                  Đọc thêm <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {pageItems}
            <Pagination.Next
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
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

export default NewsCustomer;
