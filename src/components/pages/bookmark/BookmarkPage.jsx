import React from "react";
import BookmarkTable from "./BookmarkTable";
import { BsJournalBookmark } from "react-icons/bs";

const BookmarkPage = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex items-center gap-3 py-4">
        <BsJournalBookmark size={"2.2rem"} />
        <h1 className="text-4xl">Bookmarked Ads (4 Items)</h1>
      </div>
      <div className="pb-10">
        <BookmarkTable />
      </div>
    </div>
  );
};

export default BookmarkPage;
