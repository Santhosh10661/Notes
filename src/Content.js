import React from "react";

function Content(props) {
  let {
    items,
    fetchErr,
    setClickedItem,
    setItemId,
    setCurrentDateTime,
    setItemTitle,
    setItemNotes,
    setIsFormHide,
    isDelBtnHide,
    setIsDelBtnHide,
    isFormHide,
    isSearchClicked,
    setIsSearchClicked,
    setSearchedItems,
  } = props;

  function handleClick(item) {
    setSearchedItems();
    setIsSearchClicked(false);
    setClickedItem([item]);
    setItemId(item.id);
    setCurrentDateTime(item.datetime);
    setItemTitle(item.title);
    setItemNotes(item.notes);
    setIsDelBtnHide(!isDelBtnHide);
    setIsFormHide(!isFormHide);
  }
  return (
    <main className="container-fluid p-0">
      {!fetchErr && (
        <>
          {items.map((item, index) => {
            return (
              <div
                className="item col-12 col-sm-5 col-md-3 col-lg-2 m-0 my-1 m-sm-1 m-md-2 "
                key={index}
                onClick={() => handleClick(item)}
              >
                <h2 className="m-0 text-capitalize">{item.title}</h2>
                <span>
                  <small>{item.datetime}</small>
                </span>
                <p>{item.notes}</p>
              </div>
            );
          })}
        </>
      )}
    </main>
  );
}

export default Content;
