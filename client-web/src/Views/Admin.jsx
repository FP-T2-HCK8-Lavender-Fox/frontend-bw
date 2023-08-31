import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import AdminCard from "../components/AdminCard";
import Register from "../components/Register";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins } from "../store/adminReducer";
import { Plus } from "lucide-react";

export default function Admin() {
  const { admins, loading, error, msg } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [registerModal, setRegisterModal] = useState(false);
  const handleOnClose = () => setRegisterModal(false);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  return (
    <>
      {msg && <Toast msg={msg} />}
      {loading && <span className="loading loading-bars loading-lg"></span>}
      {!loading && error ? <div>Error: {error}</div> : null}

      <div className="mt-10 mb-12 w-full h-full flex-wrap overflow-x-auto">
        <div className="leading-4">
          <h1 className="font-bold font-mono text-4xl float-left">Admin</h1>
          <div
            className="tooltip float-right tooltip-left"
            data-tip="Register Admin"
          >
            <button
              className="btn btn-primary btn-md btn-circle"
              onClick={() => setRegisterModal(true)}
            >
              <Plus />
            </button>
          </div>
        </div>
        <div className="hero">
          <div className="hero-content">
            <div className="md:w-full lg:w-screen z-10 sm:grid md:grid md:grid-cols-2 lg:grid-cols-5">
              {!loading && admins.length ? (
                admins.map((admin) => {
                  return <AdminCard admin={admin} key={admin.id} />;
                })
              ) : (
                <span className="loading loading-spinner text-neutral"></span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Register visible={registerModal} onClose={handleOnClose} />
    </>
  );
}
