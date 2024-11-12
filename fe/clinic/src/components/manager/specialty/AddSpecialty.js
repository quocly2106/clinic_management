import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSpecialty } from "../../utils/ApiFunction";
import "./AddSpecialty.css";

function AddSpecialty() {
  const [specialtyData, setSpecialtyData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpecialtyData({ ...specialtyData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should not exceed 5MB");
        setShowToast(true);
        return;
      }

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, or JPG)");
        setShowToast(true);
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setSpecialtyData((prevState) => ({ ...prevState, image: file }));

      // Cleanup URL to prevent memory leaks
      return () => URL.revokeObjectURL(imageUrl);
    } else {
      setSpecialtyData((prevState) => ({ ...prevState, image: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!specialtyData.description) {
      setError("Description cannot be empty.");
      setShowToast(true);
      return;
    }

    try {
      const specialtyDto = {
        name: specialtyData.name,
        description: specialtyData.description,
      };

      const response = await addSpecialty(specialtyDto, specialtyData.image);

      // Nếu backend trả về URL ảnh, thêm timestamp để đảm bảo hình ảnh mới nhất luôn hiển thị
      const imageUrl = `${response.imageUrl}?timestamp=${new Date().getTime()}`;

      setSuccessMessage("Specialty added successfully!");
      setError("");
      setShowToast(true);
      setSpecialtyData({
        name: "",
        description: "",
        image: "",
      });
      setImagePreview(imageUrl); // Cập nhật preview với URL mới
      navigate("/admin/specialty");
    } catch (error) {
      console.error("Error adding specialty:", error);
      setError("Failed to add specialty. Please try again.");
      setSuccessMessage("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Specialty</h2>
      {error && <div className="alert alert-danger rounded-3">{error}</div>}
      <form onSubmit={handleSubmit} className="rounded-3 shadow p-4 bg-light">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="name"
            name="name"
            value={specialtyData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            id="description"
            name="description"
            value={specialtyData.description || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control rounded-3"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                key={imagePreview} // Force React to rerender
                style={{ maxWidth: "200px", maxHeight: "200px" }}
                className="img-thumbnail"
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Add Specialty
        </button>
      </form>

      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div
            id="liveToast"
            className={`toast ${successMessage ? "bg-success" : "bg-danger"}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body text-white">
              {successMessage || error}
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddSpecialty;
