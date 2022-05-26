import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Comps
import NewsPost, { INewsPost } from "../../lib/models/NewsPostModel";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { newsService } from "../../lib/services";
import { NextPageContext } from "next";
import TopicTag from "../../components/data-display/TopicTag";
import Footer from "../../components/surfaces/Footer";
import NewsLetterSubscription from "../../components/home/NewsLetterSubscription";
import Head from "next/head";
import useRouting from "../../hooks/routingHook";

// export async function getServerSideProps(context: NextPageContext) {
//   const { topic } = context.query;

//   const posts = await newsService.getTopicNews(topic as string, 10);

//   return {
//     props: {
//       posts: posts.map((post) => post.toJsonSerializable()),
//       topic,
//     },
//   };
// }

type TopicPageProps = {
  posts: Array<INewsPost>;
  topic: string;
};
export function TopicPage(/*{ posts, topic }: TopicPageProps*/) {
  const router = useRouter();
  const { topic } = router.query;

  const [news, setNews] = useState<Array<INewsPost>>(
    []
    // posts.map((post) => NewsPost.fromJson(post)) || []
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const RESULT_PER_PAGE = 10;

  dayjs.extend(relativeTime);

  const handlePrevPage = useCallback(() => {
    if (news.length <= 0 || currentPage <= 1) return;
    setCurrentPage((state) => (state > 1 ? state - 1 : state));
    fetchPosts(news[0].createdAt, true);
  }, [currentPage, news]);

  const handlePage = useCallback(
    (page: number) => {
      if (page < currentPage) {
        handlePrevPage();
      } else {
        handleNextPage();
      }
    },
    [currentPage, news]
  );

  const handleNextPage = useCallback(() => {
    if (news.length !== 10) return;
    console.log({ newslength: news.length });
    setCurrentPage((state) => ((news || []).length === 10 ? state + 1 : state));
    fetchPosts(news[news.length - 1].createdAt);
  }, [currentPage, news]);

  const fetchPosts = async (
    pivotCreatedAt: string,
    before: boolean = false
  ) => {
    setLoading(true);
    try {
      const posts = await newsService.getTopicNews(
        topic as string,
        RESULT_PER_PAGE,
        pivotCreatedAt,
        before
      );
      if (posts.length === 0 && currentPage > 1) {
        setCurrentPage((state) => state - 1);
      } else {
        setNews(posts);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useRouting((status) => {
    status === "complete" && fetchPosts("");
  });

  useEffect(() => {
    fetchPosts("");
  }, []);

  return (
    <>
      <Head>
        <title>MPH News | {topic}</title>
      </Head>

      <div className="font-mont">
        <div className="w-full lg:w-1/2 px-6 lg:px-[120px] py-[30px]">
          <h1 className="capitalize font-black text-[42px] lg:text-[64px]">
            {topic}
          </h1>
          <p className="text-base text-gray-700">
            Get the latest {topic} news and hot celeb gossip with exclusive
            stories and pictures to discover more!
          </p>
        </div>

        <hr />

        <div className="w-full flex flex-wrap items-stretch px-6 lg:px-[120px] py-[30px]">
          <div className={"w-full h-full lg:w-2/3 lg:pr-[50px]"}>
            {news.map((post, index) => {
              return (
                <div key={post.id} className="py-[25px]">
                  <div
                    className="w-full aspect-[16/10] bg-cover bg-no-repeat mb-[16px] lg:mb-0 lg:p-[36px]"
                    style={{ backgroundImage: `url('${post.postImage}')` }}
                  >
                    <TopicTag label={post.topic} />
                  </div>
                  <div className="w-full lg:w-[92%] bg-white z-10 lg:mt-[-50px]  lg:p-[36px]">
                    <div className="flex items-center text-sm py-[10px]">
                      <span className="mr-2">By</span>{" "}
                      <span className="font-bold underline">
                        {post.postedBy}
                      </span>{" "}
                      <div className="w-1 h-1 mx-3 rounded-full bg-black"></div>
                      {new Date(post.createdAt).toLocaleDateString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <h2 className="lg:my-[30px] text-[24px] lg:text-3xl font-extrabold hover:underline transition-all">
                      <Link href={`/story/${post.id}`}>
                        <a>{post.title}</a>
                      </Link>
                    </h2>
                    <p className="mb-[30px] overflow-ellipsis">
                      {post.body.substring(0, 180)}...
                    </p>

                    <Link href={`/story/${post.id}`}>
                      <a className="text-sm font-bold border-b-4 border-[#5BA66E]">
                        Continue reading
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}

            <div className="my-[36px] flex flex-wrap items-center  font-bold text-xs uppercase">
              <p
                className="h-[60px] leading-[60px] px-[25px] border border-gray-300 hover:bg-gray-200 cursor-pointer"
                onClick={handlePrevPage}
              >
                prev
              </p>
              {currentPage > 1 && (
                <p
                  className="h-[60px] leading-[60px] px-[25px] border border-gray-300 hover:bg-gray-200 cursor-pointer ml-[-1px]"
                  onClick={() => handlePage(currentPage - 1)}
                >
                  {currentPage - 1}
                </p>
              )}
              <p className="h-[60px] leading-[60px] px-[25px] border border-[#5BA66E] bg-[#5BA66E] ml-[-1px]">
                {currentPage}
              </p>
              {news.length === RESULT_PER_PAGE && (
                <p
                  className="h-[60px] leading-[60px] px-[25px] border border-gray-300 hover:bg-gray-200 cursor-pointer ml-[-1px]"
                  onClick={() => handlePage(currentPage + 1)}
                >
                  {currentPage + 1}
                </p>
              )}
              <p
                className="h-[60px] leading-[60px] px-[25px] border border-gray-300 hover:bg-gray-200 cursor-pointer ml-[-1px]"
                onClick={handleNextPage}
              >
                Next
              </p>
            </div>
          </div>

          <NewsLetterSubscription className="relative" />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default TopicPage;
