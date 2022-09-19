const stockData = require("./stock.json");
const transactionData = require("./transactions.json");

async function getCurrentStock(name: string) {
  if (
    !transactionData.find(
      (item: { sku: string; type: string; qty: number }) => item.sku === name
    )
  ) {
    throw new Error(`No sku found`);
  }

  let stockItem: { sku: string; stock: number } = stockData.find(
    (item: { sku: string; stock: number }) => item.sku === name
  );

  if (!stockItem) {
    stockItem = {
      sku: name,
      stock: 0,
    };
  }

  const transactions: any = transactionData.filter(
    (item: { sku: string; type: string; qty: number }) => item.sku === name
  );

  transactions.forEach(
    (transaction: { sku: string; type: string; qty: number }) => {
      if (transaction.type === "refund") {
        stockItem.stock += transaction.qty;
      } else if (transaction.type === "order") {
        stockItem.stock -= transaction.qty;
      }
    }
  );

  if (stockItem.stock < 0) {
    throw new Error("Data includes logical errors");
  }

  return stockItem;
}

const result = async () => {
  try {
    const stock = await getCurrentStock("LTV719449/39/39");

    return stock;
  } catch (error) {
    console.log(error);
  }
};

result();
