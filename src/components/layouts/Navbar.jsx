import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logOut } from "../../feature/user/userSlice";
import { useGetBookmarksByUserQuery } from "../../feature/api/apiSlice";
import { navLinks } from "../../utils/navUtils";

export default function Navbar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [showDropDown, setShowDropDOwn] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const dropDownRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);

  const { data, isSuccess } = useGetBookmarksByUserQuery(user?._id, {
    skip: !user,
  });
  let totalBookmarks;

  if (isSuccess) {
    totalBookmarks = data?.adIds?.filter((ad) => ad.active)?.length;
  }

  const location = useLocation();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropDownRef && !dropDownRef?.current?.contains(e.target)) {
        setShowDropDOwn(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // of: for current path
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const onClickDropDown = () => {
    setShowDropDOwn(!showDropDown);
  };

  const onActionClicks = () => {
    if (isToggleOpen) {
      setIsToggleOpen(false);
    } else isToggleOpen;
  };

  return (
    <>
      {/*<!-- Component: Navbar with Topbar --> */}
      {/*<!-- Top bar --> */}
      <div className="bg-slate-100">
        <div className="mx-auto grid w-full max-w-full grid-cols-4 gap-6 py-2 px-6 text-sm text-slate-500 md:grid-cols-8 lg:max-w-5xl lg:grid-cols-12 xl:max-w-7xl 2xl:max-w-[96rem]">
          <div className="col-span-2 items-center md:col-span-4 lg:col-span-6">
            <a className="flex items-center gap-2 transition-colors duration-300 hover:text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                role="graphics-symbol"
                aria-labelledby="title-tb00 desc-tb00"
              >
                <title id="title-tb00">Icon title</title>
                <desc id="desc-tb00">
                  A more detailed description of the icon
                </desc>
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
                />
              </svg>
              +306750009800
            </a>
          </div>
          <div className="col-span-2 items-center justify-end gap-6 md:col-span-4 lg:col-span-6">
            <div className="flex items-center justify-end gap-4">
              <a className="transition-colors duration-300 hover:text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  height="16"
                  width="16"
                  role="graphics-symbol"
                  aria-labelledby="title-tb01 desc-tb01"
                >
                  <title id="title-tb01">Icon title</title>
                  <desc id="desc-tb01">
                    A more detailed description of the icon
                  </desc>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M37.2491 3.30238C37.0498 2.18649 36.0513 1.49746 34.9878 1.50395C32.2606 1.5206 29.7927 1.60328 27.6333 1.96988C25.4705 2.33708 23.584 2.99414 22.038 4.18283C18.9929 6.52415 17.4377 10.7872 17.3724 18.3217H11.9552C10.9254 18.3217 9.94522 18.9739 9.74313 20.0674C9.51312 21.312 9.33088 23.311 9.75643 25.8014C9.95527 26.9651 10.9939 27.7324 12.1233 27.7324H17.3703V44.3867C17.3703 45.2169 17.8349 46.0595 18.7834 46.2403C19.5015 46.3773 20.6304 46.5002 22.375 46.5002C24.1168 46.5002 25.347 46.3777 26.1718 46.2437C27.2507 46.0684 27.8777 45.1191 27.8777 44.1186V27.7324H34.9316C36.0256 27.7324 37.0562 27.009 37.2608 25.8665C37.6736 23.5618 37.4742 21.4753 37.2437 20.1563C37.0465 19.0284 36.0444 18.3217 34.9653 18.3217H27.8795C27.8917 16.7111 27.9661 15.4564 28.1447 14.4728C28.341 13.3921 28.6547 12.6875 29.1044 12.2048C29.5502 11.7263 30.1817 11.4104 31.1284 11.2121C32.0832 11.0121 33.3126 10.9408 34.9123 10.9193C36.0128 10.9045 37.0511 10.1718 37.2541 9.01765C37.6718 6.64193 37.4794 4.59202 37.2491 3.30238Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a className="transition-colors duration-300 hover:text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  height="16"
                  width="16"
                  role="graphics-symbol"
                  aria-labelledby="title-tb02 desc-tb02"
                >
                  <title id="title-tb02">Icon title</title>
                  <desc id="desc-tb02">
                    A more detailed description of the icon
                  </desc>
                  <path
                    fill="currentColor"
                    d="M34.7229 4.69819C36.9179 5.13151 38.8231 6.226 39.9574 7.46121L44.8741 7.22772C46.162 7.16656 46.9576 8.61264 46.216 9.66758L42.8041 14.5217C43.7777 35.6815 22.2547 49.0961 4.54954 41.2208C3.75067 40.8654 3.58181 40.0439 3.74682 39.4029C3.91015 38.7685 4.4337 38.1304 5.23631 38.0329C7.74782 37.7279 10.886 36.8951 13.5309 34.8102C11.3351 34.4801 8.87383 33.2203 6.77118 31.5522C4.25179 29.5535 2.11595 26.8651 1.53319 24.2321C1.41942 23.7181 1.60805 23.2504 1.94754 22.9478C2.27981 22.6517 2.75116 22.5146 3.22643 22.6022C4.4998 22.8369 6.44397 23.1705 7.93366 23.3225C7.82715 23.2095 7.71399 23.0872 7.59534 22.9561C6.83881 22.1198 5.85466 20.9171 4.947 19.4528C3.13974 16.5372 1.58717 12.5021 2.86967 8.24191C3.04524 7.65872 3.52191 7.3215 4.02883 7.2399C4.52724 7.15967 5.07712 7.31911 5.46709 7.72851C7.80814 10.1862 13.7896 15.4057 22.914 16.1638C22.5823 14.0277 22.368 9.45707 27.2507 6.17582C29.7236 4.51405 32.4029 4.2402 34.7229 4.69819Z"
                  />
                </svg>
              </a>
              <a className="transition-colors duration-300 hover:text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                  height="16"
                  width="16"
                  role="graphics-symbol"
                  aria-labelledby="title-tb03 desc-tb03"
                >
                  <title id="title-tb03">Icon title</title>
                  <desc id="desc-tb03">
                    A more detailed description of the icon
                  </desc>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M18.9563 7.52344C18.7526 6.91526 18.1767 6.49018 17.5166 6.51256C13.7277 6.64105 10.4346 7.72034 9.03159 8.24815C8.46409 8.46164 7.98142 8.84195 7.6475 9.35489C6.13235 11.6824 1.35143 20.1396 1.5015 33.9816C1.51112 34.8687 1.87868 35.7421 2.60293 36.3174C4.05518 37.4709 7.22566 39.6169 12.2716 41.1548C13.1338 41.4176 14.1343 41.1791 14.6848 40.3722C15.3668 39.3727 15.9633 38.1197 16.3718 37.1704C16.4818 36.9145 16.7753 36.775 17.0546 36.8566C18.8459 37.3799 21.1512 37.7795 24.0128 37.7795C26.865 37.7795 29.1613 37.3825 30.9459 36.8617C31.2254 36.7802 31.5188 36.9197 31.6289 37.1755C32.0373 38.1241 32.6329 39.3744 33.3137 40.3722C33.8643 41.1791 34.8647 41.4176 35.727 41.1548C40.7729 39.6169 43.9433 37.4709 45.3956 36.3174C46.1198 35.7421 46.4874 34.8687 46.497 33.9816C46.6459 20.2518 41.9432 11.8198 40.3884 9.41269C40.0295 8.85716 39.4986 8.45634 38.8845 8.24366C37.3835 7.72379 33.9285 6.65561 30.4846 6.51532C29.821 6.48828 29.2456 6.91631 29.0422 7.52344L28.5352 9.03687C28.4493 9.293 28.1503 9.47311 27.8343 9.41471C27.0144 9.26322 25.7164 9.09373 24.0128 9.09373C22.2989 9.09373 20.9871 9.26529 20.1611 9.41734C19.8471 9.47513 19.5502 9.29611 19.4648 9.04103L18.9563 7.52344ZM21 25C21 27.7614 18.9853 30 16.5 30C14.0147 30 12 27.7614 12 25C12 22.2386 14.0147 20 16.5 20C18.9853 20 21 22.2386 21 25ZM31.5 30C29.0147 30 27 27.7614 27 25C27 22.2386 29.0147 20 31.5 20C33.9853 20 36 22.2386 36 25C36 27.7614 33.9853 30 31.5 30Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*<!-- Header --> */}
      <header className="sticky top-[-1px] z-20 w-full text-white bg-[#33445B] shadow-lg shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium"
            role="navigation"
          >
            {/*      <!-- Brand logo --> */}
            <Link
              to="/"
              id="basaLagbe"
              aria-label="basaLagbe logo"
              aria-current="page"
              className="flex items-center whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
            >
              <svg
                width="300"
                height="300"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
              >
                <path
                  d="M 248.083 54.037 C 244.553 55.707, 232.403 62.119, 221.083 68.287 L 200.500 79.500 167.257 79.800 L 134.013 80.100 133.421 82.457 C 132.382 86.598, 134.528 88.998, 139.285 89.015 C 141.603 89.024, 144.016 89.361, 144.646 89.765 C 146.089 90.690, 147.439 102.846, 146.597 107.334 C 146.011 110.458, 145.042 111.194, 133.233 117.477 C 126.230 121.203, 112.039 129.205, 101.698 135.259 L 82.895 146.267 83.198 149.883 L 83.500 153.500 96.786 153.779 C 109.978 154.057, 110.079 154.076, 111.036 156.594 C 111.566 157.989, 112.007 160.788, 112.015 162.815 C 112.023 164.842, 112.679 168.300, 113.471 170.500 C 114.649 173.768, 114.918 183.281, 114.942 222.500 C 114.959 248.900, 114.701 271.512, 114.370 272.750 C 113.794 274.899, 113.304 275, 103.442 275 C 97.764 275, 92.856 275.424, 92.536 275.942 C 92.216 276.460, 93.536 277.635, 95.471 278.553 C 101.519 281.423, 108 290.396, 108 295.900 C 108 296.980, 109.350 298.825, 111 300 L 114 302.136 114 358.620 L 114 415.104 111 416.150 L 108 417.196 108 429.598 L 108 442 255 442 L 402 442 402 430.023 C 402 418.048, 402 418.046, 399.250 416.296 C 397.738 415.334, 396.169 414.086, 395.765 413.523 C 395.361 412.960, 395.024 387.841, 395.015 357.702 L 395 302.905 397.400 300.680 C 398.720 299.457, 400.330 296.490, 400.977 294.087 C 402.321 289.095, 410.321 279.938, 415.050 277.979 C 420.323 275.795, 418.203 275, 407.107 275 C 398.096 275, 396.109 274.727, 395.607 273.418 C 395.273 272.548, 395 249.779, 395 222.819 C 395 182.875, 395.260 173.219, 396.405 170.651 C 397.178 168.918, 398.063 165.090, 398.371 162.144 C 398.679 159.198, 399.441 156.174, 400.064 155.423 C 400.887 154.431, 404.655 153.982, 413.848 153.779 L 426.500 153.500 426.801 150.415 C 426.976 148.623, 426.499 146.829, 425.663 146.135 C 423.268 144.148, 396.440 128.325, 381 119.794 C 373.025 115.387, 365.712 111.086, 364.750 110.236 C 363.361 109.009, 363 107.058, 363 100.779 C 363 91.024, 363.937 89, 368.453 89 C 373.973 89, 375 88.199, 375 83.893 L 375 80 342.697 80 L 310.394 80 295.447 71.413 C 273.513 58.812, 258.571 51, 256.406 51.001 C 255.358 51.001, 251.612 52.368, 248.083 54.037 M 235.500 82.320 C 213.971 94.603, 175.458 115.948, 150.183 129.603 L 131.866 139.500 193.510 139.758 C 227.415 139.899, 282.683 139.899, 316.327 139.758 L 377.500 139.500 367.500 134.100 C 348.727 123.963, 297.488 95.229, 267.756 78.166 C 261.847 74.775, 256.222 72.011, 255.256 72.025 C 254.290 72.039, 245.400 76.671, 235.500 82.320 M 235.667 87.667 C 234.821 88.512, 234.818 98.880, 235.656 116.362 L 236.312 130.040 256.406 129.770 L 276.500 129.500 276.770 108.250 L 277.040 87 256.687 87 C 245.492 87, 236.033 87.300, 235.667 87.667 M 156.607 91.582 C 155.405 94.715, 155.949 103.043, 157.392 103.597 C 158.713 104.104, 167.938 99.821, 180 93.101 L 185.500 90.036 171.357 90.018 C 159.372 90.003, 157.121 90.241, 156.607 91.582 M 333.500 94.555 C 343.982 100.585, 350.676 104, 352.012 104 C 352.707 104, 352.986 101.595, 352.796 97.250 L 352.500 90.500 339 90.227 L 325.500 89.953 333.500 94.555 M 246.607 97.582 C 246.273 98.452, 246 103.572, 246 108.959 C 246 119.545, 246.832 121.445, 251.195 120.827 C 253.440 120.508, 253.507 120.184, 253.781 108.250 L 254.062 96 250.638 96 C 248.438 96, 246.997 96.566, 246.607 97.582 M 260.432 97.318 C 260.154 98.042, 260.055 103.325, 260.213 109.056 C 260.469 118.335, 260.706 119.516, 262.380 119.837 C 263.414 120.035, 264.645 119.590, 265.115 118.848 C 266.291 116.993, 266.223 101.716, 265.025 98.565 C 263.991 95.846, 261.279 95.109, 260.432 97.318 M 141.323 154.810 C 136.417 155.509, 136.500 154.445, 136.500 216.403 L 136.500 274.500 254.500 274.737 C 319.544 274.868, 373.110 274.586, 373.860 274.110 C 374.975 273.402, 375.245 263.982, 375.360 221.873 C 375.503 169.361, 375.028 158.616, 372.448 156.025 C 371.171 154.744, 356.115 154.548, 257.240 154.525 C 194.683 154.511, 142.520 154.640, 141.323 154.810 M 154.076 166.858 C 153.438 168.050, 153.301 180.854, 153.694 202.608 C 154.031 221.249, 153.985 238.637, 153.592 241.250 C 152.926 245.677, 152.678 246, 149.939 246 C 146.698 246, 146.484 246.545, 148.096 250.685 C 148.699 252.233, 149.492 255.525, 149.858 258 L 150.524 262.500 192.625 262.761 L 234.725 263.021 235.363 258.371 C 235.713 255.813, 236 252.237, 236 250.424 C 236 247.435, 236.304 247.097, 239.250 246.813 L 242.500 246.500 242.762 209.803 L 243.025 173.105 237.762 172.803 L 232.500 172.500 232.190 168.750 L 231.879 165 193.475 165 C 157.074 165, 155.019 165.097, 154.076 166.858 M 278.678 165.655 C 278.305 166.028, 278 167.560, 278 169.060 C 278 172.110, 276.514 173, 271.418 173 L 268 173 268 210.072 L 268 247.143 270.250 246.961 C 274.683 246.602, 274.850 246.855, 275.560 255 L 276.258 263 317.437 263 L 358.617 263 360.175 256.750 C 361.032 253.313, 362.036 249.793, 362.406 248.928 C 362.869 247.843, 362.294 246.999, 360.550 246.205 L 358.023 245.053 357.761 205.277 L 357.500 165.500 318.428 165.239 C 296.939 165.095, 279.051 165.282, 278.678 165.655 M 169.500 177.700 C 165.915 178.540, 165 180.991, 165 189.757 C 165 201.233, 165.529 202, 173.453 202 C 183.332 202, 183 202.419, 183 189.928 C 183 180.217, 182.796 178.961, 181.066 178.035 C 179.124 176.996, 173.235 176.826, 169.500 177.700 M 191.750 178.080 C 190.263 178.946, 190 180.642, 190 189.350 C 190 195.989, 190.423 200.023, 191.200 200.800 C 192.683 202.283, 205.371 202.407, 208.066 200.965 C 209.785 200.045, 210 198.790, 210 189.665 C 210 183.014, 209.577 178.977, 208.800 178.200 C 207.328 176.728, 194.229 176.636, 191.750 178.080 M 304 177.729 C 301.417 178.712, 301.031 180.243, 301.015 189.559 C 300.994 201.908, 301.231 202.160, 312.518 201.792 L 321.500 201.500 321.785 190.645 C 321.972 183.498, 321.674 179.313, 320.912 178.395 C 319.741 176.983, 307.251 176.491, 304 177.729 M 334 177.690 C 332.625 177.966, 330.938 178.654, 330.250 179.218 C 328.562 180.604, 328.519 199.119, 330.200 200.800 C 331.626 202.226, 342.837 202.390, 345 201.017 C 346.188 200.264, 346.471 197.960, 346.363 189.945 C 346.287 184.379, 345.837 179.438, 345.363 178.964 C 344.237 177.840, 337.191 177.050, 334 177.690 M 223.035 186.934 C 221.610 189.597, 221.729 200.329, 223.200 201.800 C 224.918 203.518, 228.577 203.280, 230.534 201.323 C 232.678 199.179, 232.229 187.390, 229.948 185.947 C 227.517 184.409, 224.128 184.893, 223.035 186.934 M 280.077 186.408 C 279.353 187.280, 279.021 190.605, 279.204 195.158 L 279.500 202.500 283.252 202.810 C 286.567 203.085, 287.130 202.794, 288.093 200.310 C 289.348 197.072, 288.617 188.448, 286.912 186.394 C 285.418 184.594, 281.576 184.601, 280.077 186.408 M 166.238 210.162 C 164.400 212, 164.544 230.376, 166.408 231.923 C 167.280 232.647, 170.605 232.979, 175.158 232.796 L 182.500 232.500 182.500 221 L 182.500 209.500 174.988 209.212 C 170.003 209.021, 167.059 209.341, 166.238 210.162 M 191.750 210.080 C 190.271 210.941, 190 212.622, 190 220.927 C 190 228.141, 190.373 231.065, 191.403 231.920 C 192.293 232.658, 195.859 232.977, 201.153 232.792 L 209.500 232.500 209.788 222.014 C 210.034 213.020, 209.829 211.348, 208.346 210.264 C 206.277 208.751, 194.261 208.617, 191.750 210.080 M 303.022 209.945 C 301.345 211.029, 300.330 223.616, 301.442 229.544 L 302.104 233.071 311.802 232.786 L 321.500 232.500 321.500 221 L 321.500 209.500 313 209.245 C 308.325 209.105, 303.835 209.419, 303.022 209.945 M 331.022 209.965 C 329.344 211.027, 328.329 223.611, 329.443 229.549 L 330.106 233.082 337.803 232.791 L 345.500 232.500 345.786 222.146 C 345.973 215.370, 345.672 211.310, 344.914 210.396 C 343.582 208.791, 333.379 208.475, 331.022 209.965 M 223.082 212.401 C 222.338 213.298, 222.024 216.987, 222.210 222.651 C 222.486 231.082, 222.611 231.516, 224.852 231.833 C 226.145 232.016, 228.283 231.895, 229.602 231.564 C 231.884 230.991, 232 230.573, 232 222.915 C 232 218.490, 231.534 213.998, 230.965 212.934 C 229.737 210.641, 224.819 210.308, 223.082 212.401 M 280.356 211.765 C 279.727 212.169, 278.892 215.929, 278.501 220.119 C 277.587 229.904, 278.638 232.239, 283.758 231.806 C 286.968 231.535, 287.489 231.098, 288.297 228 C 289.492 223.421, 288.541 212.958, 286.832 211.875 C 285.192 210.835, 281.891 210.779, 280.356 211.765 M 155.702 247.631 C 155.355 247.979, 155.520 249.104, 156.070 250.131 C 157.017 251.901, 158.888 251.999, 191.285 251.985 C 210.103 251.976, 226.078 251.603, 226.784 251.155 C 227.492 250.706, 227.780 249.591, 227.427 248.670 C 226.845 247.154, 223.544 247, 191.560 247 C 172.185 247, 156.049 247.284, 155.702 247.631 M 282 248.893 C 282 249.934, 282.712 251.059, 283.582 251.393 C 284.452 251.727, 300.116 252, 318.391 252 C 344.686 252, 352.002 251.719, 353.462 250.652 C 357.973 247.353, 354.540 247, 317.941 247 C 283.344 247, 282 247.071, 282 248.893 M 137.027 300.949 C 136.328 302.255, 136.069 321.993, 136.242 360.699 L 136.500 418.500 179.750 418.761 L 223 419.021 223.033 416.261 C 223.052 414.742, 223.037 389.798, 223.001 360.829 C 222.964 331.381, 223.324 307.917, 223.818 307.613 C 224.303 307.312, 237.431 307.015, 252.991 306.952 C 275.550 306.861, 281.453 307.107, 282.126 308.169 C 282.590 308.901, 282.976 334.137, 282.985 364.250 C 282.999 415.662, 283.107 419.009, 284.750 419.152 C 285.712 419.236, 306.075 419.195, 330 419.062 C 368.511 418.847, 373.643 418.636, 374.750 417.219 C 375.716 415.981, 376 402.880, 376 359.531 C 376 310.387, 375.807 303.170, 374.443 301.223 L 372.887 299 255.478 299 C 140.108 299, 138.052 299.034, 137.027 300.949 M 154.735 308.249 C 154.462 308.960, 154.477 329.445, 154.767 353.771 L 155.295 398 174.158 398 L 193.020 398 192.760 352.750 L 192.500 307.500 173.865 307.228 C 159.357 307.017, 155.121 307.243, 154.735 308.249 M 291.667 307.667 C 291.300 308.033, 291 328.514, 291 353.180 L 291 398.027 324.250 397.763 L 357.500 397.500 357.778 354.500 C 357.931 330.850, 357.809 310.488, 357.509 309.250 L 356.962 307 324.648 307 C 306.875 307, 292.033 307.300, 291.667 307.667 M 236.856 318.669 C 234.537 319.285, 234.207 323.423, 234.027 354.194 C 233.922 371.988, 234.237 381.574, 234.970 382.944 C 236.007 384.882, 236.955 385, 251.453 385 C 259.914 385, 267.548 384.727, 268.418 384.393 C 270.311 383.667, 270.576 377.976, 268.800 376.200 C 268.140 375.540, 265.882 375, 263.782 375 L 259.963 375 260.232 351.763 C 260.484 329.930, 260.614 328.504, 262.380 328.165 C 263.414 327.966, 264.645 328.410, 265.115 329.152 C 265.585 329.893, 265.976 339.163, 265.985 349.750 L 266 369 268.500 369 L 271 369 271 345.500 C 271 315.748, 272.471 317.955, 252.750 318.116 C 244.912 318.180, 237.760 318.429, 236.856 318.669 M 167.861 320.911 C 165.605 322.737, 165.500 323.383, 165.500 335.489 C 165.500 346.872, 165.697 348.299, 167.441 349.578 C 170.018 351.466, 176.999 351.390, 179.777 349.443 C 181.879 347.972, 182 347.183, 182 335 C 182 322.817, 181.879 322.028, 179.777 320.557 C 176.709 318.408, 170.734 318.585, 167.861 320.911 M 304.655 320.829 C 303.307 322.318, 303 324.902, 303 334.757 C 303 349.368, 303.375 350, 312.036 350 C 316.839 350, 318.121 349.642, 318.965 348.066 C 319.534 347.002, 320 340.734, 320 334.137 C 320 319.842, 319.532 319, 311.584 319 C 307.745 319, 305.860 319.497, 304.655 320.829 M 330.223 320.557 C 328.122 322.028, 328 322.819, 328 334.934 C 328 349.993, 328.304 350.530, 336.777 350.445 C 344.714 350.365, 345.199 349.381, 344.813 334.167 C 344.538 323.324, 344.266 321.663, 342.559 320.417 C 339.979 318.534, 332.998 318.613, 330.223 320.557 M 167.502 357.375 C 165.857 358.578, 165.613 360.189, 165.560 370.216 C 165.487 384.073, 165.983 385, 173.467 385 C 181.223 385, 182 383.716, 182 370.894 C 182 357.795, 181.052 356, 174.134 356 C 171.521 356, 168.536 356.619, 167.502 357.375 M 307 356.694 C 303.677 357.882, 303 360.324, 303 371.120 C 303 383.925, 303.630 385, 311.137 385 C 319.814 385, 320 384.708, 320 371.036 C 320 357.233, 319.373 355.952, 312.679 356.079 C 310.380 356.122, 307.825 356.399, 307 356.694 M 329.571 357.571 C 328.322 358.821, 328 361.542, 328 370.871 C 328 378.660, 328.403 383.003, 329.200 383.800 C 329.860 384.460, 332.920 385, 336 385 C 339.080 385, 342.140 384.460, 342.800 383.800 C 343.603 382.997, 344 378.541, 344 370.335 C 344 359.233, 343.817 357.972, 342.066 357.035 C 339.076 355.435, 331.377 355.766, 329.571 357.571 M 223.741 428.402 C 222.866 429.277, 222.410 430.853, 222.706 431.982 C 223.220 433.949, 223.988 434, 252.917 434 C 281.884 434, 285 433.696, 285 430.871 C 285 427.841, 281.982 427.482, 253.823 427.163 C 229.010 426.882, 225.100 427.043, 223.741 428.402 M 212.930 448.584 C 211.977 449.733, 211.904 450.625, 212.667 451.834 C 213.628 453.358, 219.558 453.522, 282.338 453.757 L 350.958 454.014 351.573 451.564 C 351.912 450.216, 351.894 448.638, 351.535 448.057 C 351.087 447.331, 329.480 447, 282.563 447 C 221.449 447, 214.106 447.167, 212.930 448.584"
                  stroke="none"
                  fill="white"
                  fillRule="evenodd"
                />
              </svg>
              Basa Lagbe
            </Link>

            {/*    Hamburger Mobile trigger */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                    : ""
                }
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-100 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-100 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-100 transition-all duration-300"
                ></span>
              </div>
            </button>

            {/* nav links */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute top-0 left-0 z-[-1] h-auto w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-[rgb(64,86,115)] px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              {navLinks?.map((nav, index) => (
                <li
                  key={index}
                  role="none"
                  className="flex items-stretch box-border"
                >
                  <Link
                    onClick={onActionClicks}
                    to={nav.path}
                    role="menuitem"
                    aria-haspopup="false"
                    className={`flex items-center gap-2 py-4 transition-colors duration-300 hover:text-slate-400 hover:border-b-2 hover:border-b-red-500 focus:text-slate-400 focus:outline-none focus-visible:outline-none lg:px-8 ${
                      currentPath === nav.path &&
                      "text-slate-400 border-b-2 border-b-orange-600"
                    }`}
                    style={
                      currentPath === nav?.path ? { pointerEvents: "none" } : {}
                    }
                  >
                    <span>{nav?.label}</span>
                  </Link>
                </li>
              ))}

              {/* nav links for mobile view */}
              {user?._id ? (
                <>
                  {/* mobile post new ads */}
                  <li role="none" className="flex items-stretch">
                    <Link
                      onClick={onActionClicks}
                      to="/postAds"
                      role="menuitem"
                      aria-haspopup="false"
                      className={`flex items-center gap-2 py-4 transition-colors duration-300 hover:text-slate-400 focus:text-slate-300 focus:outline-none focus-visible:outline-none lg:px-8 lg:hidden ${
                        currentPath === "/postAds" &&
                        "text-slate-400 border-b-2 border-b-orange-600"
                      }`}
                      style={
                        currentPath === "/postAds"
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    >
                      <span>Post New Ads</span>
                    </Link>
                  </li>

                  {/* mobile user name profile link */}
                  <li role="none" className="flex items-stretch">
                    <Link
                      onClick={onActionClicks}
                      to="/profile"
                      role="menuitem"
                      aria-haspopup="false"
                      className={`flex items-center gap-2 py-4 transition-colors duration-300 hover:text-slate-400 focus:text-slate-300 focus:outline-none focus-visible:outline-none lg:px-8 lg:hidden ${
                        currentPath === "/profile" &&
                        "text-slate-400 border-b-2 border-b-orange-600"
                      }`}
                      style={
                        currentPath === "/profile"
                          ? { pointerEvents: "none" }
                          : {}
                      }
                    >
                      <span>{user?.username}</span>
                    </Link>
                  </li>

                  {/* mobile logout */}
                  <li role="none" className="flex items-stretch">
                    <button
                      onClick={() => {
                        dispatch(logOut());
                        if (isToggleOpen) {
                          setIsToggleOpen(false);
                        } else isToggleOpen;
                      }}
                      to="/postAds"
                      role="menuitem"
                      aria-haspopup="false"
                      className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-slate-400 focus:text-slate-300 focus:outline-none focus-visible:outline-none lg:px-8 lg:hidden"
                    >
                      <span>Log Out</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* mobile login */}
                  <li role="none" className="flex items-stretch">
                    <Link
                      onClick={onActionClicks}
                      to="/login"
                      role="menuitem"
                      aria-haspopup="false"
                      className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-slate-400 focus:text-slate-300 focus:outline-none focus-visible:outline-none lg:px-8 lg:hidden"
                    >
                      <span>Log In</span>
                    </Link>
                  </li>

                  {/* mobile signup */}
                  <li role="none" className="flex items-stretch">
                    <Link
                      onClick={onActionClicks}
                      to="/signup"
                      role="menuitem"
                      aria-haspopup="false"
                      className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-slate-400 focus:text-slate-300 focus:outline-none focus-visible:outline-none lg:px-8 lg:hidden"
                    >
                      <span>Sign Up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* navbar right sides action links */}
            <div className="ml-auto flex items-center justify-end px-6 lg:ml-0 lg:flex-1 lg:p-0">
              {user?._id && (
                <>
                  {/* post new ads button */}
                  <Link
                    to="/postAds"
                    role="menuitem"
                    aria-haspopup="false"
                    className={`lg:flex items-center gap-2 py-4 transition-colors duration-300 hover:text-slate-400 focus:text-slate-300 focus:outline-none focus-visible:outline-none lg:px-2 hidden ${
                      currentPath === "/postAds" && "text-slate-300"
                    }`}
                    style={
                      currentPath === "/postAds"
                        ? { pointerEvents: "none" }
                        : {}
                    }
                  >
                    <span>Post New Ads</span>
                  </Link>

                  {/* bookmark icon */}
                  <Link to="/bookmarks">
                    <div
                      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-white hover:text-slate-300 focus:outline-none focus-visible:outline-none ${
                        currentPath === "/bookmarks" && "text-slate-300"
                      }`}
                    >
                      <IoBookmarksOutline size={"1.5rem"} />
                      <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-red-500 px-1.5 text-sm text-white">
                        {totalBookmarks || 0}
                      </span>
                    </div>
                  </Link>

                  {/* user icon */}
                  <button
                    ref={dropDownRef}
                    role="menuitem"
                    aria-haspopup="false"
                    className="lg:flex relative items-center gap-2 py-4 transition-colors duration-300 lg:pl-4 hidden"
                  >
                    <span>
                      <FaRegUserCircle size={"1.5rem"} />
                    </span>
                    <span onClick={onClickDropDown}>
                      {showDropDown ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showDropDown}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.1 }}
                        exit={{
                          scale: 0,
                          transition: {
                            ease: easeInOut,
                            duration: 0.1,
                          },
                        }}
                        className={`absolute text-black top-full right-3 bg-[rgb(240,248,255)] ${
                          showDropDown ? "flex" : "hidden"
                        } flex-col end-0 w-40 shadow-md shadow-gray-300 rounded items-center overflow-hidden`}
                      >
                        <Link
                          to={"/profile"}
                          onClick={() => setShowDropDOwn(false)}
                          className="py-3 w-full border-b-2 hover:text-white hover:bg-[rgb(60,80,107)]"
                        >
                          Profile
                        </Link>
                        <div
                          onClick={() => {
                            dispatch(logOut());
                            setShowDropDOwn(false);
                          }}
                          className="py-3 w-full hover:text-white hover:bg-[rgb(60,80,107)]"
                        >
                          Log Out
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </>
              )}

              {!user?._id && (
                <>
                  {/* log in */}
                  <Link
                    to="/login"
                    role="menuitem"
                    aria-haspopup="false"
                    className="lg:flex items-center gap-2 py-4 transition-colors duration-300 hover:text-slate-400 focus:text-slate-300 focus:outline-none focus-visible:outline-none lg:px-2 hidden"
                  >
                    <span>Log In</span>
                  </Link>

                  {/* sign up */}
                  <Link
                    to="/signup"
                    role="menuitem"
                    aria-haspopup="false"
                    className="lg:flex items-center gap-2 py-4 transition-colors duration-300 hover:text-slate-400 focus:text-slate-300 focus:outline-none focus-visible:outline-none lg:px-2 hidden"
                  >
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with Topbar--> */}
    </>
  );
}
