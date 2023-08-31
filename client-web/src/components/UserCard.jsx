import { useState } from "react";
import PropTypes from "prop-types";
import DeleteModal from "./DeleteModal";

export default function UserCard({ user }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const handleOnClose = () => setDeleteModal(false);

  return (
    <>
      <div className="z-20 card group m-4 bg-neutral shadow-lg hover:scale-105 ease-in duration-200 self-start">
        <div className="card-body pt-2 h-10 hover:h-72 ease-in-out duration-200 overflow-hidden">
          <div className="flex leading-4">
            <h2 className="card-title">{user.name}</h2>
          </div>
          <p>Gender: {user.gender}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Ktp: {user.ktpId}</p>
          <button
            className="btn btn-primary w-1/2 btn-md"
            onClick={() => setDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <DeleteModal visible={deleteModal} onClose={handleOnClose} user={user} />
    </>
  );
}

UserCard.propTypes = {
  user: PropTypes.object,
};
