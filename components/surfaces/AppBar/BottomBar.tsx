import Link from "next/link";
import { useRef } from "react";
import SearchDialog from "../../feedbacks/SearchDialog";
import SearchModal from "../../layout/Search";

type BottomBarProps = {
    className: string;
}
const BottomBar: React.FunctionComponent<BottomBarProps> = ({ className }) => {
  const titles = useRef([
    { title: "Nigeria", link: "/topics/nigeria" },
    { title: "International", link: "/topics/international" },
    { title: "Security", link: "/topics/security" },
    { title: "Health", link: "/topics/health" },
    { title: "Business", link: "/topics/business" },
    { title: "National Assembly", link: "/documents" },
    { title: "Voices", link: "/voices" },
    { title: "Other", link: "/topics/other" },
  ]);

  return (
    <div className={`lg:px-[120px] py-4 flex items-center border-b-[3px] border-black border-solid ${className}`}>
      {titles.current.map((entry, i) => {
        return (
          <Link key={entry.title} href={entry.link} className={``}>
            <a className={`capitalize pr-12 font-mont font-medium`}>{entry.title}</a>
          </Link>
        );
      })}

      <div className="flex-grow text-right">
        <SearchDialog />
      </div>
    </div>
  );
};

export default BottomBar;
