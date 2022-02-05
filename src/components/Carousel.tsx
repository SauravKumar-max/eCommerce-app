import { Box, Slide, Stack } from "@mui/material";
import { carouselContent } from "../utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Carousel(): JSX.Element {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (current === 3) return setCurrent(0);
    let timer: ReturnType<typeof setInterval>;
    timer = setInterval(() => setCurrent((current) => current + 1), 3000);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "120rem",
          border: "solid 1px #adadad",
          backgroundColor: "#f8f8f8",
          overflow: "hidden",
          boxShadow: 2,
          margin: "auto",
        }}
      >
        <Stack
          direction={"row"}
          sx={{ transform: `translateX(-${current * 100}%)` }}
        >
          {carouselContent.map(({ image }, index) => (
            <Slide key={index} direction="left" in={current === index}>
              <Box
                component="img"
                src={image}
                alt=""
                sx={{
                  width: "100%",
                  height: { xs: "auto", md: "80vh", xl: "75vh" },
                  cursor: "pointer",
                }}
                onClick={() => navigate("/products")}
              />
            </Slide>
          ))}
        </Stack>
      </Box>

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
        margin={"1.5rem 0 3rem 0"}
      >
        {carouselContent.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrent(index)}
            sx={{
              backgroundColor: current === index ? "#3d41d7" : "#adadad",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          ></Box>
        ))}
      </Stack>
    </>
  );
}
