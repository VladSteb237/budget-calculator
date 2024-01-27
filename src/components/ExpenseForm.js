import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = (props) => {
  const { charge, amount, handleCharge, handleAmount, handleSubmit, edit } =
    props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">Charge</label>
          <input
            type="text"
            className="form-control"
            name="charge"
            id="charge"
            placeholder="e.g. rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="charge">Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            id="amount"
            placeholder="e.g. $100"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      {edit ? (
        <button type="submit" className="btn-one">
          Editing
          <MdSend className="btn-icon" />
        </button>
      ) : (
        <button type="submit" className="btn">
          Submit
          <MdSend className="btn-icon" />
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;
