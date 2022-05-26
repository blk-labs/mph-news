import Link from "next/link";
import { INewsPost } from "../../lib/models/NewsPostModel";

type LatestNewsItemProps = {
  post: INewsPost;
  divider?: boolean;
};
export default function LatestNewsItem({
  post,
  divider = true,
}: LatestNewsItemProps) {
  return (
    <>
      <Link href={`/story/${post.id}`}>
        <a>
          <div className="flex items-center" key={post.id}>
            <img
              src={post.postImage}
              alt={post.title}
              className="lg:w-[70px] lg:h-[70px] lg:mr-[18px] rounded-full"
            />
            <div className="font-mont">
              <p className="mb-2 font-medium text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-xl font-bold tracking-wide">{post.title}</p>
            </div>
          </div>
        </a>
      </Link>
      <hr className={`my-6 ${divider ? "" : "hidden"}`} />
    </>
  );
}
