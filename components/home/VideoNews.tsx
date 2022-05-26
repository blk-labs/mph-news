import { PlayArrow, PlayArrowRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { INewsPost } from "../../lib/models/NewsPostModel";
import { newsService } from "../../lib/services";
import TopicTag from "../data-display/TopicTag";

export default function VideoNews() {
  const [news, setNews] = useState<Array<INewsPost>>([]);
  const [loading, setLoading] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(-1);

  dayjs.extend(relativeTime);

  const initialize = async () => {
    setLoading(true);
    try {
      const posts = await newsService.getVideoNews();
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
      <div className="w-full aspect-video relative">
        {currentVideoIndex === 0 ? (
          <iframe
            className={"w-full aspect-video"}
            src={`${news?.[0]?.link}?autoplay=1`}
            allow="autoplay; encrypted-media"
          ></iframe>
        ) : (
          <>
            <div className="relative">
              <img
                src={`https://img.youtube.com/vi/${news?.[0]?.link.substring(
                  news?.[0]?.link.lastIndexOf("/") + 1
                )}/hqdefault.jpg`}
                alt={news?.[0]?.title}
                className="w-full object-cover aspect-video"
              />
              <div className="hidden lg:flex py-6 lg:py-12 px-6 lg:px-12 absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 flex-col justify-end">
                <TopicTag label={news?.[0]?.topic} />
                <h2 className="text-white text-2xl lg:text-4xl font-mont font-bold tracking-wide">
                  <span className="bg-black leading-relaxed home-title">
                    <span>{news?.[0]?.title}</span>
                  </span>
                </h2>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div
                  className="w-[74px] lg:w-[141px] h-[74px] lg:h-[141px] rounded-full bg-white shadow-lg flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setCurrentVideoIndex(0);
                  }}
                >
                  <PlayArrowRounded className="text-green-500 text-[4rem] lg:text-[8rem]" />
                </div>
              </div>
            </div>
            <div className="lg:hidden px-4 flex flex-col justify-end">
              <TopicTag label={news?.[0]?.topic} />
              <h2 className="text-white text-2xl lg:text-4xl font-mont font-bold tracking-wide">
                <span className="bg-black leading-relaxed home-title">
                  <span>{news?.[0]?.title}</span>
                </span>
              </h2>
            </div>
          </>
        )}
      </div>
      <div className="my-[30px] flex flex-wrap mx-[-14px]">
        {news.slice(1).map((post, index) => {
          return (
            <div className="w-full lg:w-1/4 px-[14px]" key={post.id}>
              {currentVideoIndex === index ? (
                <iframe
                  className={"w-full aspect-video"}
                  src={`${post.link}?autoplay=1`}
                  allow="autoplay; encrypted-media"
                ></iframe>
              ) : (
                <div className="relative">
                  <img
                    src={`https://img.youtube.com/vi/${post.link.substring(
                      post.link.lastIndexOf("/") + 1
                    )}/hqdefault.jpg`}
                    alt={post.title}
                    className="w-full object-cover aspect-video"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div
                      className="w-[74px] h-[74px] rounded-full bg-white shadow-lg flex justify-center items-center cursor-pointer"
                      onClick={() => {
                        setCurrentVideoIndex(index);
                      }}
                    >
                      <PlayArrowRounded className="text-green-500 text-[4rem]" />
                    </div>
                  </div>
                </div>
              )}
              <h3 className="mt-3 font-mont font-bold tracking-wide text-black">
                {post.title}
              </h3>
              <p className="my-3 text-gray-500 font-mont text-sm font-medium">
                {dayjs(post.createdAt).fromNow()}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
