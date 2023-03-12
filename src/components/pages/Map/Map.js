import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import styles from "./Map.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { RiCloseLine } from "react-icons/ri";
import { BsLayersHalf } from "react-icons/bs";

function Map() {
  // use this state to return to the previous page (NewForm or EditForm)
  const { state } = useLocation();
  const [libraries] = useState(["places"]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <LoadMap page_link={state?.page_link} />;
}

function LoadMap({ page_link }) {
  const [center, setCenter] = useState({ lat: 53.3498114, lng: -6.2602525 });
  const [zoom, setZoom] = useState(12);
  const [selected, setSelected] = useState(null);
  const [location, setLocation] = useState("");
  const [mapType, setMapType] = useState("roadmap");
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
      navigate(page_link, {
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

  function changeMapView() {
    if (mapType === "roadmap") setMapType("satellite");
    else setMapType("roadmap");
  }

  const style = {
    margin: "5px 15px",
    fontSize: "34px",
    color: "var(--primary-color)",
    cursor: "pointer",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
  };

  return (
    <div className={styles.map_container}>
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
          rotateControl: false,
          zoomControl: false,
          mapTypeControl: false,
          mapTypeId: mapType,
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
      <div className={styles.btns_container}>
        <BsLayersHalf
          style={{...style, padding: "4px"}}
          onClick={changeMapView}
        />
        <RiCloseLine
          style={style}
          onClick={() => navigate(-1)}
        />
      </div>
      <button className={styles.btn_save} onClick={onSave}>
        Save
      </button>
    </div>
  );
}

export default Map;
