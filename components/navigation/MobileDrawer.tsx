import { Close, Menu } from "@mui/icons-material";
import { Drawer } from "@mui/material";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import SocialLinkButtons from "../inputs/SocialLinkButtons";
import { AccountButton } from "../surfaces/AppBar";

const MobileDrawer: React.FunctionComponent = () => {
  const { current: topics } = useRef([
    { title: "Nigeria", link: "/topics/nigeria" },
    { title: "International", link: "/topics/international" },
    { title: "Security", link: "/topics/security" },
    { title: "Health", link: "/topics/health" },
    { title: "Business", link: "/topics/business" },
    { title: "National Assembly", link: "/documents" },
    { title: "Voices", link: "/voices" },
    { title: "Other", link: "/topics/other" },
  ]);
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((state) => !state);
  }, [open]);

  return (
    <>
      <Menu className="text-[35px]" onClick={toggleDrawer} />

      <Drawer anchor={"left"} open={open} onClose={toggleDrawer}>
        <div className="w-screen p-[15px]">
          <div className="flex justify-end">
            <div className="h-[50px] leading-[50px] px-[20px]" onClick={toggleDrawer}>
              <Close className="text-[35px]" />
            </div>
          </div>

          <div className="mb-[30px] flex items-center">

          <AccountButton className="justify-start" />
          </div>

          <div>
              {
                  topics.map((topic) => {
                      return (
                          <>
                          <Link href={topic.link} key={topic.title}>
                          <a className="h-[60px] leading-[60px] font-mont text-[20px] font-bold" onClick={toggleDrawer}>
                              { topic.title }
                          </a>
                          </Link>
                          <hr />
                          </>
                      );
                  })
              }
          </div>

          <div className="my-[20px] py-[15px] flex justify-center">
          <SocialLinkButtons theme={"dark"} showLabel={false} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
