import { Close, SearchOutlined } from "@mui/icons-material";
import { Backdrop, Fade, LinearProgress, Modal, TextField } from "@mui/material";
import { useCallback, useState } from "react";

const SearchDialog: React.FunctionComponent = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchIconClick = useCallback(() => {
    setSearchOpen(true);
  }, [searchOpen]);
  const handleSearchModalClose = useCallback(() => {
    setSearchOpen(false);
  }, [searchOpen]);

  const onSearchInputChanged = useCallback((e) => {
      setSearchInput(e.target.value);
  }, [searchInput]);

  return (
    <>
      <div onClick={handleSearchIconClick}>
        <SearchOutlined fontSize={"large"} className={"cursor-pointer"} />
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={"flex justify-center items-center"}
        open={searchOpen}
        onClose={handleSearchModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={searchOpen}>
          <div className="w-full lg:w-2/3 h-full lg:h-4/5 z-30 bg-white p-[20px]">
            <div className="flex justify-end">
            <Close fontSize={"large"} className="cursor-pointer" onClick={handleSearchModalClose} />
            </div>
            <form className="my-[20px] w-full border border-gray-300 flex flex-col lg:flex-row lg:items-center">
              <TextField
                color="secondary"
                value={searchInput}
                onChange={onSearchInputChanged}
                placeholder="Search MPH news!"
                className="bg-white"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  className: "rounded-none",
                }}
              />

              <input
                type={"submit"}
                value="Search"
                className="px-10 py-4 bg-black text-white font-mont font-bold hover:cursor-pointer"
              />
            </form>

            {loading && (<LinearProgress className="w-full mb-[20px]" variant={"indeterminate"} />)}
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default SearchDialog;
