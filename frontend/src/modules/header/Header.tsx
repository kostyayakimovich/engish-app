import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { RootState } from "../../store/store";
import { authorizationActions } from "../../store/actions/authorizationActions";

const links = ["Add words"];
const settings = ["Logout"];
const Header: React.FunctionComponent = memo(() => {
 const dispatch = useDispatch();
 const { user } = useSelector((state: RootState) => state.authorization);
 const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
 const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
  null
 );

 const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElNav(event.currentTarget);
 };
 const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElUser(event.currentTarget);
 };

 const handleCloseNavMenu = () => {
  setAnchorElNav(null);
 };

 const handleCloseUserMenu = () => {
  setAnchorElUser(null);
 };

 const handleClickSettings = useCallback(
  (setting: string) => {
   if (setting === "Logout") {
    dispatch(authorizationActions.logout());
   }
  },
  [dispatch]
 );

 return (
  <header className="header">
   <AppBar position="static">
    <Container maxWidth="xl">
     <Toolbar disableGutters>
      <Typography
       variant="h6"
       noWrap
       component="a"
       href="/"
       sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
       }}
      >
       English App
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
       <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
       >
        <MenuIcon />
       </IconButton>
       <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
         vertical: "bottom",
         horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
         vertical: "top",
         horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
         display: { xs: "block", md: "none" },
        }}
       >
        {links.map((link) => (
         <MenuItem key={link} onClick={handleCloseNavMenu}>
          <Typography textAlign="center">{link}</Typography>
         </MenuItem>
        ))}
       </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
       {links.map((link) => (
        <Button
         key={link}
         onClick={handleCloseNavMenu}
         sx={{ my: 2, color: "white", display: "block" }}
        >
         {link}
        </Button>
       ))}
      </Box>

      <Box sx={{ flexGrow: 0 }}>
       <Tooltip title="Open settings">
        <IconButton
         onClick={handleOpenUserMenu}
         sx={{ p: 0, color: "white", fontSize: "1rem" }}
        >
         {user ? user["email"] : ""}
        </IconButton>
       </Tooltip>
       <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
         vertical: "top",
         horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
         vertical: "top",
         horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
       >
        {settings.map((setting) => (
         <MenuItem key={setting} onClick={handleCloseUserMenu}>
          <Typography
           textAlign="center"
           onClick={() => handleClickSettings(setting)}
          >
           {setting}
          </Typography>
         </MenuItem>
        ))}
       </Menu>
      </Box>
     </Toolbar>
    </Container>
   </AppBar>
  </header>
 );
});

export default Header;
