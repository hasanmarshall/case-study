const sku = require("./stock.json");
const type = require("./transactions.json");

const nilo = (stock, transactions) => {
  let newStock = [];
  for (let i = 0; i < stock.length; i++) {
    for (let j = 0; j < transactions.length; j++) {
      if (
        stock[i].sku === transactions[j].sku &&
        transactions[j].type === "refund"
      ) {
        stock[i].stock = stock[i].stock + transactions[j].qty;

        newStock.push(stock[i]);
      } else if (
        stock[i].sku === transactions[j].sku &&
        transactions[j].type === "order"
      ) {
        stock[i].stock = stock[i].stock - transactions[j].qty;

        newStock.push(stock[i]);
      }
    }
  }
  return newStock;
};
console.log("AAAAA", nilo(sku, type));

/*
import sku from "./stock.json" assert { type: "JSON" };
import stock from "./stock.json" assert { type: "JSON" };
import type from "./transactions.json" assert { type: "JSON" };
import qty from "./transactions.json" assert { type: "JSON" };

console.log(sku);  */
