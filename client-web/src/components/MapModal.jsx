import { GoogleMap } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

import { Autocomplete, MarkerF } from "@react-google-maps/api";

import { getGeocode, getLatLng } from "use-places-autocomplete";

import Geocode from "react-geocode";
import { useSelector, useDispatch } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "30rem",
};

import { setEventForm } from "../store/eventReducer";

Geocode.setApiKey(import.meta.env.VITE_GOOGLE_MAP_API_KEY);

export default function MapModal({
  visible,
  onClose,
  handleOnDrag,
  handleOnClick,
  handleOnSelect,
  lati,
  longi,
}) {
  const dispatch = useDispatch();
  const { eventForm } = useSelector((state) => state.event);
  const zoom = 15

  const [map, setMap] = useState(null);

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(lati === "" ? -6.175063922825402 : lati);
  const [long, setLong] = useState(longi === "" ? 106.82721465415136 : longi);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    map.setZoom(zoom);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  const onChangeInput = async (e) => {
    setAddress(e.target.value);
    await dispatch(
      setEventForm({
        ...eventForm,
        address: e.target.value,
      })
    );
  };

  const handleSelect = async (e) => {
    try {
      let adrs = e.target.value;
      const results = await getGeocode({ address: adrs });
      const { lat, lng } = await getLatLng(results[0]);
      setLat(lat);
      setLong(lng);
      setAddress(adrs);
      handleOnSelect({ lat, long, address });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickOutside = async () => {
    onClose();
  };

  const handleClick = async (e) => {
    try {
      const long = e.latLng.lng();
      const lat = e.latLng.lat();
      const res = await Geocode.fromLatLng(lat, long);
      const address = res.results[0].formatted_address;
      handleOnClick({ lat, long, address });
      setAddress(address);
      setLat(lat);
      setLong(long);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrag = async (e) => {
    try {
      const long = e.latLng.lng();
      const lat = e.latLng.lat();
      const res = await Geocode.fromLatLng(lat, long);
      const address = res.results[0].formatted_address;
      handleOnDrag({ lat, long, address });
      setLat(lat);
      setLong(long);
      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed z-30 inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className=" w-3/5 h-5/6 bg-white">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: lat, lng: long }}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleClick}
        >
          <MarkerF
            draggable
            onDragEnd={handleDrag}
            position={{ lat: lat, lng: long }}
          ></MarkerF>
        </GoogleMap>
        <div className="form-control items-center">
          <label htmlFor="name" className="label">
            <span className="label-text text-black font-bold font-mono text-lg">
              Address
            </span>
          </label>
          <div className="flex flex-row">
            <Autocomplete>
              <input
                id="address"
                type="text"
                name="address"
                value={address}
                onChange={onChangeInput}
                onSelect={handleSelect}
                className="input input-bordered w-full max-w-xs"
              />
            </Autocomplete>
            <button
              className="btn btn-primary ml-1"
              onClick={handleOnClickOutside}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
MapModal.propTypes = {
  visible: PropTypes.bool,
  lati: PropTypes.number,
  longi: PropTypes.number,
  onClose: PropTypes.func,
  handleOnDrag: PropTypes.func,
  handleOnClick: PropTypes.func,
  handleOnSelect: PropTypes.func,
};

MapModal.defaultProps = {
  lati: -6.175063922825402,
  longi: 106.82721465415136,
};
