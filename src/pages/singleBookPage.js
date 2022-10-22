/* eslint-disable array-callback-return */
import React from "react";
import { Helmet } from "react-helmet";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import Button from "../components/shared/Button";
import { db } from "../firebase";
import Progressbar from "../components/shared/Progressbar";
import { triggerProgress } from "../utils/triggerProgress";
import { REACT_APP_BOOK, REACT_APP_CANCELED } from "../constant";

const logo = require("../assets/logo.png");

const SingleBookPage = () => {
  const [singleBookingData, setSingleBookingData] = React.useState([]);
  const [location, setLocation] = React.useState(null);
  const [alert, setAlert] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [timeleft, setTimeleft] = React.useState(0);
  React.useEffect(() => {
    const orderNo = window?.location?.pathname.split("/")[2];

    db.collection("all-bookings").onSnapshot((snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));
      const filterSingleBooking = results?.filter(
        (booking) => booking?.data.orderNo === orderNo
      );

      setSingleBookingData(filterSingleBooking);
    });

    db.collection("location").onSnapshot((snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        data: doc.data(),
      }));
      setLocation(results[0].data.location);
    });
  }, []);

  React.useEffect(() => {
    if (deleting) {
      triggerProgress(setTimeleft);
    }
  }, [deleting]);

  const handleCancel = (id) => {
    setDeleting(true);
    setTimeout(() => {
      db.collection("all-bookings")
        .doc(id)
        .set({
          date: singleBookingData[0].data?.date,
          customer: singleBookingData[0].data?.customer,
          email: singleBookingData[0].data?.email,
          category: singleBookingData[0].data?.category,
          service: singleBookingData[0].data?.service,
          addOnServices: singleBookingData[0].data?.addOnServices,
          orderNo: singleBookingData[0].data?.orderNo,
          quantity: singleBookingData[0].data?.quantity,
          transactionDate: singleBookingData[0].data?.transactionDate,
          payMethod: singleBookingData[0].data?.payMethod,
          product: singleBookingData[0].data?.product,
          sender: singleBookingData[0].data?.sender,
          total: singleBookingData[0].data?.total,
          hour: singleBookingData[0].data?.hour,
          status: "canceled",
        })
        .then(() => {
          setAlert(true);
          setDeleting(false);
          setTimeleft(0);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      db.collection("blacklist")
        .add({
          email: singleBookingData[0].data?.email,
          date: Date.now(),
        })
        .then(() => {})
        .catch((error) =>
          console.log("Email could not be added to blacklist!")
        );
    }, 10000);
  };

  if (alert) {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  return (
    <div className="relative tw-bg-neutral-900 tw-h-[100vh]">
      <Helmet>
        <title>my-calendar</title>
      </Helmet>
      <div className="md:tw-h-[100%] tw-bg-gradient-to-r tw-from-neutral-100 tw-to-pink-200 md:tw-w-[50%] lg:tw-w-[35%] 2xl:tw-w-[25%] tw-mx-auto tw-pt-[40px] tw-flex tw-flex-col">
        <div className="">
          <div className="tw-relative">
            <div className="tw-px-5 tw-border-b-[1px] tw-border-pink-700">
              <span className="font_cursive tw-text-5xl">Hairposey</span>
            </div>
            <div className="tw-absolute -tw-top-6 tw-right-0 tw-bg-green-600 tw-px-8 tw-capitalize tw-py-2 tw-rounded-l-full tw-text-white">
              {singleBookingData?.length ? (
                <p>{singleBookingData[0]?.data?.status}</p>
              ) : (
                <p>Empty</p>
              )}
            </div>
          </div>
          {singleBookingData?.length ? (
            <div className="tw-px-8">
              <div className="tw-mt-5 tw-w-full tw-flex tw-justify-start">
                <span className="tw-bg-pink-100 tw-text-neutral-600 tw-rounded-full tw-px-5 tw-py-2 tw-text-sm">
                  Order No: {singleBookingData[0]?.data?.orderNo}
                </span>
              </div>
              <div className="tw-mt-1 tw-w-full tw-flex tw-justify-end">
                <span className="tw-bg-pink-100 tw-text-neutral-600 tw-rounded-full tw-px-5 tw-py-2 tw-text-sm">
                  Appointment Date: {singleBookingData[0]?.data?.date}
                </span>
              </div>
              <div className="tw-mt-1 tw-w-full tw-flex tw-justify-start">
                <span className="tw-bg-pink-100 tw-text-neutral-600 tw-rounded-full tw-px-5 tw-py-2 tw-text-sm">
                  Duration: {singleBookingData[0]?.data?.hour} Hours
                </span>
              </div>
              <div className="tw-mt-1 tw-w-full tw-flex tw-justify-end">
                <span className="tw-bg-pink-100 tw-text-neutral-600 tw-rounded-full tw-px-5 tw-py-2 tw-text-sm">
                  Duration: {singleBookingData[0]?.data?.hour} Hours
                </span>
              </div>
              <div className="tw-mt-1 tw-w-full tw-flex tw-justify-start">
                <span className="tw-bg-pink-100 tw-text-neutral-600 tw-rounded-full tw-px-5 tw-py-2 tw-text-sm">
                  Category: {singleBookingData[0]?.data?.category}
                </span>
              </div>
              <div className="tw-mt-1 tw-w-full tw-flex tw-justify-end">
                <span className="tw-bg-pink-100 tw-text-neutral-600 tw-rounded-full tw-px-5 tw-py-2 tw-text-sm">
                  Service: {singleBookingData[0]?.data?.service}
                </span>
              </div>
              <div className="tw-mt-1 tw-w-full tw-flex tw-justify-start">
                <span className="tw-bg-pink-100 tw-text-neutral-600 tw-rounded-full tw-px-5 tw-py-2 tw-text-sm">
                  Add-on Services: {singleBookingData[0]?.data?.addOnServices}
                </span>
              </div>
              <div className="tw-mt-1 tw-w-full tw-flex tw-justify-end">
                <span className="tw-bg-pink-100 tw-text-neutral-600 tw-rounded-full tw-px-5 tw-py-2 tw-text-sm">
                  Transaction Date:{" "}
                  {singleBookingData[0]?.data?.transactionDate}
                </span>
              </div>
            </div>
          ) : (
            <div className=" tw-mt-5">
              <span className="tw-ml-10 tw-text-red-800">
                No data to deplay...
              </span>
            </div>
          )}
          <div className="tw-mt-5">
            <a
              href={`${process.env.REACT_APP_GOOGLESEARCH + location}`}
              target="_blank"
              rel="noreferrer"
              className="tw-bg-neutral-300 tw-text-black tw-px-5 tw-text-xs tw-font-light tw-flex tw-items-center tw-justify-center hover:tw-text-neutral-600 tw-ease tw-duration-300 tw-border-y-[1px] tw-border-neutral-50"
            >
              <MdLocationPin
                size={25}
                className="tw-text-pink-500 tw-mr-2 tw-my-1"
              />
              <span className="navStyleChildWhite">We are @ {location}</span>
            </a>
          </div>
        </div>
        <div className="tw-flex-[1]  tw-flex tw-flex-col tw-items-center tw-justify-center">
          <div className="-tw-mt-10 tw-rounded-full">
            <img src={logo} alt="" width="300" />
          </div>
          <div className="font_cursive tw-text-2xl">
            <p className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-slate-900 tw-to-pink-900">
              A whole new you with Hairposey...
            </p>
          </div>
          <div className="tw-flex tw-items-center tw-mt-10 tw-mb-5">
            <Link to={`${REACT_APP_BOOK}`} className="tw-mx-2">
              <Button
                children="New Booking ?"
                isTrans={true}
                isBlackTxt={true}
                isSmallTxt={true}
                isCancel={
                  singleBookingData[0]?.data?.status === REACT_APP_CANCELED &&
                  true
                }
              />
            </Link>
            <div
              onClick={() =>
                singleBookingData[0]?.data?.status !== REACT_APP_CANCELED &&
                handleCancel(singleBookingData[0]?.id)
              }
              className="tw-mx-2"
            >
              <Button
                children="Cancel ?"
                isTrans={true}
                isBlackTxt={true}
                isSmallTxt={true}
                isCancel={
                  (singleBookingData.length === 0 ||
                    singleBookingData[0]?.data?.status ===
                      REACT_APP_CANCELED) &&
                  true
                }
              />
            </div>
          </div>
          <div
            className={`${
              deleting ? "tw-opacity-1" : "tw-opacity-0"
            } tw-w-[80%]`}
          >
            <Progressbar value={timeleft} max={100} />
          </div>
          <div
            className={`${
              alert ? "tw-opacity-1" : "tw-opacity-0"
            } tw-text-xs tw-text-green-700 tw-ease-in tw-duration-300 tw-mb-5`}
          >
            <span>You have successfully canceled your booking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookPage;
