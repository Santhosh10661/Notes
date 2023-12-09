import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GrDocumentNotes, GrFormClose } from "react-icons/gr";
import { IconContext } from "react-icons";

function Header(props) {
  let {
    items,
    searchedItems,
    setSearchedItems,
    setClickedItem,
    setItemId,
    setCurrentDateTime,
    setItemTitle,
    setItemNotes,
    isDelBtnHide,
    setIsDelBtnHide,
    isFormHide,
    setIsFormHide,
    isSearchClicked,
    setIsSearchClicked,
  } = props;

  let searchCon = {
    height: "90%",
    width: isSearchClicked ? "100%" : "25px",
    borderRadius: isSearchClicked ? "15px" : "50px",
    transition: "0.3s ease",
    position: "relative",
  };
  let formStyle = {
    borderRadius: "15px",
    overflow: "hidden",
  };
  const handleSearch = (e) => {
    if (e.target.value.length === 0) {
      setSearchedItems();
    } else {
      let searchedFilter = items.filter((item) => {
        return item.title
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(e.target.value.toLowerCase());
      });
      setSearchedItems(searchedFilter);
    }
  };
  const handleSearchClose = () => {
    setSearchedItems();
    setIsSearchClicked(!isSearchClicked);
  };
  const handleSearchSelected = (item) => {
    setClickedItem([item]);
    setItemId(item.id);
    setCurrentDateTime(item.datetime);
    setItemTitle(item.title);
    setItemNotes(item.notes);
    setIsDelBtnHide(!isDelBtnHide);
    setIsFormHide(!isFormHide);
    handleSearchClose();
  };
  return (
    <header className="row d-flex bg-secondary text-light px-2 py-2">
      <aside className="col-6 d-flex align-items-center">
        <IconContext.Provider value={{ className: "NotesIcon" }}>
          <GrDocumentNotes />
        </IconContext.Provider>
        <span className=" h6 m-0 mx-1 ">NOTES</span>
      </aside>
      <div
        className="col-6 col-sm-5 col-lg-5 mx-sm-3 mx-md-4 d-flex justify-content-center align-items-end"
        style={{ flexDirection: "column", height: "28px" }}
      >
        <div
          style={searchCon}
          className="d-flex justify-content-between align-items-center bg-light p-1 m-1 "
        >
          {!isSearchClicked ? (
            <IconContext.Provider
              value={{ className: "searchIcon text-secondary " }}
            >
              <FiSearch
                onClick={() => {
                  setIsSearchClicked(!isSearchClicked);
                  setIsFormHide([true]);
                }}
              />
            </IconContext.Provider>
          ) : (
            <form
              action=""
              className="col-12 d-flex justify-content-between align-items-center"
              style={formStyle}
            >
              <input
                type="text"
                placeholder="Search Title"
                className="col-10 p-0 px-1"
                style={{ outline: "none", border: "none" }}
                onChange={(e) => handleSearch(e)}
              />
              <IconContext.Provider
                value={{ className: "SearchCloseIcon text-secondary " }}
              >
                <GrFormClose onClick={handleSearchClose} />
              </IconContext.Provider>
            </form>
          )}
        </div>
        {searchedItems && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              right: "2%",
              listStyle: "none",
            }}
            className="searchListCon col-11 col-sm-9 col-md-7 col-lg-5 m-1 m-sm-2 mx-md-3 my-md-2 text-secondary p-0 py-1 shadow-lg bg-light rounded"
          >
            {searchedItems.length === 0 ? (
              <li
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
                className="my-1 text-center p-2 "
              >
                Not Found
              </li>
            ) : (
              <>
                {searchedItems.map((item) => {
                  return (
                    <li
                      className="listItem border-secondary p-2"
                      key={item.id}
                      onClick={() => handleSearchSelected(item)}
                    >
                      <span className="col-7 fs-6 m-0 text-capitalize">
                        {item.title}
                      </span>
                      <small>
                        <sub>{item.datetime}</sub>
                      </small>
                    </li>
                  );
                })}
              </>
            )}
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
