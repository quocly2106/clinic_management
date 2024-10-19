import React from 'react';

function Doctor() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
        {/* Input tìm kiếm với kích thước nhỏ hơn */}
        <div className="input-group w-25" style={{ maxWidth: "200px" }}>
          <input
            type="search"
            id="form1"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-button"
          />
          <button
            type="button"
            className="btn btn-primary"
            id="search-button"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Nút thêm bác sĩ bên phải */}
        <button
          type="button"
          className="btn btn-success"
        >
          Add
        </button>
      </div>

      {/* Bảng dữ liệu bác sĩ */}
      <div className="table-responsive-md mb-4">
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Specialty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">1</td>
              <td>John</td>
              <td>Doe</td>
              <td>john.doe@example.com</td>
              <td>Cardiology</td>
            </tr>
            <tr>
              <td scope="row">2</td>
              <td>Jane</td>
              <td>Smith</td>
              <td>jane.smith@example.com</td>
              <td>Neurology</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Doctor;
