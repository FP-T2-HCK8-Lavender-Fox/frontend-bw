import PropTypes from "prop-types";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";
import CategoryForm from "../components/CategoryForm";

export default function TableRow({ category }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const handleOnCloseDelete = () => setDeleteModal(false);

  const [categoryModal, setCategoryModal] = useState(false);
  const handleOnCloseCategory = () => setCategoryModal(false);

  return (
    <>
      <tr className="hover font-mono text-black font-bold text-lg">
        <td>{category.name}</td>
        <td className="space-x-6 items-center">
          <button
            className="btn btn-info btn-xs sm:btn-sm md:btn-md"
            onClick={() => setCategoryModal(true)}
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteModal(true)}
            className="btn btn-primary btn-xs sm:btn-sm md:btn-md "
          >
            Delete
          </button>
        </td>
      </tr>
      <DeleteModal
        visible={deleteModal}
        onClose={handleOnCloseDelete}
        category={category}
      />
      <CategoryForm
        visible={categoryModal}
        onClose={handleOnCloseCategory}
        category={category}
      />
    </>
  );
}

TableRow.propTypes = {
  category: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
