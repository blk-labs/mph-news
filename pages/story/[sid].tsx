import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";

// Redux
import { connect } from "react-redux";
import { getTopic, getPost } from "../../redux/actions/dataActions";

// Material
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Comps
import Comments from "../../components/story/Comments";
import BodyMark from "../../components/story/BodyMark";
import RecentTopic from "../../components/story/RecentTopic";
import StoryMap from "../../components/story/StoryMap";
import Loading from "../../components/layout/Loading";

import { NextPageContext } from "next";
import { newsService } from "../../lib/services";
import Footer from "../../components/surfaces/Footer";
import NewsPost from "../../lib/models/NewsPostModel";
import TopicTag from "../../components/data-display/TopicTag";
import { Email, Facebook, Twitter, WhatsApp } from "@mui/icons-material";
import Link from "next/link";
import useRouting from "../../hooks/routingHook";
// import SEO from '../../components/utils/SEO'

// export async function getServerSideProps(context: NextPageContext) {
//   const { sid } = context.query;

//   const post = await newsService.getNewsPost(sid as string);
//   const relatedPosts = await newsService.getTopicNews(post.topic, 3);

//   return {
//     props: {
//       post: post.toJsonSerializable(),
//       relatedPosts: relatedPosts.map((post) => post.toJsonSerializable()),
//     },
//   };
// }

type StoryPageProps = {
  post: any;
  relatedPosts: Array<any>;
};
export default function StoryPage(props: StoryPageProps) {
  const router = useRouter();
  // const { current: post } = useRef(NewsPost.fromJson(props.post));
  // const { current: relatedPosts } = useRef(
  //   props.relatedPosts.map((post) => NewsPost.fromJson(post))
  // );
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const fetchPosts = async () => {
    const { sid: postId } = router.query;
    console.log({postId})
    try {
      const postResponse = await newsService.getNewsPost(postId as string);
      const relatedPostsResponse = await newsService.getTopicNews(postResponse.topic, 3);
      setPost(postResponse);
      setRelatedPosts(relatedPostsResponse);
    } catch (e) {
      console.log({error: e});
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useRouting((status) => {
    status === "complete" && fetchPosts();
  })

  return (
    <>
    <Head>
      <title>MPH News | {post?.title}</title>
    </Head>
      <div>
        {/** TODO: Add comments Fn */}
        <div
          className="w-full h-[80vh] lg:h-auto lg:aspect-[16/6] bg-center lg:bg-top bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('${post?.postImage}')` }}
        >
          <div className="w-full h-full bg-black bg-opacity-25 flex items-end px-6 lg:px-[90px] py-4 lg:py-8">
            <TopicTag label={post?.topic} />
          </div>
        </div>

        <div className="px-6 lg:px-[90px] py-[60px] lg:py-[80px] flex items-stretch">
          <div className="hidden lg:block">
            <div className="pt-[20px] sticky top-0">
              <p className="border border-gray-200 text-xs my-1 h-[60px] px-[25px] leading-[60px]">
                <Facebook />
              </p>
              <p className="border border-gray-200 text-xs my-1 h-[60px] px-[25px] leading-[60px]">
                <Twitter />
              </p>
              <p className="border border-gray-200 text-xs my-1 h-[60px] px-[25px] leading-[60px]">
                <WhatsApp />
              </p>
              <p className="border border-gray-200 text-xs my-1 h-[60px] px-[25px] leading-[60px]">
                <Email />
              </p>
            </div>
          </div>

          <div className="w-full lg:w-2/3 font-mont lg:px-[30px]">
            <h1 className="text-[28px] lg:text-[48px] font-extrabold leading-tight">
              {post?.title}
            </h1>
            <div className="my-[20px] flex flex-wrap items-center text-sm">
              <span className="mr-2">By</span>{" "}
              <span className="font-bold underline">{post?.postedBy}</span>{" "}
              <div className="w-1 h-1 mx-3 rounded-full bg-black"></div>
              {new Date(post?.createdAt)?.toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="text-[#555] text-[17px] whitespace-pre-line">
              {post?.body}
            </div>
          </div>
        </div>

        <div className="mx-6 lg:mx-[90px] ">
          <hr />
        </div>

        <div className="px-6 lg:px-[90px] py-[60px] lg:py-[80px] font-mont">
          <h2 className="mb-[20px] text-[26px] font-bold">Related News</h2>

          <div className="flex flex-wrap">
            {relatedPosts.map((post) => {
              return (
                <div
                  key={post.id}
                  className={`w-full lg:w-1/3 mb-[20px] lg:mb-0 first:lg:ml-[-15px] last:lg:mr-[-15px] px-[15px]`}
                >
                  <div className="w-full aspect-[16/10]">
                    <img
                      src={post.postImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="">
                    <Link href={""}>
                      <a className="my-4 px-3 py-1 inline-block text-xs lg:text-sm text-black bg-[#5BA66E] font-mont font-medium uppercase">
                        {post.topic}
                      </a>
                    </Link>
                    <p className="text-xl lg:text-2xl text-black font-bold font-mont">
                      <Link href={`/story/${post.id}`}>
                      <a>
                      {post.title}
                      </a>
                      </Link>
                    </p>
                    <p className="mt-3 font-medium text-gray-500 tracking-wide">
                      By{" "}
                      <span className="text-black underline">
                        {post.postedBy}
                      </span>{" "}
                      <div className="mx-[15px] inline-block w-[5px] h-[5px] rounded-full bg-black"></div>{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
