import React, { useState } from "react";

const MoneyInput = ({ value, onChange }) => {
  const handleAmountChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/[^0-9]/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    onChange(formattedValue);
  };

  return (
    <>
      <input
        className="w-1/2 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[18px] text-bold text-primaryColor leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
        type="text"
        value={value}
        onChange={handleAmountChange}
        placeholder="Nhập số tiền (VND)"
      />
    </>
  );
};

export default MoneyInput;
