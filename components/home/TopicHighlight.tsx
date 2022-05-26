import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { INewsPost } from "../../lib/models/NewsPostModel";
import { newsService } from "../../lib/services";
import TopicTag from "../data-display/TopicTag";

type TopicHighlightProps = {
  topic: string;
  title: string;
};
export default function TopicHighlight({ topic, title }: TopicHighlightProps) {
  const [news, setNews] = useState<Array<INewsPost>>([]);
  const [loading, setLoading] = useState(false);

  dayjs.extend(relativeTime);

  const initialize = async () => {
    setLoading(true);
    try {
      const posts = await newsService.getTopicNews(topic);
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
      <h3
        className={`mb-[15px] lg:mb-[30px] font-mont font-bold tracking-wide text-2xl lg:text-4xl capitalize`}
      >
        {title}
      </h3>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-2/3 lg:pr-[30px]">
          <div
            className="w-full aspect-video bg-no-repeat bg-cover"
            style={{ backgroundImage: `url('${news?.[0]?.postImage}')` }}
          >
            <div className="relative w-full h-full hidden lg:flex flex-col justify-end py-6 lg:py-12 px-6 lg:px-12 bg-black bg-opacity-25">
              <div className="my-4">
                <span className="px-3 py-1 inline uppercase text-xs lg:text-sm text-black bg-[#5BA66E] font-mont font-bold">
                  Travel
                </span>
              </div>
              <h2 className="w-3/4 text-white text-xl lg:text-3xl font-mont font-bold tracking-wide">
                <span className="bg-black leading-relaxed home-title">
                  <span>{news?.[0]?.title}</span>
                </span>
              </h2>
            </div>
          </div>
          <div className="mb-16 lg:hidden w-full flex flex-col justify-end px-4">
            <div className="my-4">
              <span className="px-3 py-1 inline uppercase text-xs lg:text-sm text-black bg-[#5BA66E] font-mont font-bold">
                Travel
              </span>
            </div>
            <h2 className=" text-white text-xl lg:text-3xl font-mont font-bold tracking-wide">
              <span className="bg-black leading-relaxed home-title">
                <span>{news?.[0]?.title}</span>
              </span>
            </h2>
          </div>
        </div>
        <div className="lg:w-1/3">
          <img
            src={news?.[1]?.postImage}
            alt={news?.[1]?.title}
            className="w-full aspect-video"
          />
          <TopicTag label={news?.[1]?.topic} />
          <h3 className="my-3 lg:text-xl font-mont font-bold tracking-wide text-black">
            {news?.[1]?.title}
          </h3>
          <p className="my-2 font-medium text-gray-500">
            {new Date(news?.[1]?.createdAt).toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap">
        {news.slice(3).map((post, index) => {
          return (
            <div className="w-full lg:w-1/3" key={post.id}>
              <div className="flex">
                <img
                  src={post.postImage}
                  alt={post.title}
                  className="w-1/3 aspect-square bg-cover"
                />
                <div className="px-[20px]">
                  <h4 className="text-base font-bold font-mont ">
                    {post.title}
                  </h4>
                </div>
              </div>
              <div className="my-[20px] pr-[20px]">
                <hr className={`w-full ${index > 2 ? "hidden" : ""}`} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
