import { Star } from "@mui/icons-material";
import {
  Badge,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";

function Header() {
  const router = useRouter();
  const { currentUser, badgeCount } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = ()=>{
    const auth = getAuth()
    signOut(auth).then(res => alert('Signed Out Successfully!'))
    .catch(err => console.log(err))
    handleClose()
  }

  const goToFav = () => {
    if (currentUser) {
      router.push("/user/favorites");
    } else {
      alert("Login Required");
    }
  };

  return (
    <>
      <nav style={{zIndex:"100"}} className="d-flex justify-content-evenly bg-white shadow align-items-center py-3 position-fixed w-100">
        <Link href="/">
          <h1 style={{cursor:'pointer'}} className="fw-bold">
            <i>The Mealeria</i>
          </h1>
        </Link>
        <ul
          className="m-0 d-flex align-items-center gap-2
        "
        >
          <Tooltip title="My Favorites">
            <IconButton onClick={goToFav}>
              <Badge badgeContent={badgeCount} color="success">
                <Star color="error" fontSize="large"></Star>
              </Badge>
            </IconButton>
          </Tooltip>
          {currentUser ? (
            <Tooltip title="User Info">
              <IconButton onClick={handleClick}>
                <Avatar className="user-avatar">
                  {currentUser.displayName[0].toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          ) : (
            <Link href="/user/login">
              <Tooltip title="User Login">
                <IconButton>
                  <Avatar className="user-avatar bg-secondary"></Avatar>
                </IconButton>
              </Tooltip>
            </Link>
          )}
        </ul>
        {currentUser ? (
          <Menu
            className=""
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            transformOrigin={{ horizontal: "center",vertical:"bottom" }}
            anchorOrigin={{ horizontal: "left",vertical:"top" }}
          >
            <Avatar style={{ width: 56, height: 56,fontSize:32 }} className="user-avatar mb-2 d-inline-flex">
              {currentUser.displayName[0].toUpperCase()}
            </Avatar>
            <Typography className="pt-2 fw-bold">
              {currentUser.displayName}
            </Typography>
            <Typography className="pt-2">{currentUser.email}</Typography>
            <Button
              onClick={handleSignout}
              variant="outlined"
              color="error"
              className="mt-3"
            >
              LogOut
            </Button>
          </Menu>
        ) : null}
      </nav>
    </>
  );
}

export default Header;
