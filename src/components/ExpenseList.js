import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = (props) => {
  const {
    expenses,
    handleDeleteSingleItem,
    handleEditSingleItem,
    clearAllItems,
  } = props;
  return (
    <React.Fragment>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDeleteSingleItem={handleDeleteSingleItem}
              handleEditSingleItem={handleEditSingleItem}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearAllItems}>
          clear expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </React.Fragment>
  );
};

export default ExpenseList;
