import { useEffect, useState } from "react";
import AdminRow from "../components/AdminRow";
import Register from "../components/Register";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins } from "../store/adminReducer";

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
      <div className="hero bg-base-100 overflow-y-auto">
        <div className="hero-content">
          <div>
            <div className="hero-content justify-between">
              <h1 className="font-mono font-bold text-4xl">Admins</h1>
              <button
                className="btn btn-primary xs:btn-md md:btn-md"
                onClick={() => setRegisterModal(true)}
              >
                Register a New Admin
              </button>
            </div>
            <div className="overflow-x-auto">
              {loading && (
                <span className="loading loading-bars loading-lg"></span>
              )}
              {!loading && error ? <div>Error: {error}</div> : null}
              <table className="table bg-neutral">
                <thead>
                  <tr className="font-mono text-black font-bold text-2xl">
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && admins.length
                    ? admins.map((admin) => {
                        return <AdminRow key={admin.id} admin={admin} />;
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Register visible={registerModal} onClose={handleOnClose} />
      </div>
    </>
  );
}
