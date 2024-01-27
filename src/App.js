import "./App.css";
import React, { useEffect, useState } from "react";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { v4 as uuid } from "uuid";

// const initialState = [
//   { id: uuid(), charge: "rent", amount: 150 },
//   { id: uuid(), charge: "rent car", amount: 250 },
//   { id: uuid(), charge: "rent credit card", amount: 350 },
// ];

// set all and get all from localStorage
const initialState = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  //***************** state values ***********************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialState);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert functionality
  const [alert, setAlert] = useState({ show: false });
  // edit functionality
  const [edit, setEdit] = useState(false);
  // edit id functionality
  const [id, setId] = useState(0);
  //***************** functionality ***********************

  //***************** use effect ***********************
  useEffect(() => {
    //console.log("expenses loaded to localStorage with useEffect ");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: true });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id
            ? { ...item, charge: charge, amount: amount }
            : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item Edited Successful!" });
      } else {
        const singleExpense = { id: uuid(), charge: charge, amount: amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item added Successful!" });
      }
      setCharge("");
      setAmount("");
    } else {
      // call handleAlert
      handleAlert({
        type: "danger",
        text: "charge can't be empty value and amount has to be greater than zero",
      });
    }
  };

  // clear all items
  const clearAllItems = () => {
    setExpenses([]);
    handleAlert({
      type: "danger",
      text: "All Item deleted Successful!",
    });
  };

  // handle delete single item
  const handleDeleteSingleItem = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({
      type: "danger",
      text: "Item deleted Successful!",
    });
  };

  // handle edit single item
  const handleEditSingleItem = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { amount, charge } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <React.Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDeleteSingleItem={handleDeleteSingleItem}
          handleEditSingleItem={handleEditSingleItem}
          clearAllItems={clearAllItems}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc = acc + parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </React.Fragment>
  );
}

export default App;
