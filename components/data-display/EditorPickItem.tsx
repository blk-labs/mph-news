import { ScheduleOutlined, TrendingUp } from "@mui/icons-material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

type EditorPickItemProps = {
  id: string;
  index: number;
  title: string;
  viewCount: number;
  publishedOn: string;
};

export default function EditorPickItem(props: EditorPickItemProps) {
  dayjs.extend(relativeTime);
  return (
    <Link href={`story/${props.id}`}>
    <a>
    <div className="h-full flex px-4">
      <p className="font-bold font-mont text-xl text-[#c0c0c0]">
        0{props.index}
      </p>
      <div className="flex flex-col ml-4 font-mont">
        <p className="flex-grow font-bold text-[16px] lg:text-[18px] tracking-wide">{props.title}</p>
        <div className="mt-4">
          <span className="text-[#999999] text-sm mr-6" >
            <TrendingUp className="text-base text-black mr-2" />
            {props.viewCount} Views
          </span>
          <span className="text-[#999999] text-sm" >
            <ScheduleOutlined className="text-base text-black mr-2" />
            {dayjs(props.publishedOn).fromNow()}
          </span>
        </div>
      </div>
    </div>
    </a>
    </Link>
  );
}
