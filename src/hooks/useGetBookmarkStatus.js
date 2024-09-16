import { useEffect, useState } from "react";
import { useCheckBookmarkStatusQuery } from "../feature/api/apiSlice";

const UseGetBookmarkStatus = (ad, user) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data, status } = useCheckBookmarkStatusQuery({
    userId: user?._id,
    adId: ad?._id,
  });

  useEffect(() => {
    if (status === "fulfilled") {
      setIsBookmarked(data);
    } else {
      setIsBookmarked(false);
    }
  }, [status]);

  return isBookmarked;
};

export default UseGetBookmarkStatus;
