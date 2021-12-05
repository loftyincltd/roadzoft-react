import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import * as Icon from "react-feather";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


export default function MapModal({ latitude, longitude, apiKey }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // @ts-ignore
  // eslint-disable-next-line import/no-webpack-loader-syntax
  mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

  const navControlStyle= {
    right: 10,
    top: 10
  };

  return (
    <div>
      <Button
        style={{ borderRadius: 50, background: "#035C36" }}
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        Open Map
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ReactMapGL
            mapboxApiAccessToken={apiKey}
            latitude={latitude}
            longitude={longitude}
            zoom={11}
            width="100%"
            height="100%"
          >
            <Marker
              latitude={latitude}
              longitude={longitude}
              offsetLeft={200}
              offsetTop={200}
            >
              <Icon.MapPin fill="red" />
            </Marker>
            <NavigationControl style={navControlStyle} />
          </ReactMapGL>
        </Box>
      </Modal>
    </div>
  );
}
