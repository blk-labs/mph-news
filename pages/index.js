import React, { useEffect } from "react";

// Redux

import { connect } from "react-redux";
import { getAllPosts, clearErrors } from "../redux/actions/dataActions";

// Material
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Comps
import LatestNews from "../components/home/LatestNews";
import EditorsPick from "../components/home/EditorsPick";
import VideoNews from "../components/home/VideoNews";
import Footer from "../components/surfaces/Footer";
import TrendingNews from "../components/home/TrendingNews";
import NewsLetterSubscription from "../components/home/NewsLetterSubscription";
import TopicHighlight from "../components/home/TopicHighlight";

const useStyles = makeStyles((theme) =>
  createStyles({
    ...theme.spreadThis,
    loader: {
      height: "100vh",
      background: "white",
      margin: "auto",
    },
  })
);

export function Home(props) {
  useEffect(() => {
    let nav = document.getElementById("navBar");
    if (nav !== null) {
      nav.style.display = "block";
    }

    props.getAllPosts();
    document.title = "MPH News | My Political Hub";
    console.log(props);
  }, []);

  const { loading } = props.data;

  return (
    <>
      <Container maxWidth="lg">
        <EditorsPick news={props.data.posts} />
      </Container>
      <Grid container>
        <LatestNews news={props.data.posts} />
        {/* <CustomNews news={props.data.posts} /> */}
        <div className="w-full px-6 lg:px-[120px] py-[16px] lg:py-[80px] flex flex-wrap lg:items-stretch">
          <TrendingNews />
          <NewsLetterSubscription />
        </div>
        <div className="w-full px-6 lg:px-[68px]">
          <hr className="border" />
        </div>
        <div className="w-full px-6 lg:px-[120px] py-[30px] lg:py-[80px]">
          <TopicHighlight title={"Nigeria"} topic={"nigeria"} />
        </div>

        <div className="w-full px-6 lg:px-[68px]">
          <hr className="border" />
        </div>
        <div className="w-full px-6 lg:px-[120px] py-[30px] lg:py-[80px]">
          <TopicHighlight title={"International"} topic={"international"} />
        </div>

        <div className="w-full px-6 lg:px-[68px]">
          <hr className="border" />
        </div>
        <div className="w-full px-6 lg:px-[120px] py-[30px] lg:py-[80px]">
          <TopicHighlight title={"Security"} topic={"security"} />
        </div>
      </Grid>
      <div className="w-full px-6 lg:px-[120px] py-[30px]">
        <VideoNews news={props.data.posts} />
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

const mapDispatchToProps = { getAllPosts, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
