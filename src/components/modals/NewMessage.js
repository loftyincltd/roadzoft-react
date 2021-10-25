import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as Item from "@mui/material";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { API_BASE } from "../../utils/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewMessage({close}) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
   const [newtitle, setTitle] = React.useState("")
  const [newbody, setBody] = React.useState("") 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("sending")
     try {
      const response = await fetch(`${API_BASE}/message`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: newtitle,
          body: newbody
        })
      });
      const result = await response.json();
      setMessage(result.message)
      console.log("Send Message:", result);
    } catch (error) {
      console.log(error);
    } 
  }

  return (
    <div>
      <Button
        style={{ borderRadius: 50 }}
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        Compose
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Compose Message:
          </Typography>
          <form onSubmit={sendMessage} className="shadow rounded bg-gray-200 p-2 flex flex-col justify-center items-center">
            <div>
              <TextField
                style={{ width: 300, background: "white" }}
                placeholder="Type Name"
                onChange={(e) => setTitle(e.target.value)}
                id="outlined-basic"
                label="Title"
                variant="outlined"
              />
            </div>
            <div className="my-5">
              <TextareaAutosize
                minRows={4}
                aria-label="maximum height"
                placeholder="Message Body"
                onChange={(e) => setBody(e.target.value)}
                style={{ width: 300, height: 300 }}
              />
            </div>
            <div className="flex flex-row justify-between items-center my-5">
            <Item.Button type="submit" color="primary" variant="outlined">
              Send
            </Item.Button>
            <Item.Button onClick={close} color="primary" variant="outlined">
              Close
            </Item.Button>
          </div>
          </form>
          
          <div>
            {message && (
              <Item.Alert className="my-5" color="info" variant="filled">
                {message}
              </Item.Alert>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
