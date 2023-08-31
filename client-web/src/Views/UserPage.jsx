import { useEffect } from "react";
import Toast from "../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userReducer";
import UserCard from "../components/UserCard";

export default function Admin() {
  const { users, loading, error, msg } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      {msg && <Toast msg={msg} />}

      <div className="mt-10 mb-12 w-full h-full flex-wrap overflow-x-auto">
        <h1 className="font-bold font-mono text-4xl float-left">User</h1>
        <div className="hero">
          <div className="hero-content">
            <div className="md:w-full lg:w-screen z-10 sm:grid md:grid md:grid-cols-2 lg:grid-cols-3">
              {loading && (
                <span className="loading loading-bars loading-lg"></span>
              )}
              {!loading && error ? <div>Error: {error}</div> : null}
              {!loading && users.length ? (
                users.map((user) => {
                  return <UserCard user={user} key={user.id} />;
                })
              ) : (
                <span className="loading loading-spinner text-neutral"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
