import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { RiCloseLine } from "react-icons/ri";

function Map() {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <LoadMap />;
}

function LoadMap() {
  const [center, setCenter] = useState({ lat: 53.3498114, lng: -6.2602525 });
  const [zoom, setZoom] = useState(12);
  const [selected, setSelected] = useState(null);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    // Anything in here is fired on component mount.
    document.body.style.overflow = "hidden";

    return () => {
      // Anything in here is fired on component unmount.
      document.body.style.overflow = "unset";
    };
  }, []);

  function onMarkerDragEnd(coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setSelected({ lat, lng });
  }

  const onMapClick = (e) => {
    setSelected({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  function onSave() {
    if (location && selected) {
      navigate("/new_form", {
        state: {
          location: location,
          coordinates: `${selected.lat} ${selected.lng}`,
        },
      });
    } else {
      let msgType = "error";
      let msgText = "Set address and coordinates before saving!";

      setFlashMessage(msgText, msgType);
    }
  }

  const style = {
    position: "absolute",
    top: "10px",
    right: "5px",
    zIndex: 15,
    fontSize: "40px",
    color: "var(--primary-color)",
    cursor: "pointer",
  };

  return (
    <div className={styles.map_container}>
      <RiCloseLine style={style} onClick={() => navigate(-1)} />
      <div className={styles.location_coordinates_container}>
        <PlacesAutocomplete
          setZoom={setZoom}
          setCenter={setCenter}
          setSelected={setSelected}
          selected={selected}
          setLocation={setLocation}
        />
      </div>

      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName={styles.map_container}
        onClick={onMapClick}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          keyboardShortcuts: false,
        }}
      >
        {selected && (
          <Marker
            position={selected}
            draggable={true}
            onDragEnd={(coord) => onMarkerDragEnd(coord)}
          />
        )}
      </GoogleMap>
      <button className={styles.btn_save} onClick={onSave}>
        Save
      </button>
    </div>
  );
}

export default Map;
