import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setCheckpoint1,
  setCheckpoint2,
  setCheckpoint3,
} from "../store/checkpointReducer";
import { useNavigate } from "react-router-dom";
import { fetchEvents, postEvent, setMsgEvent } from "../store/eventReducer";
import { Link } from "react-router-dom";

import MapModal from "./MapModal";
var event;

export default function AddEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { checkpoint1, checkpoint2, checkpoint3 } = useSelector(
    (state) => state.checkpoint
  );

  const { eventForm, loading } = useSelector((state) => state.event);
  const [eventPost, setEventPost] = useState(null);
  const [checkpoints, setCheckpoints] = useState(null);

  const [mapModal, setMapModal] = useState(false);
  const handleOnCloseMap = () => setMapModal(false);

  const onChangeInput = ({ target: { name, value } }) => {
    dispatch(setCheckpoint3({ ...checkpoint3, [name]: value }));
  };

  const changeOnDrag = ({ lat, long }) => {
    try {
      dispatch(
        setCheckpoint3({
          ...checkpoint3,
          lat: lat,
          long: long,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const changeOnClick = ({ lat, long }) => {
    try {
      dispatch(
        setCheckpoint3({
          ...checkpoint3,
          lat: lat,
          long: long,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const changeOnSelect = ({ lat, long }) => {
    try {
      dispatch(
        setCheckpoint3({
          ...checkpoint3,
          lat: lat,
          long: long,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    eventPost.checkpoints = JSON.stringify(checkpoints);

    await dispatch(postEvent(eventPost));
    await dispatch(
      setCheckpoint1({
        name: "",
        lat: "",
        long: "",
        question: "",
        trueAnswer: "",
        wrongAnswerOne: "",
        wrongAnswerTwo: "",
      })
    );
    await dispatch(
      setCheckpoint2({
        name: "",
        lat: "",
        long: "",
        question: "",
        trueAnswer: "",
        wrongAnswerOne: "",
        wrongAnswerTwo: "",
      })
    );
    await dispatch(
      setCheckpoint3({
        name: "",
        lat: "",
        long: "",
        question: "",
        trueAnswer: "",
        wrongAnswerOne: "",
        wrongAnswerTwo: "",
      })
    );
    await dispatch(fetchEvents());

    navigate("/");
    setTimeout(() => {
      dispatch(setMsgEvent(""));
    }, 2000);
  };

  useEffect(() => {
    event = Object.assign({}, eventForm);
    setEventPost(event);
  }, []);

  useEffect(
    () => setCheckpoints([checkpoint1, checkpoint2, checkpoint3]),
    [checkpoint3]
  );

  return (
    <>
      <div className="border shadow-2xl rounded-2xl mt-10 mb-12 w-screen h-full overflow-y-auto">
        <div className="hero-content flex-col w-screen ">
          <div className="card-body text-black">
            <button
              className="btn btn-primary btn-sm lg:btn-md"
              onClick={() => setMapModal(true)}
            >
              Map
            </button>
            <MapModal
              visible={mapModal}
              onClose={handleOnCloseMap}
              handleOnDrag={changeOnDrag}
              handleOnClick={changeOnClick}
              handleOnSelect={changeOnSelect}
              lati={checkpoint3.lat}
              longi={checkpoint3.long}
            />
            <form>
              <h1 className="card-title font-mono">Add Checkpoint 3</h1>
              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text text-black font-bold font-mono text-lg">
                    Name
                  </span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={checkpoint3.name}
                  onChange={onChangeInput}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-black font-bold font-mono text-lg">
                    Question
                  </span>
                </label>
                <input
                  id="question"
                  type="text"
                  name="question"
                  value={checkpoint3.question}
                  onChange={onChangeInput}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs mr-3">
                <label className="label">
                  <span className="label-text text-black font-bold font-mono text-lg">
                    True Answer
                  </span>
                </label>
                <input
                  id="trueAnswer"
                  type="text"
                  name="trueAnswer"
                  value={checkpoint3.trueAnswer}
                  onChange={onChangeInput}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-black font-bold font-mono text-lg">
                    Wrong Answer One
                  </span>
                </label>
                <input
                  id="wrongAnswerOne"
                  type="text"
                  name="wrongAnswerOne"
                  value={checkpoint3.wrongAnswerOne}
                  onChange={onChangeInput}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-black font-bold font-mono text-lg">
                    Wrong Answer Two
                  </span>
                </label>
                <input
                  id="wrongAnswerTwo"
                  type="text"
                  name="wrongAnswerTwo"
                  value={checkpoint3.wrongAnswerTwo}
                  onChange={onChangeInput}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <br />
              {loading ? (
                <button className="btn btn-shadow btn-primary w-1/2">
                  <span className="loading loading-spinner loading-md "></span>
                </button>
              ) : (
                <div className="flex flex-row justify-center">
                  <Link to="/checkpoint-2">
                    <button
                      className="btn btn-shadow btn-primary w-full"
                      value="create"
                    >
                      Back
                    </button>
                  </Link>
                  <button
                    className="ml-2 btn btn-shadow btn-primary w-1/2"
                    value="create"
                    onClick={handleAddEvent}
                  >
                    Create
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
