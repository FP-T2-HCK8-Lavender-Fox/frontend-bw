import { useDispatch } from "react-redux";
import {
  fetchEvents,
  deleteEventById,
  setMsgEvent,
} from "../store/eventReducer";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";

export default function Card({ event }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteEventById(event.id));
    await dispatch(fetchEvents());
    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  return (
    <>
      <div className="card my-2 w-full h-full bg-base-100 shadow-lg mx-2 hover:scale-105 ease-in duration-200 overflow-hidden">
        <figure>
          <Link to={`/events/` + event.id}>
            <img src={event.pics} alt="Shoes" className="w-full" />
          </Link>
        </figure>
        <div className="card-body pt-2 h-10 w-full hover:h-full transition-all">
          <div className="flex leading-4">
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
          <div className="card-actions justify-end">
            <Link to={"/edit-events/" + event.id}>
              <button className="btn btn-primary">Edit</button>
            </Link>
            <button className="btn btn-primary" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  event: PropTypes.object,
};
