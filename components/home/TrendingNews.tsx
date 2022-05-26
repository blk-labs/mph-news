import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useEffect, useState } from "react";
import { INewsPost } from "../../lib/models/NewsPostModel";
import { newsService } from "../../lib/services";

export default function TrendingNews() {
  const [news, setNews] = useState<Array<INewsPost>>([]);
  const [loading, setLoading] = useState(false);

  dayjs.extend(relativeTime);

  const initialize = async () => {
    setLoading(true);
    try {
      const posts = await newsService.getTrendingNews();
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
    <div className="w-full lg:w-2/3 py-6 lg:pt-10 lg:pb-0 lg:pr-10">
      <h2
        className={`mb-6 font-mont font-bold tracking-wide text-[#5BA66E] text-2xl lg:text-4xl`}
      >
        Trending News
      </h2>

      {news.map((post, index) => {
        return (
          <>
            <div key={post.id} className={`${index === news.length - 1 ? '' : 'lg:mb-6'} flex flex-wrap lg:flex-nowrap lg:items-center`}>
              <div className="w-full aspect-video lg:w-[320px] lg:h-[230px] lg:mr-6 flex-shrink-0">
                <img
                  src={post.postImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <Link href={`/topics/${post.topic}`}>
                  <a className="my-4 px-3 py-1 inline-block text-xs lg:text-sm text-black bg-[#5BA66E] font-mont font-medium uppercase">
                    {post.topic}
                  </a>
                </Link>
                <p className="text-xl lg:text-2xl text-black font-bold font-mont hover:underline">
                  <Link href={`story/post.id`}>
                  <a>
                  {post.title}
                  </a>
                  </Link>
                </p>
                <p className="mt-3 font-medium text-gray-500 tracking-wide">
                  By{" "}
                  <span className="text-black underline">{post.postedBy}</span>{" "}
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
            <hr className={`my-6 ${index === news.length - 1 ? "hidden" : ""}`} />
          </>
        );
      })}
    </div>
  );
}
