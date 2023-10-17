import React, { useEffect, useRef } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import CardPrevModal from "./CardPrevModal";

function LazyImage({ cardInfo, src, alt, id, subtitle, title, label }) {
  return (
    <ImageListItem key={id}>
      <LazyLoadImage
        id={`image-${id}`}
        alt={title}
        effect="blur"
        style={{ borderRadius: "3px" }}
        visibleByDefault={false}
        onClick={()=> cardInfo()} // opens the modal
        src={src} // use normal <img> attributes as props
      />
      <CardPrevModal 
        cardInfo={cardInfo}
         />
      {/* Always set a fixed height to the image placeholder or container */}
      <ImageListItemBar
        title={title}
        subtitle={subtitle}
        // actionIcon={
        //   <IconButton
        //     sx={{ color: "rgba(255, 255, 255, 0.54)", fontSize: "13px" }}
        //     aria-label={`info about ${label}`}
            
        //   >
        //     <InfoIcon/>
        //   </IconButton>
        // }
      />
    </ImageListItem>
  );
}

export default LazyImage;
