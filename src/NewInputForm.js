import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";

function NewInputForm(props) {
  let {
    currentDateTime,
    items,
    setItems,
    isFormHide,
    setIsFormHide,
    setFetchErr,
    clickedItem,
    setClickedItem,
    itemId,
    setItemId,
    itemTitle,
    setItemTitle,
    itemNotes,
    setItemNotes,
    isDelBtnHide,
    setIsDelBtnHide,
    setIsLoading,
    setApiCalling,
    apiCalling,
  } = props;

  let inputStyle = {
    background: "transparent",
    outline: "none",
    borderRadius: "7px",
    width: "100%",
    border: "none",
    height: "100%",
  };
  let textAreastyle = {
    background: "#fff",
    outline: "none",
    borderRadius: "7px",
    width: "100%",
    border: "none",
    height: "100%",
  };
  let itemIdCheck = false;
  let apiUrl = "http://localhost:8080/crud/";

  // update title
  function handleTitleChange(e) {
    setItemTitle(e.target.value);
  }

  // update notes
  function handleTextChange(e) {
    setItemNotes(e.target.value);
  }

  // delete notes
  const handleDelItem = async () => {
    setIsLoading(true);
    let newListAfterDel = items.filter((item) => item.id !== itemId);

    const deleteItem = { method: "DELETE" };
    let reqUrl = `${apiUrl}deleteNotes/${itemId}`;
    let reqOption = deleteItem;

    setTimeout(() => {
      (async () => await reqApi(newListAfterDel, reqUrl, reqOption))();
    });

    setClickedItem();
    setItemId(null);
    setItemTitle("");
    setItemNotes("");
    setFetchErr("");
    setIsFormHide(!isFormHide);
    setIsDelBtnHide(true);
  };

  // note when submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let curTitle = itemTitle;
    let curNotes = itemNotes;

    items.map((item) => {
      if (item.id === itemId) {
        itemIdCheck = true;
      }
    });

    let afterTitleTrim = itemTitle.replace(/\s/g, "");
    let afterNoteTrim = itemNotes.replace(/\s/g, "");

    if (afterTitleTrim.length !== 0 || afterNoteTrim.length !== 0) {
      setIsLoading(true);
      if (afterTitleTrim.length === 0) {
        curTitle = "unknown";
      } else if (afterNoteTrim.length === 0) {
        curNotes = "Empty...!";
      }

      let reqUrl;
      let reqOption;

      if (itemIdCheck) {
        let newitem = {
          id: itemId,
          title: curTitle,
          datetime: currentDateTime,
          notes: curNotes,
        };
        let listItem = items.map((item) =>
          item.id === itemId ? newitem : item
        );

        const updateItem = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newitem),
        };
        reqUrl = `${apiUrl}putNotes`;
        reqOption = updateItem;

        setTimeout(() => {
          (async () => await reqApi(listItem, reqUrl, reqOption))();
        });
      } else {
        let newitem = {
          title: curTitle,
          datetime: currentDateTime,
          notes: curNotes,
        };

        let newItemList = [...items, newitem];
        const postItem = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newitem),
        };

        reqOption = postItem;
        reqUrl = `${apiUrl}postNotes`;

        setTimeout(() => {
          (async () => await reqApi(newItemList, reqUrl, reqOption))();
        });
      }
    }
    setClickedItem();
    setItemId(null);
    setItemTitle("");
    setItemNotes("");
    setIsFormHide(!isFormHide);
    setIsDelBtnHide(true);
  };

  const reqApi = async (newList, reqUrl, reqOption) => {
    const result = await ApiRequest(reqUrl, reqOption);
    if (result) setFetchErr(result);
    setFetchErr("");
    // setItems(newList);
  };

  const ApiRequest = async (url = "", option = null, errMsg) => {
    try {
      const response = await fetch(url, option);
      if (!response.ok) throw Error("Reload");
    } catch (err) {
      errMsg = err.message;
    } finally {
      setApiCalling(!apiCalling);
      return errMsg;
    }
  };

  return (
    <form
      action=""
      className="NewInputForm col-12 d-flex p-2 text-secondary "
      onSubmit={handleSubmit}
    >
      <div className="d-flex">
        <input
          type="text"
          placeholder="Title"
          style={inputStyle}
          onChange={handleTitleChange}
          className="m-0 h2 text-capitalize"
          maxLength={50}
          defaultValue={clickedItem ? clickedItem[0].title : ""}
        />
        {!isDelBtnHide ? (
          <button
            className="deleteIcon text-secondary"
            type="button"
            onClick={handleDelItem}
          >
            <IconContext.Provider
              value={{ style: { width: "30px", height: "30px" } }}
            >
              <MdDeleteForever />
            </IconContext.Provider>
          </button>
        ) : (
          ""
        )}

        <button className="finishIcon text-secondary" type="submit">
          <IconContext.Provider
            value={{ style: { width: "30px", height: "30px" } }}
          >
            <IoMdCheckmark />
          </IconContext.Provider>
        </button>
      </div>
      <span className="date">
        <small>{clickedItem ? clickedItem[0].datetime : currentDateTime}</small>
      </span>
      <div className="textCon">
        <textarea
          name="note"
          className="col-12"
          style={textAreastyle}
          onChange={handleTextChange}
          placeholder="Start Typing....."
          defaultValue={clickedItem ? clickedItem[0].notes : ""}
        ></textarea>
      </div>
    </form>
  );
}

export default NewInputForm;
