import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import { Fragment, useCallback, useState } from "react";
const containerStyle = {
  width: "50%",
  height: "20vh",
};

const markers = [
  {
    id: 1,
    name: "Qobustan",
    position: { lat: 40.0709493, lng: 49.3694411 },
  },
  {
    id: 2,
    name: "Sumqayit",
    position: { lat: 40.5788843, lng: 49.5485073 },
  },
  {
    id: 3,
    name: "Baku",
    position: { lat: 40.3947365, lng: 49.6898045 },
  },
];

const center = {
  lat: 40.3947365,
  lng: 49.6898045,
};

export default function Map() {
  const [map, setMap] = useState(null);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      <Autocomplete>
        <input type="text" placeholder="Origin" />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onClick={() => setActiveMarker(null)}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map(({ id, name, position }) => (
          <MarkerF
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
            // icon={{
            //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
            //   scaledSize: { width: 50, height: 50 }
            // }}
          >
            {activeMarker === id ? (
              <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <p>{name}</p>
                </div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
        ))}
      </GoogleMap>
    </>
  );
}
