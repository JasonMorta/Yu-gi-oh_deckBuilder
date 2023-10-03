import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AlarmIcon from "@mui/icons-material/Alarm";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "./Card.css";



export default function CardPrevModal({ cardInfo }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    console.log("cardInfo", cardInfo);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [bgColor, ] = React.useState(cardInfo.type);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  //   maxWidth: "600px",
    width: "maxContent",
    maxWidth: "min-content",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
    // background: `url(${cardInfo.card_images[0].image_url_cropped})`,
    backgroundColor: "#e2e2e2",
    backgroundColor: `${
     
        
        bgColor.type === "Ritual Monster" ? "#FF9800" :
        bgColor.type === "Pendulum Effect Monster" ? "#E040FB" :
        bgColor.type === "Pendulum Normal Monster" ? "#E040FB" :
        bgColor.type === "Pendulum Tuner Effect Monster" ? "#E040FB" :
        bgColor.type === "Pendulum Flip Effect Monster" ? "#E040FB" :
        bgColor.type === "Pendulum Effect Fusion Monster" ? "#E040FB" :
        bgColor.type === "Pendulum Effect Synchro Monster" ? "#E040FB" :
        bgColor.type === "Pendulum Effect Xyz Monster" ? "#E040FB" :
        bgColor.type === "Pendulum Tuner Effect Fusion Monster" ? "#E040FB" :
        bgColor.type === "Pendulum Tuner Effect Synchro Monster" ? "#E040FB" :
        bgColor.type === "Pendulum Tuner Effect Xyz Monster" ? "#E040FB" :
        bgColor.type === "Link Monster" ? "#4CAF50" :
        bgColor.type === "Skill Card" ? "#03A9F4" :
        bgColor.type === "Token" ? "#FFC107" :
        bgColor.type === "Spell Card" ? "#03A9F4" :
        bgColor.type === "Trap Card" ? "#F44336" :
        bgColor.type === "Normal Monster" ? "#e6c07d" :
        bgColor.type === "Normal Tuner Monster" ? "#E040FB" :
        bgColor.type === "Flip Effect Monster" ? "#E040FB" :
        bgColor.type === "Flip Tuner Effect Monster" ? "#E040FB" :
        bgColor.type === "Toon Monster" ? "#E040FB" :
        bgColor.type === "Spirit Monster" ? "#E040FB" :
        bgColor.type === "Union Effect Monster" ? "#E040FB" :
        bgColor.type === "Gemini Monster" ? "#E040FB" : ""}`,
        

  };
  
  const modelBtn = {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 3,
    left: 0,
    top: 0,
   
  };









  return (
    <Container maxWidth="sm">
      <div className="model-btn" style={modelBtn} onClick={handleOpen}></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
 
          {/* //=========================// */}
          <Card  sx={style}>
            <CardActionArea>
              <LazyLoadImage
                id={`image-${cardInfo._id}`}
                alt={cardInfo.name}
                effect="blur"
                style={{
                  borderRadius: "3px",
                  height: "100%",
                  maxHeight: "642px",
                 
                  minHeight: "320px",
                  minWidth: "320px",
                  maxWidth: "642px",
                }}
                visibleByDefault={false}
                src={cardInfo.card_images[0].image_url} // use normal <img> attributes as props
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {cardInfo.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cardInfo.desc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cardInfo.type.includes("Monster") ? (
                    <div className="power-stat">
                      <p>ATK {cardInfo.atk}</p>
                      <p>DEF {cardInfo.def}</p>
                    </div>
                  ) : null}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {cardInfo.banlist_info?.ban_tcg === "Banned"
                    ? "Banned"
                    : null}
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions>
              <IconButton color="success" aria-label="add to deck">
                <SaveIcon />
              </IconButton>
            </CardActions>
          </Card>
      
      </Modal>
    </Container>
  );
}
