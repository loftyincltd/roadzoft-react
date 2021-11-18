import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as Item from "@mui/material";
import { API_BASE } from "../../utils/Api";
import Moment from "react-moment";
import ProjectTable from "../../components/tables/ProjectTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ReportQuery({
  uuid,
  reject,
  query,
  reportId,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState("");


  const getComments = async () => {
    const response = await fetch(`${API_BASE}/queried/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setComments(result.data);
    console.log("Comments", result);
  };

  const postComments = async () => {
    const response = await fetch(`${API_BASE}/queried`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        report_id: reportId,
        comment: comment,
      }),
    });
    const result = await response.json();
    getComments();
    setComment("")
    console.log("Comments", result);
  };
  const approve = async (reportId, commentId) => {
    const response = await fetch(`${API_BASE}/queried/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        report_uuid: reportId,
        comment_uuid: commentId,
      }),
    });
    const result = await response.json();
    getComments();
    console.log("Comments", result);
  };

  React.useEffect(() => {
    getComments();
  }, []);

  const columns = [
    { selector: "comment", name: "Comment", sortable: true },
    {
      selector: "created_at",
      name: "Date",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return <Moment fromNow>{row.created_at}</Moment>;
      },
    },
    {
        selector: "id",
        name: "",
        sortable: true,
        ignoreRowClick: true,
        cell: (row) => {
          return <Item.Button onClick={() => approve(row.report_uuid, uuid)} color="primary" variant="outlined">
          Approve
        </Item.Button>;
        },
      },
  ]

  return (
    <div>
      <Button onClick={handleOpen}>Report Queries</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments:
          </Typography>

          {comments != [] ? (
       
              <ProjectTable columns={columns} data={comments} />
         
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              No Comments for this report
            </Typography>
          )}
          <div className="flex flex-row justify-evenly items-center my-5">
            <Item.TextField
            style={{width: 500}}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              id="outlined-textarea"
              label="Comment"
              placeholder="Comment..."
              multiline
            />
            <Item.Button
              onClick={postComments}
              color="success"
              variant="contained"
            >
              Post
            </Item.Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
