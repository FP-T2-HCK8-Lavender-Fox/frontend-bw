import PropTypes from "prop-types";
import { useState } from "react";
import EventForm from "../components/EventForm";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom";

export default function TableRow({ event }) {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const handleOnCloseDelete = () => setDeleteModal(false);

  const [eventModal, setEventModal] = useState(false);
  const handleOnCloseEvent = () => setEventModal(false);

  const showDetail = (e) => {
    if (e.target.id === "container") navigate("/events/" + event.id);
  };

  return (
    <>
      <tr
        id="container"
        className="hover font-mono text-black font-bold text-lg"
        onClick={showDetail}
      >
        <td id="container">{event.name}</td>
        <td id="container">
          <div className="avatar w-24 rounded-full">
            <img src={event.pics} alt={event.name} />
          </div>
        </td>
        <td id="container">{event.Category.name}</td>
        <td id="container">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(event.amount)}
        </td>
        <td id="container">{event.address}</td>
        <td id="container">{event.Admin.username}</td>
        <td className="lg:space-x-6 lg:items-center">
          <button
            className="my-2 btn btn-primary btn-sm lg:btn-md"
            onClick={() => setEventModal(true)}
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteModal(true)}
            className="btn btn-primary btn-sm lg:btn-md"
          >
            Delete
          </button>
        </td>
      </tr>
      <DeleteModal
        visible={deleteModal}
        onClose={handleOnCloseDelete}
        event={event}
      />
      <EventForm
        visible={eventModal}
        onClose={handleOnCloseEvent}
        event={event}
      />
    </>
  );
}

TableRow.propTypes = {
  event: PropTypes.object,
};
