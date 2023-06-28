import React from "react";

const InvoiceItem = ({ item, index, onChange, onRemove }) => {
  return (
    <tr key={index}>
      <td className="border border-gray-400 px-4 py-2">
        <input
          name="itemName"
          type="text"
          value={item.itemName}
          onChange={(e) => onChange(index, e)}
          className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter item description"
        />
      </td>
      <td className="border border-gray-400 px-4 py-2">
        <input
          name="quantity"
          type="number"
          value={item.quantity}
          onChange={(e) => onChange(index, e)}
          className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter quantity"
        />
      </td>
      <td className="border border-gray-400 px-4 py-2">
        <input
          name="unitPrice"
          type="number"
          value={item.unitPrice}
          onChange={(e) => onChange(index, e)}
          className="w-full px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter price"
        />
      </td>
      <td className="border border-gray-400 px-4 py-2">{item.quantity * item.unitPrice}</td>
      <td className="border border-gray-400 px-4 py-2">
        <button onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 focus:outline-none">
          Remove
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;