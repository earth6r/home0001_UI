import * as Inventory from "./Inventory.json";

export const InventoryTableV2 = ({ data }) => {
  console.log("data:", data);
  const Headers = ["Bedroom", "Living", "Bathroom", "Kitchen", "Utility Closet"];
  return Headers.map(headerItem => {
    console.log("headerItem:", headerItem);
    return (
      <div className="mt-10 px-4 md:px-0">
        {headerItem.toUpperCase()}
        {Inventory.map(item => {
          if (item.Room == headerItem)
            return (
              <p>
                {item.Quantity > 1 ? `x${item.Quantity} ` : null}
                {item["Product Name"]}
              </p>
            );
        })}
      </div>
    );
  });
};
