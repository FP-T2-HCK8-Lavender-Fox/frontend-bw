import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../store/eventReducer";
import Toast from "../components/Toast";
import EventCard from "../components/EventCard";
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

      <div className="border mt-10 mb-12 w-full h-full flex-wrap overflow-y-scroll">
        <div className="leading-4">
          <h1 className="font-bold font-mono text-4xl float-left">Events</h1>
          <div
            className="tooltip float-right tooltip-left"
            data-tip="Add Event"
          >
            <Link to="/add-events">
              <button className="btn btn-primary btn-md btn-circle">
                <Plus />
              </button>
            </Link>
          </div>
        </div>
        <div className="hero ">
          <div className="hero-content">
            <div className="border w-screen z-10 grid grid-cols-3 ">
              {!loading && events.length ? (
                events.map((event) => {
                  return <EventCard event={event} key={event.id} />;
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
