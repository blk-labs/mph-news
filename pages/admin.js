import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import jwtDecode from "jwt-decode";
import axios from "axios";

// Redux
import { connect } from "react-redux";
import {
  getTopic,
  getAllPosts,
  getDocuments,
} from "../redux/actions/dataActions";
import { isAuth } from "../redux/actions/userActions";

// Material
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

// Comps
import AddStory from "../components/admin/AddStory";
import Loading from "../components/layout/Loading";
import DeleteStory from "../components/admin/DeleteStory";
import AddDocument from "../components/admin/AddDocument";
import DeleteDocument from "../components/admin/DeleteDocument";
import EditorsPick from "../components/admin/EditorsPick";
import logoFull from "../public/images/logoFullColor2.png";
import userImg from "../public/images/userImg.png";
import logo from "../public/images/logo.png";
import { useAuth } from "../hooks/authHook";

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    formControl: {
      width: "100%",
    },
    admin: {
      fontFamily: '"Helvetica Black Bold"',
      fontSize: 48,
      paddingBottom: 40,
      [theme.breakpoints.down("sm")]: {
        fontSize: 24,
      },
    },
    navCont: {
      marginBottom: "5rem",
      paddingTop: "1.5rem",
    },
    gridCont: {
      background: "#fff",
      width: "690px",
      margin: "auto",
      padding: "40px",
      marginBottom: 30,
      boxShadow: "0px 4px 34px 10px rgba(228, 228, 228, 0.25)",
      [theme.breakpoints.down("sm")]: {
        width: "85%",
      },
      [theme.breakpoints.down("xs")]: {
        paddingRight: "20px",
        paddingLeft: "20px",
        width: "100%",
      },
    },
    logoFull: {
      height: "auto",
      width: 105,
      margin: "1rem",
    },
    hubClass: {
      height: "20px",
      width: "auto",
      marginRight: ".25rem",
    },
    mainCont: {
      marginTop: "1rem",
    },
    contentType: {
      fontSize: 15,
      marginBottom: "0.5rem",
      fontFamily: '"Helvetica"',
    },
    list: {
      padding: 0,
    },
    selectRoot: {
      [theme.breakpoints.down("sm")]: {
        // width: '90px',
      },
    },
    buttonCont: {
      display: "flex",
      marginTop: "2rem",
    },
    btnCont: {
      width: "fit-content",
      textTransform: "uppercase",
      marginLeft: 30,
      fontSize: 15,
      fontFamily: '"Helvetica Bold"',
      backgroundColor: "#185E5C",
      color: "white",
      borderColor: "transparent",
      "&:hover": {
        backgroundColor: "#e94b47",
      },
      [theme.breakpoints.down("sm")]: {
        padding: 8,
      },
    },
    btnConts: {
      width: "fit-content",
      textTransform: "uppercase",
      marginLeft: "auto",
      background: "#6B3FA0",
      height: 45,
      fontSize: 15,
      fontmily: '"Helvetica Bold"',
      boxShaw: "none",
      [theme.breakpoints.down("sm")]: {
        padding: 8,
      },
    },
  })
);

