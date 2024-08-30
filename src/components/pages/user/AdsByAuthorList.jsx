import React from "react";

const AdsByAuthorList = ({ ads }) => {
  return (
    <tbody className="[&amp;_tr:last-child]:border-0">
      {ads?.length > 0 ? (
        ads?.map((ad) => (
          <tr
            key={ad?._id}
            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
              #1001
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
              {ad?.title}
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
              {ad?.rent} ৳
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
              {ad?.availableForm}
            </td>
            <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
              <span className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 text-green-700 bg-green-100">
                Delivered
              </span>
            </td>
          </tr>
        ))
      ) : (
        <tr>No Ads to show</tr>
      )}
    </tbody>
  );
};

export default AdsByAuthorList;
