import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export function AdminInquiryPage() {
  const [inquiries, setInquiries] = useState([]);
  const [responseMap, setResponseMap] = useState({}); // Store responses by inquiry ID

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiry`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInquiries(res.data || []);
    } catch (error) {
      console.error("Failed to fetch inquiries", error);
    }
  };

  const handleResponseChange = (id, value) => {
    setResponseMap((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdateResponse = async (id) => {
    const token = localStorage.getItem("token");
    const response = responseMap[id];

    if (!response || !response.trim()) {
      Swal.fire("Warning", "Response cannot be empty.", "warning");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiry/${id}`,
        { response },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("Success", "Response updated successfully.", "success");
      fetchInquiries();
    } catch (error) {
      console.error("Failed to update response", error);
      Swal.fire("Error", "Failed to update response.", "error");
    }
  };

  const handleDeleteInquiry = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This inquiry will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/inquiry/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Swal.fire("Deleted!", "Inquiry has been deleted.", "success");
        fetchInquiries();
      } catch (error) {
        console.error("Failed to delete inquiry", error);
        Swal.fire("Error", "Failed to delete inquiry.", "error");
      }
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Inquiries</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Message</th>
              <th className="p-3 border">Response</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id}>
                <td className="p-3 border text-center text-sm text-gray-500">
                  {inq.id}
                </td>
                <td className="p-3 border text-center">
                  {inq.phone || "Unknown"}
                </td>
                <td className="p-3 border text-center">{inq.email}</td>
                <td className="p-3 border">{inq.message}</td>
                <td className="p-3 border">
                  <textarea
                    rows={3}
                    className="w-full p-2 border rounded"
                    value={responseMap[inq._id] ?? inq.response ?? ""}
                    onChange={(e) =>
                      handleResponseChange(inq._id, e.target.value)
                    }
                  />
                </td>
                <td className="p-3 border text-center space-y-2">
                  <button
                    onClick={() => handleUpdateResponse(inq._id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 w-full"
                  >
                    Response
                  </button>
                  <button
                    onClick={() => handleDeleteInquiry(inq._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 w-full"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {inquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No inquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
