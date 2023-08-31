import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import CategoryForm from "../components/CategoryForm";
import CategoryCard from "../components/CategoryCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../store/categoryReducer";
import { Plus } from "lucide-react";

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
      {msg && <Toast msg={msg} />}
      <div className="mt-10 mb-12 w-full h-full flex-wrap overflow-x-auto">
        <div className="leading-4">
          <h1 className="font-bold font-mono text-4xl float-left">Category</h1>
          <div
            className="tooltip float-right tooltip-left"
            data-tip="Add Category"
          >
            <button
              className="btn btn-primary btn-md btn-circle"
              onClick={() => setCategoryModal(true)}
            >
              <Plus />
            </button>
          </div>
        </div>
        <div className="hero">
          <div className="hero-content">
            <div className="md:w-full lg:w-screen z-10 sm:grid md:grid md:grid-cols-2 lg:grid-cols-5">
              {loading && (
                <span className="loading loading-bars loading-lg"></span>
              )}
              {!loading && error ? <div>Error: {error}</div> : null}
              {!loading && categories.length ? (
                categories.map((category) => {
                  return <CategoryCard category={category} key={category.id} />;
                })
              ) : (
                <span className="loading loading-spinner text-neutral"></span>
              )}
            </div>
          </div>
        </div>
      </div>
      <CategoryForm visible={categoryModal} onClose={handleOnClose} />
    </>
  );
}
