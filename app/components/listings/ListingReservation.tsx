"use client";
import { Range } from "react-date-range";
import Calendar from "../inputes/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="
            bg-white
            shadow
            rounded-xl
            border-[1px]
            border-neutral-200
            overflow-hidden

        "
    >
      <div
        className="
                    flex
                    flex-row
                    items-center
                    gap-1
                    p-4
                "
      >
        <div
          className="
            text-2xl
            font-semibold

        "
        >
          ${price}
        </div>
        <div
          className="
            font-light
            text-neutral-500
        "
        >
          per night
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button onClick={onSubmit} disabled={disabled} label="Reserve" />
      </div>
      <div
        className="
            p-4
            flex
            flex-row
            items-center
            justify-between
            font-semibold
            text-lg"
      >
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
