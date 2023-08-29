import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/eventReducer";
import Toast from "../components/Toast";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export default function Movie() {
  const dispatch = useDispatch();
  const { events, loading, error, msg } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
      {msg && <Toast msg={msg} />}
      {loading && (
        <span className="loading loading-spinner text-neutral"></span>
      )}
      {!loading && error ? <div>Error: {error}</div> : null}

      <div className="mt-14 mb-20 overflow-y-auto">
        <div className="tooltip float-right tooltip-left" data-tip="Add Event">
          <Link to="/add-events">
            <button className="btn btn-primary btn-md btn-circle">
              <Plus />
            </button>
          </Link>
        </div>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            <div className="flex flex-col md:flex-row">
              {!loading && events.length ? (
                events.map((event) => {
                  return <Card event={event} key={event.id} />;
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
