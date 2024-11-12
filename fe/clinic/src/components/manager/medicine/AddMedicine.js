import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMedicine } from "../../utils/ApiFunction";
import "./AddMedicine.css";

function AddMedicine() {
  const [medicineData, setMedicineData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({ ...medicineData, [name]: value });
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
      setMedicineData((prevState) => ({ ...prevState, image: file }));

      // Cleanup URL to prevent memory leaks
      return () => URL.revokeObjectURL(imageUrl);
    } else {
      setMedicineData((prevState) => ({ ...prevState, image: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra price và quantity không được là số âm
    if (medicineData.price < 0) {
      setError("Price cannot be negative");
      setSuccessMessage("");
      setShowToast(true);
      return; // Dừng lại nếu price không hợp lệ
    }

    if (medicineData.quantity < 0) {
      setError("Quantity cannot be negative");
      setSuccessMessage("");
      setShowToast(true);
      return; // Dừng lại nếu quantity không hợp lệ
    }
    try {
      const medicineDto = {
        name: medicineData.name,
        description: medicineData.description,
        price: parseFloat(medicineData.price),
        quantity: parseInt(medicineData.quantity),
      };
      const response = await addMedicine(medicineDto, medicineData.image);
      const imageUrl = `${response.imageUrl}?timestamp=${new Date().getTime()}`;

      setSuccessMessage("Medicine added successfully!");
      setError("");
      setShowToast(true);
      setMedicineData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        image: "",
      });
      setImagePreview(imageUrl);
      navigate("/admin/medicine");
    } catch (error) {
      console.error("Error adding medicine:", error);
      setError("Failed to add medicine. Please try again.");
      setSuccessMessage("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add Medicine</h2>
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
            value={medicineData.name}
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
            value={medicineData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            className="form-control rounded-3"
            id="price"
            name="price"
            value={medicineData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control rounded-3"
            id="quantity"
            name="quantity"
            value={medicineData.quantity}
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
          Add Medicine
        </button>
      </form>

      {/* Toast for success/error message */}
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

export default AddMedicine;
