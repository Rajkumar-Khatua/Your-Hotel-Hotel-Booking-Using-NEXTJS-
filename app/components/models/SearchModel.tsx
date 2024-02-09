"use client";

import useSearchModel from "@/app/hooks/useSearchModel";
import Model from "./Model";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { CountriesSelectValue } from "../inputes/CountrySelect";
import { formatISO } from "date-fns";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModel = () => {
  const searchModel = useSearchModel();
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountriesSelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathRoomCount, setBathRoomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  // On Back On Next On Submit functions
  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  // On Submit
  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      location: location?.value,
      guestCount,
      roomCount,
      bathRoomCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModel.onClose();

    router.push(url);
  }, [
    step,
    searchModel,
    location,
    guestCount,
    roomCount,
    bathRoomCount,
    dateRange,
    onNext,
    params,
    router,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryAction = useMemo(() => {
    if (step === STEPS.INFO) {
      return undefined;
    }
    return "Back";
  }, [step]);

//   Body Content-
let bodyContent = (
    
)
  return (
    <Model
      isOpen={searchModel.isOpen}
      onClose={searchModel.onClose}
      onSubmit={searchModel.onOpen}
      title="Search for a location "
      actionLabel="Search "
    />
  );
};

export default SearchModel;
