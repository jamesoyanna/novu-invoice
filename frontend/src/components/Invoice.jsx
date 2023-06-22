import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from '../api';
import InvoiceHeader from "./InvoiceHeader";
import FormField from "./FormField";

const Invoice = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState({
      name: "",
      email: "",
      issuedDate: "",
    });

    const [invoiceData, setInvoiceData] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        issuedDate: "",
        dueDate: "",
        items: [{ itemName: "", quantity: "", unitPrice: "" }],
        notes: "",
        total: "",
        invoiceNumber:"",
        totalQuantity: 0, 
        totalAmount: 0,
      });

      const navigateTo = (route, state) => {
        navigate(route, { state });
      };

      const handleCreateInvoice = async () => {
        try {
          setIsLoading(true); // Set loading state to true
    
          // Validation
          const requiredFields = ["name", "email"];
          const missingFields = requiredFields.filter((field) => !invoiceData[field]);
    
          if (missingFields.length > 0) {
            // Display error messages for missing fields
            const errorMessages = missingFields.map((field) => `${field} is required`);
            setErrors((prevErrors) => ({
              ...prevErrors,
              ...Object.fromEntries(missingFields.map((field) => [field, `${field} is required`])),
            }));
            console.error("Missing fields:", errorMessages);
            return;
          }
          
          // Make the POST request to create an invoice
          const response = await api.post("/api/invoices", invoiceData);
    
          // Handle the response or perform any necessary actions
          const createdInvoiceData = response.data;
    
          // Redirect to the InvoiceDetails page with the invoice data and invoice number
          navigateTo("/invoice-details", { invoiceData: createdInvoiceData });
        } catch (error) {
          // Handle any errors
          console.error("Error creating invoice:", error);
        } finally {
          setIsLoading(false); // Reset loading state
        }
      };

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInvoiceData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleItemChange = (index, event) => {
        const { name, value } = event.target;
        const newItems = [...invoiceData.items];
        newItems[index][name] = value;
        setInvoiceData((prevData) => ({ ...prevData, items: newItems }));
        updateTotals(newItems);
      };
    
      const handleAddItem = () => {
        setInvoiceData((prevData) => ({
          ...prevData,
          items: [...prevData.items, { itemName: "", quantity: "", unitPrice: "" }],
        }));
      };  
    
      const handleRemoveItem = (index) => {
        const newItems = [...invoiceData.items];
        newItems.splice(index, 1);
      
        setInvoiceData((prevData) => ({
          ...prevData,
          items: newItems,
        }));
      };
    
      const updateTotals = (items) => {
        const totalQuantity = items.reduce((total, item) => total + parseInt(item.quantity || 0), 0);
        const totalAmount = items.reduce(
          (total, item) => total + (parseInt(item.quantity || 0) * parseFloat(item.unitPrice || 0)),
          0
        );
        setInvoiceData((prevData) => ({ ...prevData, totalQuantity, totalAmount }));
      };

  return (
    <div className="flex justify-center items-center h-screen mt-8">
      <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mt-8">
        <InvoiceHeader invoiceNumber=""/>
        <div className="border-t border-gray-400 mb-4"></div>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormField
                label="Bill To"
                name="name"
                type="text"
                value=""
                onChange=""
                placeholder="Enter bill to"
                error=""
              />
            </div>
            <div className="ml-8">
              <p className="font-medium">Issued Date:</p>
              <input
                type="date"
                name="issuedDate"
                value=""
                onChange=""
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="border-t border-gray-400 mb-4"></div>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email Address:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value=""
                onChange=""
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter email address"
              />
         
            </div>
            <div className="ml-8">
              <p className="font-medium">Due Date:</p>
              <input
                type="date"
                name="dueDate"
                value=""
                onChange=""
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block mb-1 font-medium">
                Phone Number:
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value=""
                onChange=""
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-400 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Item Description</th>
              <th className="border border-gray-400 px-4 py-2">Quantity</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Amount</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        <div className="mb-4">
        <button
          onClick=""
         className="py-2 px-4 bg-blue-800 text-white rounded hover:bg-blue-600 focus:outline-none"
       >
         Add Item
       </button>
        </div>

        <div className="border-t border-b my-4"></div>

        <div className="flex items-start justify-between mb-4">
          <div>
            <label htmlFor="notes" className="block mb-1 font-medium">
              Note/Payment Info:
            </label>
            <textarea
              id="notes"
              name="notes"
              value=""
              onChange=""
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter note/payment info"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium">Invoice Summary:</h3>
            <p>Total Quantity: </p>
            <p>Total Amount: $ </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick=""
            type="submit"
            className="px-8 py-2 bg-blue-800 text-white rounded hover:bg-blue-600 focus:outline-none"
            disabled="" // Disable the button while loading
          >
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
