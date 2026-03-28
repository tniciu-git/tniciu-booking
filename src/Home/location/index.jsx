import React, { useRef } from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Location = () => {
  const sliderRef = useRef(null);

  const locations = [
    {
      name: "Hồ Chí Minh",
      imgUrl:
        "https://pix6.agoda.net/geo/city/13170/1_13170_02.jpg",
      places: "15,546 chỗ ở",
    },
    {
      name: "Đà Nẵng",
      imgUrl:
        "https://pix6.agoda.net/geo/city/16440/1_16440_02.jpg",
      places: "5,534 chỗ ở",
    },
    {
      name: "Vũng Tàu",
      imgUrl:
        "https://pix6.agoda.net/geo/city/17190/1_17190_02.jpg",
      places: "6,329 chỗ ở",
    },
    {
      name: "Hà Nội",
      imgUrl:
        "https://pix6.agoda.net/geo/city/2758/065f4f2c9fa263611ab65239ecbeaff7.jpg",
      places: "10,744 chỗ ở",
    },
    {
      name: "Đà Lạt",
      imgUrl:
        "https://pix6.agoda.net/geo/city/15932/1_15932_02.jpg",
      places: "5,165 chỗ ở",
    },
    {
      name: "Nha Trang",
      imgUrl:
        "https://pix6.agoda.net/geo/city/15339/1_15339_02.jpg",
      places: "8,401 chỗ ở",
    },
    {
      name: "Phú Quốc",
      imgUrl:
        "https://pix6.agoda.net/geo/city/24401/1_24401_02.jpg",
      places: "10,200 chỗ ở",
    },
    {
      name: "Hạ Long",
      imgUrl:
        "https://pix6.agoda.net/geo/city/17160/1_17160_02.jpg",
      places: "3,215 chỗ ở",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: "ondemand",
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          centerMode: true,
          centerPadding: "10px",
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        mt: { xs: 4, md: 10 },
        px: 2,
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        position: "relative",
      }}
    >
      {/* TITLE */}
      <Typography
        fontWeight="bold"
        textAlign="center"
        mb={3}
        sx={{
          fontSize: { xs: "18px", md: "26px" },
        }}
      >
        Các điểm đến thu hút nhất Việt Nam
      </Typography>

      {/* SLIDER */}
      <Slider ref={sliderRef} {...settings}>
        {locations.map((location, index) => (
          <Box key={index} px={1}>
            <Card
              sx={{
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {/* IMAGE */}
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={location.imgUrl}
                  alt={location.name}
                  sx={{
                    height: { xs: 160, sm: 200 },
                  }}
                />

                {/* OVERLAY */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 1.5,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "#fff",
                  }}
                >
                  <Typography fontWeight={600}>
                    {location.name}
                  </Typography>
                  <Typography fontSize="12px">
                    {location.places}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Box>
        ))}
      </Slider>

      {/* LEFT ARROW */}
      <Box
        onClick={() => sliderRef.current.slickPrev()}
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: "50%",
          left: "-10px",
          transform: "translateY(-50%)",
          bgcolor: "#fff",
          borderRadius: "50%",
          p: 1,
          boxShadow: 2,
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        <ArrowBackIcon />
      </Box>

      {/* RIGHT ARROW */}
      <Box
        onClick={() => sliderRef.current.slickNext()}
        sx={{
          display: { xs: "none", md: "flex" },
          position: "absolute",
          top: "50%",
          right: "-10px",
          transform: "translateY(-50%)",
          bgcolor: "#fff",
          borderRadius: "50%",
          p: 1,
          boxShadow: 2,
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        <ArrowForwardIcon />
      </Box>
    </Box>
  );
};

export default Location;