import PropTypes from "prop-types";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";

export default function TableRow({ admin }) {

  const [deleteModal, setDeleteModal] = useState(false);
  const handleOnClose = () => setDeleteModal(false);

  return (
    <>
      <tr className="hover font-mono text-black font-bold text-lg">
        <td>{admin.username}</td>
        <td>{admin.name}</td>
        <td>{admin.email}</td>
        <td className="space-x-6 items-center">
          <button
            onClick={() => setDeleteModal(true)}
            className="btn btn-primary sm:btn-sm md:btn-md "
          >
            Delete
          </button>
        </td>
      </tr>
      <DeleteModal visible={deleteModal} onClose={handleOnClose} admin={admin} />
    </>
  );
}

TableRow.propTypes = {
  admin: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
