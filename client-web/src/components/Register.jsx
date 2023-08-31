import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  postAdmin,
  fetchAdmins,
  setMsgAdmin,
} from "../store/adminReducer";

export default function Register({ visible, onClose }) {
  const [registerState, setRegisterState] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const { loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const onChangeInput = ({ target: { name, value } }) => {
    setRegisterState({ ...registerState, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await dispatch(postAdmin(registerState));
    await dispatch(fetchAdmins());
    onClose();
    setTimeout(() => {
      dispatch(setMsgAdmin(""));
    }, 2000);
  };

  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="hero-content text-center bg-white rounded-3xl">
        <div className="card bg-white w-96">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="card-body text-black">
            <h1 className="card-title font-mono">Register a New Admin</h1>
            <form method="post" onSubmit={handleRegister}>
              <div className="form-control w-full max-w-xs">
                <label className="label ">
                  <span className="label-text text-black font-bold font-mono  text-lg">
                    Username
                  </span>
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  onChange={onChangeInput}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label ">
                  <span className="label-text text-black font-bold font-mono  text-lg">
                    Name
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={onChangeInput}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label ">
                  <span className="label-text text-black font-bold font-mono  text-lg">
                    Email
                  </span>
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  onChange={onChangeInput}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-black font-bold font-mono  text-lg">
                    Password
                  </span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={onChangeInput}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <br />
              {loading ? (
                <button className="btn btn-shadow btn-primary w-1/2">
                  <span className="loading loading-spinner loading-md "></span>
                </button>
              ) : (
                <input
                  className="btn btn-shadow btn-primary w-1/2"
                  type="submit"
                  value="Register"
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
