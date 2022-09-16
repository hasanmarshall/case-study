const sku = require("./stock.json");
const type = require("./transactions.json");

const nilo = (stock, transactions) => {
  for (let i = 0; i < stock.length; i++) {
    for (let j = 0; j < transactions.length; j++) {
      if (
        stock[i].sku === transactions[j].sku &&
        transactions[j].type === "refund"
      ) {
        stock[i].stock = stock[i].stock + transactions[j].qty;
      } else if (
        stock[i].sku === transactions[j].sku &&
        transactions[j].type === "order"
      ) {
        stock[i].stock = stock[i].stock - transactions[j].qty;
      }
    }
  }
  return stock;
};
console.log("AAAAA", nilo(sku, type));
