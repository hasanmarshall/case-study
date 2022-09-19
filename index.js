const stockData = require("./stock.json");
const transactionData = require("./transactions.json");

const getCurrentStock = async (name) => {
  if (!transactionData.find((item) => item.sku === name)) {
    throw new Error(`No sku found`);
  }

  let stockItem = stockData.find((item) => item.sku === name);

  if (!stockItem) {
    stockItem = {
      sku: name,
      stock: 0,
    };
  }

  const transactions = transactionData.filter((item) => item.sku === name);

  transactions.forEach((transaction) => {
    if (transaction.type === "refund") {
      stockItem.stock += transaction.qty;
    } else if (transaction.type === "order") {
      stockItem.stock -= transaction.qty;
    }
  });

  if (stockItem.stock < 0) {
    throw new Error("Data includes logical errors");
  }

  return stockItem;
};

const result = async () => {
  try {
    const stock = await getCurrentStock("LTV719449/39/39");
    return stock;
  } catch (error) {
    console.log(error);
  }
};

result();