export function Admin(props) {
  const [select, setSelect] = useState("");
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const [content, setContent] = useState([]);

  const { doctopic } = props.data;
  // const oading } = props.UI;

  const [openetOpen, setOpen] = useState(false);

  const handleSuccess = () => {
    setSelect("");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (event) => {
    setSelect(event.target.value);
    getContent(event.target.value);
  };

  const getContent = (cont) => {
    if (cont === "story" || cont === "editors") {
      props.getAllPosts();
      setAdd(false);
      setRemove(false);
      setContent(props.data.posts);
    } else if (cont === "video") {
      props.getTopic(cont);
      setAdd(false);
      setRemove(false);
      setContent(props.data.topic);
    } else if (cont === "documents") {
      props.getDocuments();
      setAdd(false);
      setRemove(false);
      setContent(props.data.docs);
    }
  };

  const addContent = () => {
    setAdd(true);
    setRemove(false);
  };

  const removeContent = () => {
    setAdd(false);
    setRemove(true);
  };

  let router = useRouter();
  const auth = useAuth();

  const theme = useTheme();
  const classes = useStyles(props);
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContent("story");
    getContent("video");
    getContent("documents");
  }, []);

  // useEffect(() => {
  // 	console.log(`props.user: ${props.user.authenticated}`);
  // 	// if (props.user.authenticated === false) {
  // 	// 	ro uter.push('/')
  // 	// } e lse if (props.user.credentials.moderator === false) {
  // 	// 	ro uter.push('/')
  // 	// } e lse {
  // 	// 	le t nav = document.getElementById('navBar');
  // 	// 	if  (nav !== null) {
  // 	// 		n av.style.display = 'none'
  // 	// 	 }
  // 	// }
  // }, [p rops.user])

  return (
    <div style={{ background: "#FBFBFB", minHeight: "100vh" }}>
      {!auth.user ? (
        <Loading />
      ) : (
        <div>
          <Container className={classes.navCont}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Link href="/" className={classes.logoComp}>
                <a>
                  <img
                    src={logoFull.src}
                    className={matches ? classes.logoClass : classes.logoFull}
                    alt="MPH-logo"
                    style={{ width: "" }}
                  />
                </a>
              </Link>
              <div
                style={{
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                <img src={userImg.src} alt="" className={classes.hubClass} />
                <Typography
                  variant="p"
                  style={{
                    fontSize: 15,
                    textTransform: "capitalize",
                    fontFamily: '"Helvetica"',
                  }}
                >
                  {props.user.credentials.fName} {props.user.credentials.lName}
                </Typography>
              </div>
            </div>
          </Container>
          <Container className={classes.adminCont}>
            <Typography className={classes.admin} variant="h5">
              Admin Panel
            </Typography>
            <Grid className={classes.gridCont}>
              <Grid className={classes.formControl}>
                <Typography className={classes.contentType}>
                  Select a Content Type
                </Typography>
                <FormControl
                  style={{
                    minWidth: "100%",
                    border: "1px solid #D9D9D9",
                    padding: "3px 0 3px 5px",
                  }}
                >
                  <Select
                    // id='demo-simple-select-outlined'
                    value={select}
                    color="secondary"
                    onChange={handleChange}
                    label="Content"
                    disableUnderline
                    MenuProps={{ classes: { list: classes.list } }}
                    classes={{
                      root: classes.selectRoot,
                      icon: classes.icon,
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem
                      style={{
                        fontFamily: '"Helvetica"',
                        fontSize: 15,
                      }}
                      value="story"
                    >
                      Story
                    </MenuItem>
                    <MenuItem
                      style={{
                        fontFamily: '"Helvetica"',
                        fontSize: 15,
                      }}
                      value="video"
                    >
                      Video
                    </MenuItem>
                    <MenuItem
                      style={{
                        fontFamily: '"Helvetica"',
                        fontSize: 15,
                      }}
                      value="documents"
                    >
                      Documents
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {select !== "" && (
                <Grid className={classes.buttonCont}>
                  <Button
                    size={matches ? "small" : "large"}
                    onClick={addContent}
                    className={classes.btnConts}
                    style={{}}
                    variant="contained"
                    color="secondary"
                  >
                    Add New {select}
                  </Button>
                  {select !== "editors" && (
                    <Button
                      size={matches ? "small" : "large"}
                      onClick={removeContent}
                      variant="outlined"
                      className={classes.btnCont}
                    >
                      {select === "story" ? "Edit" : "Delete"} {select}
                    </Button>
                  )}
                </Grid>
              )}

              <Grid className={classes.mainCont}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    Successful!
                  </Alert>
                </Snackbar>
                {select === "story" ? (
                  add === true ? (
                    <AddStory handleSuccess={handleSuccess} />
                  ) : remove === true ? (
                    <DeleteStory
                      handleSuccess={handleSuccess}
                      posts={props.data.posts}
                    />
                  ) : null
                ) : select === "video" ? (
                  add === true ? (
                    <AddStory video={true} handleSuccess={handleSuccess} />
                  ) : remove === true ? (
                    <DeleteStory video={true} posts={props.data.posts} />
                  ) : null
                ) : select === "documents" ? (
                  add === true ? (
                    <AddDocument handleSuccess={handleSuccess} />
                  ) : remove === true ? (
                    <DeleteDocument docs={props.data.docs} />
                  ) : null
                ) : select === "editors" ? (
                  add === true ? (
                    <EditorsPick
                      posts={props.data.posts}
                      handleSuccess={handleSuccess}
                    />
                  ) : null
                ) : null}
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

const mapDispatchToProps = { getTopic, getAllPosts, getDocuments, isAuth };

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
