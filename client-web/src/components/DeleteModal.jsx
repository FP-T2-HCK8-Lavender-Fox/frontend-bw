import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  fetchAdmins,
  deleteAdminById,
  setMsgAdmin,
} from "../store/adminReducer";
import {
  fetchCategories,
  deleteCategoryById,
  setMsgCategory,
} from "../store/categoryReducer";

export default function Modal({ visible, onClose, admin, category }) {
  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const dispatch = useDispatch();

  const handleDeleteAdmin = async () => {
    await dispatch(deleteAdminById(admin.id));
    await dispatch(fetchAdmins());
    setTimeout(() => {
      dispatch(setMsgAdmin(""));
    }, 2000);
  };

  const handleDeleteCategory = async () => {
    await dispatch(deleteCategoryById(category.id));
    await dispatch(fetchCategories());
    setTimeout(() => {
      dispatch(setMsgCategory(""));
    }, 2000);
  };

  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="card bg-neutral w-96">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="card-body text-black">
          {admin && (
            <h1 className="card-title font-mono">
              Are you sure to delete {admin.username} admin account ?
            </h1>
          )}
          {category && (
            <h1 className="card-title font-mono">
              Are you sure to delete {category.name} category ?
            </h1>
          )}
          <div className="card-actions justify-center">
            {admin && (
              <button
                onClick={handleDeleteAdmin}
                className="btn btn-primary btn-xs sm:btn-sm md:btn-md w-1/3 "
              >
                Yes
              </button>
            )}
            {category && (
              <button
                onClick={handleDeleteCategory}
                className="btn btn-primary btn-xs sm:btn-sm md:btn-md w-1/3"
              >
                Yes
              </button>
            )}
            <button
              onClick={onClose}
              className="btn btn-primary btn-xs sm:btn-sm md:btn-md w-1/3"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  admin: PropTypes.object,
  category: PropTypes.object,
};
