import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Popper,
  Paper,
  Grid,
  Divider,
  ClickAwayListener,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PeopleIcon from "@mui/icons-material/People";

const PassengerAndSeatSelector = ({ onPassengerChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [passengerCount, setPassengerCount] = useState({
    ADULT: 1,
    CHILD: 0,
    INFANT: 0,
  });

  const [seatClass, setSeatClass] = useState("ECONOMY");

  const seatOptions = [
    { label: "Phổ thông", value: "ECONOMY" },
    { label: "Phổ thông cao cấp", value: "PREMIUM_ECONOMY" },
    { label: "Thương gia", value: "BUSINESS" },
    { label: "Hạng nhất", value: "FIRST_CLASS" },
  ];

  const isOpen = Boolean(anchorEl);

  const handleToggle = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handlePassengerChange = (type, inc) => {
    setPassengerCount((prev) => {
      const newValue = prev[type] + (inc ? 1 : -1);
      const updated = {
        ...prev,
        [type]: type === "ADULT" ? Math.max(1, newValue) : Math.max(0, newValue),
      };

      onPassengerChange({
        passengers: updated,
        seatClass,
      });

      return updated;
    });
  };

  const handleSeatClassChange = (value) => {
    setSeatClass(value);
    onPassengerChange({
      passengers: passengerCount,
      seatClass: value,
    });
  };

  const total =
    passengerCount.ADULT +
    passengerCount.CHILD +
    passengerCount.INFANT;

  const selectedSeatLabel =
    seatOptions.find((s) => s.value === seatClass)?.label;

  return (
    <Box sx={{ width: "100%" }}>
      {/* BUTTON */}
      <Button
        variant="outlined"
        startIcon={<PeopleIcon />}
        onClick={handleToggle}
        fullWidth
        sx={{
          justifyContent: "center",
          py: { xs: 1.5, md: 2 },
          textTransform: "none",
          fontSize: { xs: 14, md: 16 },
          borderRadius: "8px",
          color: "black",
        }}
      >
        {`${total} Hành khách, ${selectedSeatLabel}`}
      </Button>

      {/* POPPER */}
      <Popper
        open={isOpen}
        anchorEl={anchorEl}
        placement="bottom"
        sx={{
          zIndex: 1300,
          width: { xs: "95vw", sm: 400, md: 600 },
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            sx={{
              mt: 1,
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              width: "100%",
            }}
          >
            {/* PASSENGERS */}
            {[
              { type: "ADULT", label: "Người lớn (12+)" },
              { type: "CHILD", label: "Trẻ em (2-11)" },
              { type: "INFANT", label: "Em bé (<2)" },
            ].map((p) => (
              <Box
                key={p.type}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                }}
              >
                <Typography fontSize={{ xs: 13, md: 14 }}>
                  {p.label}
                </Typography>

                <Box>
                  <IconButton
                    onClick={() => handlePassengerChange(p.type, false)}
                    disabled={
                      p.type === "ADULT" &&
                      passengerCount[p.type] === 1
                    }
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography component="span" mx={1}>
                    {passengerCount[p.type]}
                  </Typography>

                  <IconButton
                    onClick={() => handlePassengerChange(p.type, true)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}

            <Divider sx={{ my: 1 }} />

            {/* SEAT */}
            <Grid container spacing={1}>
              {seatOptions.map((seat) => (
                <Grid item xs={6} key={seat.value}>
                  <Button
                    fullWidth
                    size="small"
                    variant={
                      seatClass === seat.value
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() =>
                      handleSeatClassChange(seat.value)
                    }
                    sx={{
                      textTransform: "none",
                      fontSize: { xs: 12, md: 14 },
                    }}
                  >
                    {seat.label}
                  </Button>
                </Grid>
              ))}
            </Grid>

            {/* DONE BUTTON MOBILE */}
            <Button
              fullWidth
              sx={{ mt: 2, display: { xs: "block", md: "none" } }}
              variant="contained"
              onClick={handleClose}
            >
              Xong
            </Button>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default PassengerAndSeatSelector;