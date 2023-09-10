import * as Inventory from "./Inventory.json";
const PropertyTypeRoomMap = {
  "one-bedroom": "6B",
  "studio-max": "4A",
  studio: "3B",
  "two-bedroom": "LA"
};
export const InventoryTableV2 = ({ data }) => {
  console.log("data:", data);
  const Headers = ["Bedroom", "Living", "Bathroom", "Kitchen", "Utility Closet"];
  return Headers.map(headerItem => {
    console.log("headerItem:", headerItem);
    return (
      <div className="mt-10 px-4 md:px-0">
        {headerItem.toUpperCase()}
        {Inventory.map(item => {
          console.log("data", data);
          if (item.Room == headerItem && item.Units.includes(PropertyTypeRoomMap[data]))
            return (
              <p>
                {item.Quantity > 1 ? `${item.Quantity} x ` : null}
                {item["Product Name"]}
              </p>
            );
        })}
      </div>
    );
  });
};
