import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChangeInput = ({ target: { name, value } }) => {
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      };

      const response = await fetch(
        `http://localhost:3000/admin/login`,
        options
      );

      const data = await response.json();

      if (data.message) throw data.message;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.username);

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row text-center ">
        <img src="/icon.png" className="max-w-sm rounded-lg bg-white" />
        <div className="card w-96 bg-neutral">
          <div className="card-body text-black">
            <h1 className="card-title font-mono">Login</h1>
            <form method="post" onSubmit={handleLogin}>
              <div className="form-control w-full max-w-xs">
                <label className="label ">
                  <span className="label-text text-black font-bold font-mono">
                    Username
                  </span>
                </label>
                <input
                  id="key"
                  type="text"
                  name="username"
                  onChange={onChangeInput}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-black font-bold font-mono">
                    Password
                  </span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={onChangeInput}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs text-black"
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
                  value="Sign In"
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
