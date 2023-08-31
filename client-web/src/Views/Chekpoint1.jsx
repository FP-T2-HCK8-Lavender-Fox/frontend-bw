import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setCheckpoint1 } from "../store/checkpointReducer";
import { Link } from "react-router-dom";

import MapModal from "../components/MapModal";

export default function AddEvent() {
  const dispatch = useDispatch();

  const { checkpoint1 } = useSelector((state) => state.checkpoint);

  const [mapModal, setMapModal] = useState(false);
  const handleOnCloseMap = () => setMapModal(false);

  const onChangeInput = ({ target: { name, value } }) => {
    dispatch(setCheckpoint1({ ...checkpoint1, [name]: value }));
  };


  const changeOnDrag = ({ lat, long }) => {
    try {
      dispatch(
        setCheckpoint1({
          ...checkpoint1,
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
        setCheckpoint1({
          ...checkpoint1,
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
        setCheckpoint1({
          ...checkpoint1,
          lat: lat,
          long: long,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={
          "border shadow-2xl rounded-2xl mt-10 mb-12 w-screen h-full overflow-y-auto"
        }
      >
        <div className="hero-content flex-col w-screen">
          <div className="card-body text-black">
            <button
              className="my-2 btn btn-primary btn-sm lg:btn-md"
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
              lati={checkpoint1.lat}
              longi={checkpoint1.long}
            />
            <form>
              <h1 className="card-title font-mono">Add Checkpoint 1</h1>
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
                  value={checkpoint1.name}
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
                  value={checkpoint1.question}
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
                  value={checkpoint1.trueAnswer}
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
                  value={checkpoint1.wrongAnswerOne}
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
                  value={checkpoint1.wrongAnswerTwo}
                  onChange={onChangeInput}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <br />
              <div className="flex flex-row justify-center">
                <Link to="/add-events">
                  <button
                    className="btn btn-shadow btn-primary w-full"
                    value="create"
                  >
                    Back
                  </button>
                </Link>
                <Link to="/checkpoint-2">
                  <button
                    className="ml-2 btn btn-shadow btn-primary w-full"
                    value="next"
                  >
                    next
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
