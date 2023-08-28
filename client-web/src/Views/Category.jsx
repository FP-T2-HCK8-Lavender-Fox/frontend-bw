import { useEffect, useState } from "react";
import CategoryRow from "../components/CategoryRow";
import CategoryForm from "../components/CategoryForm";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../store/categoryReducer";

export default function Genre() {
  const { categories, loading, error, msg } = useSelector(
    (state) => state.category
  );
  const dispatch = useDispatch();

  const [categoryModal, setCategoryModal] = useState(false);
  const handleOnClose = () => setCategoryModal(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      {msg && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info m-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{msg}</span>
          </div>
        </div>
      )}
      <div className="hero bg-base-100">
        <div className="hero-content">
          <div>
            <div className="hero-content">
              <h1 className="font-mono font-bold text-black text-4xl">
                Categories
              </h1>
              <button
                className="btn btn-primary btn-xs sm:btn-sm md:btn-md"
                onClick={() => setCategoryModal(true)}
              >
                add Category
              </button>
            </div>
            <div className="overflow-x-auto">
              {loading && (
                <span className="loading loading-spinner text-neutral"></span>
              )}
              {!loading && error ? <div>Error: {error}</div> : null}
              {!loading && categories.length ? (
                <table className="table bg-neutral">
                  <thead>
                    <tr className="font-mono text-black font-bold text-2xl">
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => {
                      return (
                        <CategoryRow key={category.id} category={category} />
                      );
                    })}
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
        <CategoryForm visible={categoryModal} onClose={handleOnClose} />
      </div>
    </>
  );
}
