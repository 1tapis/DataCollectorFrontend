import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

const FormData = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [pageNo, setPageNo] = useState(1); // Pagination state for current page
  const [usersPerPage] = useState(6); // Number of users to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://datacollectorserver.onrender.com/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          // Reset pageNo to 1 when data is fetched or updated
          setPageNo(1);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  const filteredUsers = users.filter(user => {
    const fieldValue = user[searchField];
    if (typeof fieldValue !== "string") {
      return false;
    }
    return fieldValue.toLowerCase().includes(lowerCaseSearchTerm);
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Ensure pageNo is within valid range
  if (pageNo > totalPages) {
    setPageNo(totalPages);
  }

  // Calculate the indices for the current page
  const indexOfLastUser = pageNo * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="data__container">
      <div className="header">
        <input 
          type="text"
          placeholder='Search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSearchField(e.target.value)} value={searchField}>
          <option value="name">Name</option>
          <option value="gender">Gender</option>
          <option value="address">Address</option>
          <option value="pin">Pin</option>
        </select>
      </div>
      <div className="card__container">
        {currentUsers.map(user => (
          <div className="card" key={user.id}>
            <h3>Name : {user.name}</h3>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
            <p>PIN: {user.pin}</p>
          </div>
        ))}
      </div>
      <div className="footer">
            <button onClick={() => navigate("/")}>Back</button>
            <Pagination pageNo={pageNo} setPageNo={setPageNo} totalPages={totalPages} />
      
      </div>
    </div>
  );
}

export default FormData;
