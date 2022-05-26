import React, { useEffect, useState } from "react";
import Link from "next/link";
import Carousel from "@brainhubeu/react-carousel";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "@brainhubeu/react-carousel/lib/style.css";

// Material
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import { INewsPost } from "../../lib/models/NewsPostModel";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { newsService } from "../../lib/services";
import LatestNewsItem from "../data-display/LatestNewsItem";
import TopicTag from "../data-display/TopicTag";

type LatestNewsDesktopProps = {
  posts: Array<INewsPost>;
};
const LatestNewsDesktop: React.FunctionComponent<LatestNewsDesktopProps> = ({
  posts,
}) => {
  return (
    <div className="hidden lg:block lg:w-2/5 lg:pl-8">
      <div className="bg-white lg:p-[36px]">
        <h2 className="lg:mb-[36px] text-3xl font-mont font-bold tracking-wide">
          Latest News
        </h2>
        {posts.map((post, index) => {
          return (
            <LatestNewsItem
              key={post.id}
              post={post}
              divider={index < posts.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
};

type LatestNewsMobileProps = {
  posts: Array<INewsPost>;
};
const LatestNewsMobile: React.FunctionComponent<LatestNewsMobileProps> = ({
  posts,
}) => {
  return (
    <div className="lg:hidden my-6 px-6 flex flex-wrap">
      {posts.map((post, index) => {
        return (
          <div
            key={post.id}
            className={`w-1/2 mb-6 ${
              index % 2 === 0 ? "pl-0 pr-3" : "pr-0 pl-3"
            }`}
          >
            <Link href={`/story/${post.id}`}>
            <a>
            <img
              src={post.postImage}
              alt={post.title}
              className="aspect-video"
            />
            <h3 className="mt-3 font-mont font-bold tracking-wide text-black">
              {post.title}
            </h3>
            <p className="my-3 text-gray-500 font-mont text-sm font-medium">
              {dayjs(post.createdAt).fromNow()}
            </p>
            </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default function LatestNews() {
  const [news, setNews] = useState<Array<INewsPost>>([]);
  const [loading, setLoading] = useState(false);

  dayjs.extend(relativeTime);

  const initialize = async () => {
    setLoading(true);
    try {
      const posts = await newsService.getLatestNews();
      console.log({ posts });
      setNews(posts);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <div
        className="w-full aspect-square lg:aspect-[16/9] bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('${news?.[0]?.postImage}')` }}
      >
        <div className="relative w-full h-full px-6 lg:px-16 flex items-center bg-black bg-opacity-25">
          <div className="lg:w-3/5 lg:pr-16">
            <TopicTag label={news?.[0]?.topic} />
            <Link href={`/story/${news?.[0]?.id}`}>
            <a>
            <h2 className="text-white text-2xl lg:text-4xl font-mont font-bold tracking-wide">
              <span className="bg-black leading-relaxed home-title">
                <span>{news?.[0]?.title}</span>
              </span>
            </h2>
            </a>
            </Link>
          </div>

          <LatestNewsDesktop posts={news.slice(1)} />
        </div>
      </div>

      <LatestNewsMobile posts={news.slice(1)} />
    </>
  );
}
