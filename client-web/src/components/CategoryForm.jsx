import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  postCategory,
  editCategoryById,
  setMsgCategory,
} from "../store/categoryReducer";
import PropTypes from "prop-types";

export default function CategoryForm({ visible, onClose, category }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.category);

  const [categoryState, setCategoryState] = useState({
    name: "",
  });


  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const onChangeInput = ({ target: { name, value } }) => {
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    await dispatch(postCategory(categoryState));
    await dispatch(fetchCategories());
    setCategoryState({ name: "" });
    onClose();
    setTimeout(() => {
      dispatch(setMsgCategory(""));
    }, 2000);
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    await dispatch(editCategoryById(categoryState));
    await dispatch(fetchCategories());
    setCategoryState({ name: "" });
    onClose();
    setTimeout(() => {
      dispatch(setMsgCategory(""));
    }, 2000);
  };

  useEffect(() => {
    if (category) setCategoryState(category);
  }, [category]);

  if (!visible) return null;
  return (
    <>
      <div
        id="container"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="hero-content text-center bg-neutral rounded-3xl">
          <div className="card bg-neutral w-96">
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="card-body text-black">
              <h1 className="card-title font-mono">Add Category</h1>
              <form>
                <div className="form-control w-full max-w-xs">
                  <label htmlFor="name" className="label">
                    <span className="label-text text-black font-bold font-mono text-lg">
                      Name
                    </span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={categoryState.name}
                    onChange={onChangeInput}
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <br />
                {category ? (
                  loading ? (
                    <button className="btn btn-shadow btn-primary w-1/2">
                      <span className="loading loading-spinner loading-md "></span>
                    </button>
                  ) : (
                    <input
                      className="btn btn-shadow btn-primary w-1/2"
                      type="button"
                      onClick={handleEditCategory}
                      value="Edit"
                    />
                  )
                ) : loading ? (
                  <button className="btn btn-shadow btn-primary w-1/2">
                    <span className="loading loading-spinner loading-md "></span>
                  </button>
                ) : (
                  <input
                    className="btn btn-shadow btn-primary w-1/2"
                    type="button"
                    onClick={handleAddCategory}
                    value="Add"
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CategoryForm.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  category: PropTypes.object,
};
