import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import $ from "jquery";
import "datatables.net";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/user/getAll?pageIndex=0&pageSize=100")
      .then((response) => response.json())
      .then((data) => setUsers(data.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const deleteUser = (id) => {
    $("#deleteModal").modal("show");
    $("#deleteModal input[name='deleteId']").val(id);
  };

  const deleteUserAction = () => {
    let id = $("#deleteModal input[name='deleteId']").val();
    fetch(`http://localhost:3000/api/user/delete/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => alert("Xóa không thành công: " + error));
    $("#deleteModal").modal("hide");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} deleteUser={deleteUser} />
        ))}
      </div>
      {/* Modal Xóa */}
      <div id="deleteModal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Xác nhận xóa</h5>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
              <input type="hidden" name="deleteId" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
              <button type="button" className="btn btn-danger" onClick={deleteUserAction}>Xóa</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
