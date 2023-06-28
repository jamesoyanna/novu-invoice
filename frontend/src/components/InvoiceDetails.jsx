import React, { useState } from "react";
import logo from "../images/one.png";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../api";

const InvoiceDetails = () => {
  const location = useLocation();
  const initialInvoiceData = location.state?.invoiceData;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [editMode, setEditMode] = useState(false); // New state variable for edit mode
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);

  const { email } = invoiceData;
  const navigateTo = (route) => {
    navigate(route);
  };

  const handleGoBack = () => {
    navigateTo("/");
  };

  const handleSendInvoice = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post("/send-pdf", invoiceData);
      setLoading(false);

      if (response.data.error) {
        setError(response.data.error);
        setSuccess(false);
      } else {
        setSuccess(response.data.message);
        setError("");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while sending the invoice.");
      setSuccess(false);
      console.error(error);
    }
  };


  const handleEditInvoice = async () => {
    setEditMode(!editMode);
  
    if (editMode) {
      try {
        setError("");
  
        // Calculate the updated total quantity and total amount
        let totalQuantity = 0;
        let totalAmount = 0;
  
        invoiceData.items.forEach((item) => {
          totalQuantity += parseInt(item.quantity);
          totalAmount += item.quantity * item.unitPrice;
        });
  
        const updatedInvoiceData = {
          ...invoiceData,
          totalQuantity,
          totalAmount,
        };
  
        const response = await api.patch(`/api/invoices/${invoiceData._id}`, updatedInvoiceData);
  
        if (response.data.error) {
          setError(response.data.error);
          setSuccess(false);
        } else {
          setSuccess(response.data.message);
          setError("");
  
          // Update the state with the updated total quantity and total amount
          setInvoiceData(updatedInvoiceData);
        }
      } catch (error) {
        setLoading(false);
        setError("An error occurred while editing the invoice.");
        setSuccess(false);
        console.error(error);
      }
    }
  };
  
  // Format the date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg mt-8">
      <div className="flex items-start justify-center mb-4">
            <button
                onClick={handleGoBack}
                className="py-2 px-4 bg-blue-800 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                Go Back
              </button>
              <button
                onClick={handleEditInvoice}
                className="py-2 px-4 ml-2 bg-gradient-to-r bg-blue-800 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                Edit Invoice
                </button>
            </div>
        <div className="mb-8">
        
          <div className="flex items-start justify-between mb-4">

            <div>
              <Link to="/">
                <img src={logo} alt="Logo" className="h-12 mb-2" />
              </Link>
              <h1 className="text-2xl font-medium">Novu Invoice</h1>
              <p>Lagos, Nigeria</p>
            </div>
            
            <div className="flex items-start">
              <div className="ml-auto">
                <p className="text-lg font-bold">Invoice No:</p>
                <p>{invoiceData.invoiceNumber}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-400 mb-4"></div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="billTo" className="block mb-1 font-medium">
                Bill To:
              </label>
              {editMode ? (
                <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  type="text"
                  value={invoiceData.name}
                  onChange={(e) =>
                    setInvoiceData((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                />
              ) : (
                <p>{invoiceData.name}</p>
              )}
            </div>
            <div>
              <div className="ml-8">
                <p className="font-medium">Issued Date:</p>
                <p>{formatDate(invoiceData.issuedDate)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email Address:
              </label>
              {editMode ? (
                <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  type="email"
                  value={invoiceData.email}
                  onChange={(e) =>
                    setInvoiceData((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              ) : (
                <p>{invoiceData.email}</p>
              )}
            </div>
            <div className="ml-8">
              <p className="font-medium">Due Date:</p>
              <p>{formatDate(invoiceData.dueDate)}</p>
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Phone Number:
              </label>
              {editMode ? (
                <input
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  type="tel"
                  value={invoiceData.phoneNumber}
                  onChange={(e) =>
                    setInvoiceData((prevState) => ({
                      ...prevState,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              ) : (
                <p>{invoiceData.phoneNumber}</p>
              )}
            </div>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-400 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Item Description</th>
              <th className="border border-gray-400 px-4 py-2">Quantity</th>
              <th className="border border-gray-400 px-4 py-2">Price ($)</th>
              <th className="border border-gray-400 px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {editMode ? (
                    <input
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                      type="text"
                      value={item.itemName}
                      onChange={(e) =>
                        setInvoiceData((prevState) => ({
                          ...prevState,
                          items: prevState.items.map((prevItem, i) =>
                            i === index
                              ? { ...prevItem, itemName: e.target.value }
                              : prevItem
                          ),
                        }))
                      }
                    />
                  ) : (
                    item.itemName
                  )}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {editMode ? (
                    <input
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        setInvoiceData((prevState) => ({
                          ...prevState,
                          items: prevState.items.map((prevItem, i) =>
                            i === index
                              ? { ...prevItem, quantity: e.target.value }
                              : prevItem
                          ),
                        }))
                      }
                    />
                  ) : (
                    item.quantity
                  )}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {editMode ? (
                    <input
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        setInvoiceData((prevState) => ({
                          ...prevState,
                          items: prevState.items.map((prevItem, i) =>
                            i === index
                              ? { ...prevItem, unitPrice: e.target.value }
                              : prevItem
                          ),
                        }))
                      }
                    />
                  ) : (
                    item.unitPrice
                  )}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {item.quantity * item.unitPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-b my-4"></div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <label htmlFor="note" className="block mb-1 font-medium">
              Note/Payment Info:
            </label>
            {editMode ? (
              <textarea
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                value={invoiceData.notes}
                onChange={(e) =>
                  setInvoiceData((prevState) => ({
                    ...prevState,
                    notes: e.target.value,
                  }))
                }
              />
            ) : (
              <p>{invoiceData.notes}</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium">Invoice Summary:</h3>
            <p>Total Quantity: {invoiceData.totalQuantity}</p>
            <p>Total Amount: $ {invoiceData.totalAmount}</p>
          </div>
        </div>
        {success && !error && (
          <p className="text-green-700 mb-8 text-center text-lg">
            Invoice sent successfully!. Please check your email at {email}
          </p>
        )}
        {error && (
          <p className="text-red-700 mb-8 text-center">{error}</p>
        )}
          <div className="flex items-center justify-center">
          {editMode ? (
  <button
    onClick={handleEditInvoice}
    className="py-2 px-4 ml-2 bg-blue-800 text-white rounded hover:bg-blue-600 focus:outline-none"
  >
    Done
  </button>
) : (
  <button
    onClick={handleSendInvoice}
    disabled={loading}
    className={`py-2 px-4 bg-blue-800 text-white rounded hover:bg-blue-600 focus:outline-none ${
      loading ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {loading ? "Sending Invoice..." : "Send Invoice"}
  </button>
)}
          </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
