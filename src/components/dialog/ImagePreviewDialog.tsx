import React from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ArrowsPointingOutIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";

import theme_1 from "assets/themes/theme_1.png";
import theme_2 from "assets/themes/theme_2.png";
import theme_3 from "assets/themes/theme_3.png";
import theme_4 from "assets/themes/theme_4.png";
import theme_5 from "assets/themes/theme_5.png";

const CustomPrevArrow = (props: any) => (
  <div
    className="custom-prev-arrow"
    style={{
      width: 20,
      height: 20,
      position: "absolute",
      top: "calc(50% - 0px)",
      left: -20,
      cursor: "pointer",
    }}
    onClick={props.onClick}
  >
    <ArrowLeftCircleIcon />
  </div>
);

const CustomNextArrow = (props: any) => (
  <div
    style={{
      width: 20,
      height: 20,
      position: "absolute",
      bottom: "calc(50% - 20px)",
      right: -20,
      cursor: "pointer",
    }}
    onClick={props.onClick}
  >
    <ArrowRightCircleIcon />
  </div>
);

export default function ImagePreviewDialog() {
  const images = [theme_1, theme_2, theme_3, theme_4, theme_5];
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i: number) {
      return <img src={images[i]} alt={`Thumbnail ${i}`} />;
    },
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  return (
    <Dialog
      open
      maxWidth="lg"
      PaperProps={{
        sx: {
          overflow: "visible",
        },
      }}
    >
      <IconButton
        sx={{
          borderRadius: "8px",
          bgcolor: "black",
          position: "absolute",
          top: -36,
          right: -36,
          width: 36,
          height: 36,
        }}
      >
        <XMarkIcon style={{ color: "white", width: 24, height: 24 }} />
      </IconButton>
      <DialogContent sx={{ overflow: "visible" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box
              p={5}
              height="100%"
              bgcolor="background.color-background-base"
              borderRadius="8px"
            >
              <div
                className="carousel-container"
                style={{
                  width: 400,
                  position: "relative",
                  paddingBottom: 60,
                  margin: "auto",
                }}
              >
                <Slider {...settings}>
                  {images.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        background: "red",
                        padding: 10,
                        width: "100%",
                      }}
                    >
                      <img
                        style={{
                          width: 400,
                          height: 400,
                          objectFit: "contain",
                        }}
                        src={image}
                        alt={`Slide ${index}`}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2} direction="row" sx={{ maxHeight: 40, mb: 3 }}>
              <Button size="small">
                <EllipsisHorizontalIcon />
              </Button>
              <Button size="small" startIcon={<PencilSquareIcon />}>
                Edit
              </Button>
              <Button size="small" startIcon={<ArrowsPointingOutIcon />}>
                Resize
              </Button>
              <Button
                size="small"
                sx={{ bgcolor: "background.color-brand-background", px: 2 }}
              >
                Download
              </Button>
            </Stack>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Dimensions:
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              Instagram Post (1:1)
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Prompt:
            </Typography>
            <Typography variant="subtitle1">
              “Product image, photograph of a Facial Cleansers, placed in
              (standing)++ manner, on a white surface, casting a (angled
              shadow)++, individual product in the scene, indoor studio shoot,
              minimalist photography”
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
