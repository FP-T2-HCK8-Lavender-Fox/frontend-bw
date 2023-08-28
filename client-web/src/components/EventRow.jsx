import PropTypes from "prop-types";
import { useState } from "react";
import EventForm from "../components/EventForm";
import DeleteModal from "../components/DeleteModal";

export default function TableRow({ event }) {

  const [deleteModal, setDeleteModal] = useState(false);
  const handleOnCloseDelete = () => setDeleteModal(false);

  const [eventModal, setEventModal] = useState(false);
  const handleOnCloseEvent = () => setEventModal(false);

  return (
    <>
      <tr className="hover font-mono text-black font-bold text-lg">
        <td>{event.name}</td>
        <td>
          <div className="avatar w-24 rounded-full">
            <img src={event.pics} alt={event.title} />
          </div>
        </td>
        <td>{event.Category.name}</td>
        <td>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(event.amount)}
        </td>
        <td>{event.address}</td>
        <td>{event.Admin.username}</td>
        <td className="space-x-6 items-center">
          <button
            className=" btn btn-primary btn-xs sm:btn-sm md:btn-md"
            onClick={() => setEventModal(true)}
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteModal(true)}
            className="  btn btn-primary btn-xs sm:btn-sm md:btn-md "
          >
            Delete
          </button>
        </td>
      </tr>
      <DeleteModal
        visible={deleteModal}
        onClose={handleOnCloseDelete}
        category={event}
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
