import React, { useEffect } from "react";
import { useState } from "react";
import Content from "./Content";
import Header from "./Header";
import NewInputForm from "./NewInputForm";
import { IoMdAdd } from "react-icons/io";
import { RiMenuAddFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import "./Notes.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Notes() {
  let apiURL = "http://localhost:8080/crud/getNotes";
  let [items, setItems] = useState([]);
  let [isFormHide, setIsFormHide] = useState(true);
  let [isDelBtnHide, setIsDelBtnHide] = useState(true);
  let [itemId, setItemId] = useState(null);
  let [currentDateTime, setCurrentDateTime] = useState([]);
  let [itemTitle, setItemTitle] = useState("");
  let [itemNotes, setItemNotes] = useState("");
  let [fetchErr, setFetchErr] = useState(RiMenuAddFill);
  let [clickedItem, setClickedItem] = useState();
  let [isloading, setIsLoading] = useState(true);
  let [searchedItems, setSearchedItems] = useState();
  let [apiCalling, setApiCalling] = useState(false);
  let [isSearchClicked, setIsSearchClicked] = useState(false);
  let [isEmpty, setIsEmpty] = useState(false);
  let addBtnStyle = {
    width: "30px",
    height: "30px",
    transform: isFormHide ? "rotate(0deg)" : "rotate(135deg)",
    transition: "0.3s ease",
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchItem = async () => {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Data Not Found");
        const allItems = await response.json();
        if (allItems.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }
        setItems(allItems);
        setFetchErr("");
      } catch (err) {
        setFetchErr(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItem())();
    }, 1000);
  }, [apiCalling]);

  function getDT() {
    let dateTime = new Date();
    let date = { day: "numeric" };
    let month = { month: "short" };
    let year = { year: "numeric" };
    let dateInputs = {
      hour: "2-digit",
      minute: "2-digit",
    };
    let formattedDT = `${dateTime.toLocaleDateString(
      "en-US",
      date
    )} ${dateTime.toLocaleDateString(
      "en-US",
      month
    )} ${dateTime.toLocaleDateString(
      "en-US",
      year
    )} ${dateTime.toLocaleTimeString("en-US", dateInputs)}`;
    setCurrentDateTime(formattedDT);
  }
  const handleFormHide = () => {
    if (isFormHide) {
      // let newItemId = items.length ? items.length + 1 : 1;
      // setItemId(newItemId);
      getDT();
      setIsFormHide(!isFormHide);
    } else {
      setItemId(null);
      setIsFormHide(!isFormHide);
      setClickedItem();
      setIsDelBtnHide(true);
    }
  };

  return (
    <div className="Notes container-fluid">
      <Header
        items={items}
        searchedItems={searchedItems}
        setSearchedItems={setSearchedItems}
        setClickedItem={setClickedItem}
        setItemId={setItemId}
        setCurrentDateTime={setCurrentDateTime}
        setItemTitle={setItemTitle}
        setItemNotes={setItemNotes}
        setIsFormHide={setIsFormHide}
        isDelBtnHide={isDelBtnHide}
        setIsDelBtnHide={setIsDelBtnHide}
        isFormHide={isFormHide}
        handleFormHide={handleFormHide}
        isSearchClicked={isSearchClicked}
        setIsSearchClicked={setIsSearchClicked}
      />
      {isEmpty && (
        <IconContext.Provider
          value={{ className: "errMsg m-0 h2 text-secondary" }}
        >
          <RiMenuAddFill />
        </IconContext.Provider>
      )}
      {fetchErr && <p className="errMsg m-0 h2 text-secondary">{fetchErr}</p>}
      {isloading ? (
        // <p className="errMsg m-0 h2 text-secondary">Loading....</p>
        <div className="col-12 d-flex align-items-center justify-content-center errMsg">
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Content
          items={items}
          fetchErr={fetchErr}
          isFormHide={isFormHide}
          setIsFormHide={setIsFormHide}
          clickedItem={clickedItem}
          setClickedItem={setClickedItem}
          setCurrentDateTime={setCurrentDateTime}
          setItemId={setItemId}
          setItemTitle={setItemTitle}
          setItemNotes={setItemNotes}
          isDelBtnHide={isDelBtnHide}
          setIsDelBtnHide={setIsDelBtnHide}
          isSearchClicked={isSearchClicked}
          setIsSearchClicked={setIsSearchClicked}
          setSearchedItems={setSearchedItems}
        />
      )}
      {isFormHide ? (
        ""
      ) : (
        <NewInputForm
          setItems={setItems}
          items={items}
          currentDateTime={currentDateTime}
          isFormHide={isFormHide}
          setIsFormHide={setIsFormHide}
          setFetchErr={setFetchErr}
          clickedItem={clickedItem}
          setClickedItem={setClickedItem}
          itemId={itemId}
          setItemId={setItemId}
          itemTitle={itemTitle}
          setItemTitle={setItemTitle}
          itemNotes={itemNotes}
          setItemNotes={setItemNotes}
          isDelBtnHide={isDelBtnHide}
          setIsDelBtnHide={setIsDelBtnHide}
          setIsLoading={setIsLoading}
          setApiCalling={setApiCalling}
          apiCalling={apiCalling}
        />
      )}
      <div className="addIcon bg-secondary text-light" onClick={handleFormHide}>
        <IoMdAdd style={addBtnStyle} />
      </div>
    </div>
  );
}

export default Notes;
