import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditMedicine.css"; // Import CSS
import { api } from "../../utils/ApiFunction"; // Import your Axios instance

const EditMedicine = () => {
  const { medicineId } = useParams();
  const [medicine, setMedicine] = useState({ name: "", description: "" ,image: null,});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate(); // For navigation after success

  useEffect(() => {
    const fetchMedicineById = async (id) => {
      try {
        const response = await api.get(`/medicines/${id}`);
        const data = response.data;
        console.log(data);
        if (data.name && data.description) {
          setMedicine({
            name: data.name,
            description: data.description,
            image: data.image,
            price: data.price,
            quantity: data.quantity,
          });
          setImagePreview(
            data.image ? `http://localhost:9191/img/${data.image}` : null
          );
        } else {
          toast.error("Fetched medicine data is incomplete");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicineById(medicineId);
  }, [medicineId]);

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
      setMedicine((prev) => ({ ...prev, image: file })); // Store image for form submission
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    // Kiểm tra price và quantity không được là số âm
    if (medicine.price < 0) {
      toast.error("Price cannot be negative");
      return; // Dừng lại nếu price không hợp lệ
    }

    if (medicine.quantity < 0) {
      toast.error("Quantity cannot be negative");
      return; // Dừng lại nếu quantity không hợp lệ
    }

    const formData = new FormData();
    // Use "medicineDto" instead of "serviceDto" as the key name
    formData.append(
      "medicineDto",
      new Blob(
        [
          JSON.stringify({
            name: medicine.name,
            description: medicine.description,
            price: medicine.price,
            quantity: medicine.quantity,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (medicine.image) {
      formData.append("image", medicine.image);
    }


    try {
      const response = await fetch(
        `http://localhost:9191/medicines/update/${medicineId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error("Failed to update medicine: " + errorMessage);
      }

      // Nếu cập nhật thành công
      toast.success("Medicine updated successfully");
      setTimeout(() => {
        navigate("/admin/medicine");
      }, 2000);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }finally {
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
        <h2 className="form-title">Edit Medicine</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={medicine.name}
                onChange={(e) =>
                  setMedicine({ ...medicine, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={medicine.description}
                onChange={(e) =>
                  setMedicine({ ...medicine, description: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={medicine.price}
                onChange={(e) =>
                  setMedicine({ ...medicine, price: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={medicine.quantity}
                onChange={(e) =>
                  setMedicine({ ...medicine, quantity: e.target.value })
                }
              />
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

export default EditMedicine;
