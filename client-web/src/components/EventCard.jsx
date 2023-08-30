import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchEvents,
  deleteEventById,
  setMsgEvent,
  patchStatusEventById,
} from "../store/eventReducer";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";

export default function EventCard({ event }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteEventById(event.id));
    await dispatch(fetchEvents());
    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  const patchStatus = async () => {
    if (event.active) {
      await dispatch(patchStatusEventById({ id: event.id, status: false }));
    } else await dispatch(patchStatusEventById({ id: event.id, status: true }));
    await dispatch(fetchEvents());
    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  return (
    <>
      <div
        className={
          event.active
            ? "card my-2 sm:w-11/12 h-full bg-base-100 shadow-lg mx-2 hover:scale-105 ease-in duration-200 overflow-hidden"
            : "card my-2 sm:w-11/12 h-full bg-base-100 shadow-lg mx-2 hover:scale-105 ease-in duration-200 overflow-hidden"
        }
      >
        <figure>
          <Link to={`/events/` + event.id}>
            <img src={event.pics} alt="Shoes" className="w-full" />
          </Link>
        </figure>
        <div className="card-body pt-2 h-10 hover:h-full transition-all">
          <div className="flex leading-4 ">
            <h2 className="card-title">{event.name}</h2>
            <p className="m-1 badge badge-neutral ml-16">
              {event.Category.name}
            </p>
          </div>
          <p>
            Prize pool:{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(event.amount)}
          </p>
          <p>Start : {moment(event.startDate).format("LLLL")}</p>
          <p>End : {moment(event.endDate).format("LLLL")}</p>
          <div className="card-actions justify-between">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-1">Active</span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={event.active}
                  onChange={patchStatus}
                />
              </label>
            </div>
            <div>
              <Link to={"/edit-events/" + event.id}>
                <button className="btn btn-primary mx-1">Edit</button>
              </Link>
              <button className="btn btn-primary" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};
