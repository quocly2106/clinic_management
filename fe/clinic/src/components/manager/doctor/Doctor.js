import React, { useEffect, useState } from "react";
import { allDoctors, deleteDoctor } from "../../utils/ApiFunction";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function Doctor() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDoctors = async () => {
    try {
      const doctorsData = await allDoctors();
      setDoctors(doctorsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (doctorId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Doctor No ${doctorId}?`); // Xác nhận trước khi xóa
    if (!confirmDelete) return;

    try {
      const result = await deleteDoctor(doctorId);
      if (result === "") {
        setSuccessMessage(`Doctor No ${doctorId} was deleted successfully.`);
      } else {
        setErrorMessage(`Error deleting doctor: ${result.message}`);
      }
      fetchDoctors();
    } catch (error) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };


  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <><div className="container col-md-8 col-lg-6">
      {successMessage && (
        <div className="alert alert-danger">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-success">{errorMessage}</div>
      )}
    </div>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
        <div className="input-group w-25" style={{ maxWidth: "200px" }}>
          <input
            type="search"
            id="form1"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-button"
          />
          <button type="button" className="btn btn-primary" id="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => navigate("/add-doctor")}>
          Add
        </button>
      </div>

      <div className="table-responsive-md mb-4">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Email</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Specialty</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              doctors.map((doctor, index) => (
                <tr key={doctor.id}>
                  <td >{index + 1}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.firstName}</td>
                  <td>{doctor.lastName}</td>
                  <td>{doctor.specialty ? doctor.specialty.name : "N/A"}</td>
                  <td className="gap-4">
                    <Link to={`/edit-doctor/${doctor.id}`}>
                      <span className="btn btn-warning btn-sm">
                        <FaEdit />
                      </span>
                    </Link>
                    <button className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(doctor.id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Doctor;
