import EmptyMessage from "../../global/EmptyMessage";

const AdsByAuthorList = ({
  ads,
  setIsShowing,
  setSelectedAd,
  showDeleteModal,
  setShowDeleteModal,
  setToDeleteAdId,
}) => {
  const handleClick = (ad) => {
    setIsShowing(true);
    const a = {
      _id: ad?._id,
      title: ad?.title,
      description: ad?.description,
      category: ad?.category,
      rent: ad?.rent,
      floor: ad?.floor,
      bedroom: ad?.bedroom,
      bathroom: ad?.bathroom,
      availableForm: ad?.availableForm,
      contact: {
        phone: ad?.contact?.phone,
        whatsapp: ad?.contact?.whatsapp,
      },
    };
    setSelectedAd(a);
  };
  return (
    <>
      <tbody className="[&amp;_tr:last-child]:border-0">
        {ads?.length > 0 ? (
          ads?.map((ad) => (
            <tr
              key={ad?._id}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              {/* ad id */}
              {/* <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                #{ad?._id.slice(-10)}
              </td> */}
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {ad?.title}
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {ad?.rent} ৳
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {ad?.availableForm}
              </td>
              <td className="p-4 align-middle flex gap-3 [&amp;:has([role=checkbox])]:pr-0">
                <button
                  onClick={() => handleClick(ad)}
                  className="inline-flex w-fit items-center whitespace-nowrap rounded border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  hover:bg-primary/80 text-blue-700 hover:bg-blue-100 border-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setToDeleteAdId(ad?._id);
                  }}
                  className="inline-flex w-fit items-center whitespace-nowrap rounded border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 text-red-700 hover:bg-red-100 border-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <EmptyMessage message="No posts available" showBtn={true} />
        )}
      </tbody>
    </>
  );
};

export default AdsByAuthorList;
