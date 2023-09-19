import Inventory from "./Inventory.json";
const PropertyTypeRoomMap = {
  "one-bedroom": "6B",
  "studio-max": "4A",
  studio: "3B",
  "two-bedrooms": "LA"
};
export const InventoryTableV2 = ({ data }) => {
  console.log("data:", data);
  const NYCHeaders = ["Bedroom", "Living", "Bathroom", "Kitchen", "Utility Closet"];
  const LAHeaders = [
    "Bedroom",
    "Living",
    "Bathroom",
    "Kitchen",
    "Utility Closet",
    "Rooftop",
    "Variation A: Gym"
  ];
  let Headers = data == "two-bedrooms" || data == "penthouse" ? LAHeaders : NYCHeaders;
  return Headers.map(headerItem => {
    return (
      <div className="mt-10 px-4 md:px-0">
        <p className="mb-4">{headerItem.toUpperCase()}</p>
        {Inventory.map(item => {
          if (
            item.Room == headerItem &&
            item.Units.includes(PropertyTypeRoomMap[data]) &&
            item.Status == "Available"
          )
            return (
              <p className="mb-2">
                {item.Quantity > 1 ? `${item.Quantity} x ` : null}
                {item["Product Name"]}
              </p>
            );
        })}
      </div>
    );
  });
};
