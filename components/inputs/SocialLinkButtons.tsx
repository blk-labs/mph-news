import {
  FacebookRounded,
  Instagram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import Link from "next/link";

type SocialLinkButtonsProps = {
  className?: string;
  theme?: "dark" | "light";
  showLabel?: boolean;
};
const SocialLinkButtons: React.FunctionComponent<SocialLinkButtonsProps> = ({
  className = "",
  theme = "light",
  showLabel = true,
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {showLabel && (
        <p className="lg:hidden mr-6 font-mont font-medium">Follow us </p>
      )}
      <Link
        href="https://web.facebook.com/My-Political-Hub-106231897488181/"
        target={"_blank"}
      >
        <a className="mr-6">
          <FacebookRounded
            fontSize={"small"}
            className={theme === "light" ? "text-white" : "text-black"}
          />
        </a>
      </Link>

      <Link href="https://www.twitter.com/my_politicalhub" target={"_blank"}>
        <a className="mr-6">
          <Twitter
            fontSize={"small"}
            className={theme === "light" ? "text-white" : "text-black"}
          />
        </a>
      </Link>

      <Link
        href="https://www.youtube.com/channel/UCwnOgB3veQgUkuB0QCBX55w"
        target={"_blank"}
      >
        <a className="mr-6">
          <YouTube
            fontSize={"small"}
            className={theme === "light" ? "text-white" : "text-black"}
          />
        </a>
      </Link>

      <Link href="https://www.instagram.com/my_politicalhub" target={"_blank"}>
        <a className="mx-3">
          <Instagram
            fontSize={"small"}
            className={theme === "light" ? "text-white" : "text-black"}
          />
        </a>
      </Link>
    </div>
  );
};

export default SocialLinkButtons;
