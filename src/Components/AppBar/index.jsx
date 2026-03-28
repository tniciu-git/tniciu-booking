import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {
  Button,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAuth } from "./Account";
import Profile from "./Profile";
import { Link, useLocation } from "react-router-dom";

const AppBarComponent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const [openDrawer, setOpenDrawer] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  const menuItems = [
    { label: "Máy Bay + K.sạn", path: "/account/OrderPlane" },
    { label: "Chỗ ở", path: "/account/Hotels" },
    { label: "Hoạt động", path: "/account/activities" },
    { label: "Ưu đãi", path: "/account/deals" },
    { label: "eSim", path: "/account/esim" },
  ];

  const menuStyle = (path) => ({
    color: isActive(path) ? "#1976d2" : "#000",
    textTransform: "none",
    fontWeight: isActive(path) ? "bold" : 500,
  });

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            
            {/* MOBILE MENU */}
            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* LOGO */}
            <Box
              component={Link}
              to="/"
              sx={{ display: "flex", alignItems: "center", ml: 1 }}
            >
              <img
                src="https://res.cloudinary.com/ddmsl3meg/image/upload/v1733899748/cw96zg7py4xsxwdyanzy.png"
                style={{ height: "40px" }}
              />
            </Box>

            {/* DESKTOP MENU */}
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={menuStyle(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* RIGHT */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                <IconButton component={Link} to="/account/shoppingcart">
                  <Badge badgeContent={2} color="error">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>

                <Profile />
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/account/login"
                  sx={{ textTransform: "none" }}
                >
                  Đăng nhập
                </Button>

                <Button
                  component={Link}
                  to="/account/SignUp"
                  sx={{
                    ml: 1,
                    textTransform: "none",
                    borderRadius: "20px",
                    px: 2,
                    background: "linear-gradient(45deg, #2196F3, #21CBF3)",
                    color: "#fff",
                  }}
                >
                  Đăng ký
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* DRAWER MOBILE */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: isActive(item.path)
                      ? "#1976d2"
                      : "#000",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default AppBarComponent;