import { useEffect } from "react";
import Toast from "../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userReducer";
import UserCard from "../components/UserCard";

export default function Admin() {
  const { users, loading, error, msg } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(users);


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      {msg && <Toast msg={msg} />}
      {loading && <span className="loading loading-bars loading-lg"></span>}
      {!loading && error ? <div>Error: {error}</div> : null}

      <div className="mt-14 mb-20 overflow-y-auto">
        <h1 className="font-bold font-mono text-4xl float-left">User</h1>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            <div className="flex flex-col md:flex-row">
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
