import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchEvents, editEventById, setMsgEvent } from "../store/eventReducer";
import { fetchCategories } from "../store/categoryReducer";
import moment from "moment";

export default function EventForm({ visible, onClose, event }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.event);
  const { categories } = useSelector((state) => state.category);

  const [eventState, setEventState] = useState({
    name: "",
    startDate: "",
    endDate: "",
    active: true,
    description: "",
    amount: "",
    address: "",
    lat: "",
    long: "",
    CategoryId: 0,
    pics: "",
  });

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const onChangeInput = ({ target: { name, value, files } }) => {
    if (name === "pics") setEventState({ ...eventState, [name]: files[0] });
    else setEventState({ ...eventState, [name]: value });
    // console.log(eventState);
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    await dispatch(editEventById(eventState));
    await dispatch(fetchEvents());
    setEventState({
      name: "",
      startDate: "",
      endDate: "",
      active: true,
      description: "",
      amount: "",
      address: "",
      lat: "",
      long: "",
      CategoryId: 0,
    });
    onClose();
    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  useEffect(() => {
    if (event) setEventState(event);
    dispatch(fetchCategories());
  }, [event, dispatch]);

  if (!visible) return null;
  return (
    <>
      <div
        id="container"
        onClick={handleOnClose}
        className={
          "fixed z-50 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
        }
      >
        <div className={"overflow-y-auto h-5/6"}>
          <div className={"hero-content text-center bg-neutral"}>
            <div className={"card bg-neutral w-96"}>
              <button
                onClick={onClose}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <div className="card-body text-black lg:flex-row"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

EventForm.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
