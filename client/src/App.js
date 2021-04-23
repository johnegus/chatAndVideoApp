import React, { useState } from "react";
import { Typography, AppBar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//teams components
import { ChatEngine } from "react-chat-engine";
import LoginForm from "./teamsComponents/LoginForm";
import ChatFeed from "./teamsComponents/ChatFeed";
import "./Teams.css";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const App = () => {
  const [screen, setScreen] = useState("video");
  const [refreshPage, setRefreshPage] = useState("");
  const classes = useStyles();
  if (!localStorage.getItem("username")) return <LoginForm />;
  return (
    <>
      <div className="button-container">
        <Button
          className="pad"
          variant="contained"
          onClick={async () => {
            setScreen("chat");
          }}
        >
          Chat
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            setScreen("video");
            location.reload();
          }}
        >
          Video
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            setRefreshPage("refresh");
          }}
        >
          Log Out
        </Button>
      </div>

      {screen === "video" ? (
        <div className={classes.wrapper}>
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography variant="h2" align="center">
              Video Chat
            </Typography>
          </AppBar>
          <VideoPlayer />
          <Sidebar>
            <Notifications />
          </Sidebar>
        </div>
      ) : (
        <ChatEngine
          height="100vh"
          projectID="1ceeec71-3b6d-4e7e-b7c5-32cff3567c4d"
          userName={localStorage.getItem("username")}
          userSecret={localStorage.getItem("password")}
          renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
      )}
    </>
  );
};

export default App;
