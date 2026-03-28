import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import { useNavigate } from "react-router-dom";

import Location from "../../../../Home/location";
import PromotionStay from "../../../../Home/promotionStay";
import Tour from "../Tour";
import AirportSearchForm from "./AirportSearch/AirportSearch";
import PassengerAndSeatSelector from "./PassengerAndSeatSelector";
import {
  fetchAllToAirportAPI,
  SearchFlightAPI,
} from "../../../../apis";

const OrderAirPlane = () => {
  const navigate = useNavigate();

  const [flightType, setFlightType] = useState("one-way");
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [passengerData, setPassengerData] = useState({});
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllToAirportAPI()
      .then((data) => setAirports(data))
      .catch(() => setError("Không tải được danh sách sân bay"));
  }, []);

  const handleSwap = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const handleSearchFlight = () => {
    if (!fromLocation || !toLocation) {
      return setError("Vui lòng chọn điểm đi và điểm đến");
    }
    if (!departureDate) {
      return setError("Vui lòng chọn ngày đi");
    }

    SearchFlightAPI({
      departureAirportId: fromLocation.id,
      arrivalAirportId: toLocation.id,
      departureDate,
      seatClass: passengerData.seatClass || "Economy",
      passengerType: passengerData.passengerType || "Adult",
    })
      .then((flights) => {
        navigate("/account/flight", { state: { flights } });
      })
      .catch(() => setError("Không tìm thấy chuyến bay"));
  };

  const filterAirportsForFrom = () =>
    toLocation ? airports.filter((a) => a.id !== toLocation.id) : airports;

  const filterAirportsForTo = () =>
    fromLocation ? airports.filter((a) => a.id !== fromLocation.id) : airports;

  return (
    <>
      {/* ================= BANNER ================= */}
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            backgroundImage:
              "url('https://cdn6.agoda.net/images/MVC/default/background_image/illustrations/bg-agoda-homepage.png')",
            height: { xs: 280, md: 420 },
            backgroundSize: "cover",
            borderRadius: 2,
            mb: 10,
            position: "relative",
          }}
        >
          {/* TEXT */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: 20, md: 50 },
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              color: "#fff",
              px: 2,
            }}
          >
            <Typography
              fontSize={{ xs: 14, md: 24 }}
              fontWeight="bold"
            >
              ĐẶT VÉ MÁY BAY TỐT NHẤT NGAY HÔM NAY
            </Typography>
            <Typography fontSize={{ xs: 12, md: 14 }}>
              Tìm và so sánh hơn 200 hãng bay
            </Typography>
          </Box>

          {/* FORM */}
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: -100, md: -90 },
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: "95%", md: "1100px" }, // 👈 giữ desktop
              bgcolor: "#fff",
              p: { xs: 2, md: 4 },
              borderRadius: "20px",
              boxShadow: 3,
            }}
          >
            {/* TYPE */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mb: 2,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Button
                fullWidth={{ xs: true, md: false }} // 👈 mobile full
                variant={flightType === "one-way" ? "contained" : "outlined"}
                onClick={() => setFlightType("one-way")}
              >
                Một chiều
              </Button>

              <Button
                fullWidth={{ xs: true, md: false }}
                variant={flightType === "round-trip" ? "contained" : "outlined"}
                onClick={() => setFlightType("round-trip")}
              >
                Khứ hồi
              </Button>

              <FormControlLabel
                sx={{ ml: { xs: 0, md: "auto" } }} // 👈 mobile không đẩy lệch
                control={<Checkbox />}
                label="Bay thẳng"
              />
            </Box>

            {/* AIRPORT */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 1,
                mb: 2,
                alignItems: "stretch", // 👈 quan trọng
              }}
            >
              {/* BAY TỪ */}
              <Box sx={{ flex: 1 }}>
                <AirportSearchForm
                  label="Bay từ"
                  onSelect={setFromLocation}
                  airports={filterAirportsForFrom()}
                />
              </Box>

              {/* SWAP */}
              <IconButton
                onClick={handleSwap}
                sx={{
                  alignSelf: "center",
                  transform: { xs: "rotate(90deg)", md: "none" },
                  border: "1px solid #ddd",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                }}
              >
                <SwapHorizOutlinedIcon />
              </IconButton>

              {/* BAY ĐẾN */}
              <Box sx={{ flex: 1 }}>
                <AirportSearchForm
                  label="Bay đến"
                  onSelect={setToLocation}
                  airports={filterAirportsForTo()}
                />
              </Box>
            </Box>

            {/* DATE */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 1,
                mb: 2,
              }}
            >
              <TextField
                fullWidth
                type="date"
                label="Ngày đi"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />

              {flightType === "round-trip" && (
                <TextField
                  fullWidth
                  type="date"
                  label="Ngày về"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            </Box>

            {/* PASSENGER */}
            <Box mb={2} sx={{ width: "100%" }}>
              <PassengerAndSeatSelector
                onPassengerChange={setPassengerData}
              />
            </Box>

            {/* BUTTON */}
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                bgcolor: "#1976d2", // 🔵 xanh dương
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#1565c0",
                },
              }}
              onClick={handleSearchFlight}
            >
              TÌM CHUYẾN BAY
            </Button>
          </Box>
        </Box>
      </Box>

      {/* CONTENT */}
      <Box sx={{ mt: { xs: 18, md: 12 } }}>
        <Location />
      </Box>

      <Box sx={{ mt: 6 }}>
        <PromotionStay />
      </Box>

      <Box sx={{ mt: 6 }}>
        <Tour />
      </Box>

      {/* ERROR */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </>
  );
};

export default OrderAirPlane;