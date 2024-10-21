import React, { useEffect, useState } from "react";
import { allDoctors } from "../../utils/ApiFunction";
import { useNavigate } from "react-router-dom";

function Doctor() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <>
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
