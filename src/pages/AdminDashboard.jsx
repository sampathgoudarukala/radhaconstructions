import { useEffect, useState } from "react";

function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/enquiries"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to fetch enquiries"
          );
        }

        setEnquiries(data.enquiries);
      } catch (error) {
        console.error("Admin enquiry fetch error:", error);

        setError(
          "Unable to load enquiries. Please check the server."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const newCount = enquiries.filter(
    (enquiry) => enquiry.status === "New"
  ).length;

  const contactedCount = enquiries.filter(
    (enquiry) => enquiry.status === "Contacted"
  ).length;

  const discussionCount = enquiries.filter(
    (enquiry) => enquiry.status === "In Discussion"
  ).length;

  const estimateCount = enquiries.filter(
    (enquiry) => enquiry.status === "Estimate"
  ).length;


  // const filteredEnquiries = enquiries.filter((enquiry) => {
  //   const search = searchTerm.toLowerCase().trim();

  //   if (!search) return true;

  //   return (
  //     enquiry.name?.toLowerCase().includes(search) ||
  //     enquiry.mobile?.toLowerCase().includes(search) ||
  //     enquiry.location?.toLowerCase().includes(search) ||
  //     enquiry.projectType?.toLowerCase().includes(search)
  //   );
  // });

  // const openEnquiry = (enquiry) => {
  //   setSelectedEnquiry(enquiry);
  // };
  // const openEnquiry = (enquiry) => {
  //   setSelectedEnquiry(enquiry);
  // };

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !search ||
      enquiry.name?.toLowerCase().includes(search) ||
      enquiry.mobile?.toLowerCase().includes(search) ||
      enquiry.location?.toLowerCase().includes(search) ||
      enquiry.projectType?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      enquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openEnquiry = async (enquiry) => {
    try {
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/enquiries/${enquiry._id}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch enquiry"
        );
      }

      setSelectedEnquiry(data.enquiry);
      setNotes(data.enquiry.internalNotes || "");
    } catch (error) {
      console.error("Single enquiry fetch error:", error);

      setError(
        "Unable to load enquiry details. Please try again."
      );
    }
  };

  const closeEnquiry = () => {
    setSelectedEnquiry(null);
  };


  const getFileUrl = (fileUrl) => {
    if (!fileUrl) {
      return "";
    }

    // Cloudinary URLs are already complete.
    if (/^https?:\/\//i.test(fileUrl)) {
      return fileUrl;
    }

    // Keep compatibility with older locally stored files.
    return `http://localhost:5000${fileUrl.startsWith("/") ? "" : "/"}${fileUrl}`;
  };


  // const getFileUrl = (fileUrl) => {
  //   if (!fileUrl) {
  //     return "#";
  //   }

  //   return `http://localhost:5000${fileUrl}`;
  // };

  const updateStatus = async (newStatus) => {
    if (!selectedEnquiry) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/enquiries/${selectedEnquiry._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update status"
        );
      }

      // Update selected enquiry
      setSelectedEnquiry(data.enquiry);

      // Update enquiry in dashboard list
      setEnquiries((previous) =>
        previous.map((enquiry) =>
          enquiry._id === data.enquiry._id
            ? data.enquiry
            : enquiry
        )
      );
    } catch (error) {
      console.error("Status update error:", error);

      alert("Unable to update enquiry status.");
    }
  };

  const saveNotes = async () => {
    if (!selectedEnquiry) {
      return;
    }

    try {
      setSavingNotes(true);

      const response = await fetch(
        `http://localhost:5000/api/enquiries/${selectedEnquiry._id}/notes`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            internalNotes: notes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to save notes"
        );
      }

      setSelectedEnquiry(data.enquiry);

      setEnquiries((previous) =>
        previous.map((enquiry) =>
          enquiry._id === data.enquiry._id
            ? data.enquiry
            : enquiry
        )
      );

      setNotes(data.enquiry.internalNotes || "");

      alert("Internal notes saved successfully.");
    } catch (error) {
      console.error("Notes save error:", error);

      alert("Unable to save internal notes.");
    } finally {
      setSavingNotes(false);
    }
  };
  return (
    <div className="admin-page">

      <div className="admin-container">

        {/* HEADER */}

        <div className="admin-header">

          <div>
            <p className="admin-eyebrow">
              RADHA CONSTRUCTIONS
            </p>

            <h1>
              Admin Dashboard
            </h1>

            <p className="admin-subtitle">
              Manage project enquiries and client requirements.
            </p>
          </div>

          <div className="admin-header-label">
            ENQUIRIES
          </div>

        </div>

        {/* STATS */}

        <div className="admin-stats">

          <div className="admin-stat">
            <span>TOTAL</span>
            <strong>{enquiries.length}</strong>
          </div>

          <div className="admin-stat">
            <span>NEW</span>
            <strong>{newCount}</strong>
          </div>

          <div className="admin-stat">
            <span>CONTACTED</span>
            <strong>{contactedCount}</strong>
          </div>

          <div className="admin-stat">
            <span>DISCUSSION</span>
            <strong>{discussionCount}</strong>
          </div>

          <div className="admin-stat">
            <span>ESTIMATE</span>
            <strong>{estimateCount}</strong>
          </div>

        </div>

        {/* ENQUIRIES */}

        <div className="admin-section-header">

          <div>
            <span>PROJECT ENQUIRIES</span>
            <h2>Recent enquiries</h2>
          </div>

          <div className="admin-search-wrapper">

            <input
              type="text"
              className="admin-search-input"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search enquiries..."
            />

            <select
              className="admin-status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Discussion">In Discussion</option>
              <option value="Estimate">Estimate</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="button"
              className="admin-clear-filter"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("All");
              }}
            >
              CLEAR
            </button>
            <span className="admin-count">
              {filteredEnquiries.length}{" "}
              {filteredEnquiries.length === 1 ? "RECORD" : "RECORDS"}
            </span>


          </div>

        </div>

        {loading && (
          <div className="admin-message">
            Loading enquiries...
          </div>
        )}

        {error && (
          <div className="admin-message admin-error">
            {error}
          </div>
        )}

        {!loading && !error && enquiries.length === 0 && (
          <div className="admin-message">
            No enquiries found.
          </div>
        )}

        {!loading && !error && enquiries.length > 0 && (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>CLIENT</th>
                  <th>PROJECT</th>
                  <th>LOCATION</th>
                  <th>BUDGET</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>

                {filteredEnquiries.map((enquiry) => (

                  <tr
                    key={enquiry._id}
                    onClick={() => openEnquiry(enquiry)}
                    className="admin-table-row"
                  >

                    <td>
                      <strong>
                        {enquiry.name}
                      </strong>

                      <small>
                        {enquiry.mobile}
                      </small>
                    </td>

                    <td>
                      {enquiry.projectType}
                    </td>

                    <td>
                      {enquiry.location}
                    </td>

                    <td>
                      {enquiry.budget || "—"}
                    </td>

                    <td>
                      {new Date(
                        enquiry.createdAt
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td>
                      <span
                        className={`admin-status status-${enquiry.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {enquiry.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ENQUIRY DETAILS MODAL */}

      {selectedEnquiry && (

        <div
          className="admin-modal-overlay"
          onClick={closeEnquiry}
        >

          <div
            className="admin-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* 
            <div className="admin-modal-header">

              <div>

                <span>
                  PROJECT ENQUIRY
                </span>

                <h2>
                  {selectedEnquiry.name}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeEnquiry}
                className="admin-modal-close"
              >
                ×
              </button>

            </div> */}

            <div className="admin-section-header">

              <div>
                <span>PROJECT ENQUIRIES</span>

                <h2>
                  Recent enquiries
                </h2>
              </div>

              <div className="admin-filter-controls">

                <div className="admin-search">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="Search enquiries..."
                  />
                </div>

                <select
                  className="admin-status-filter"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                >
                  <option value="All">All Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Estimate">Estimate</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>

                <span className="admin-count">
                  {filteredEnquiries.length} RECORDS
                </span>

              </div>

            </div>

            {/* CLIENT */}

            <div className="admin-detail-section">

              <div className="admin-detail-title">
                CLIENT INFORMATION
              </div>

              <div className="admin-detail-grid">

                <div>
                  <span>NAME</span>
                  <strong>
                    {selectedEnquiry.name}
                  </strong>
                </div>

                <div>
                  <span>MOBILE</span>
                  <strong>
                    {selectedEnquiry.mobile}
                  </strong>
                </div>

                <div>
                  <span>EMAIL</span>
                  <strong>
                    {selectedEnquiry.email || "—"}
                  </strong>
                </div>

                <div>
                  <span>LOCATION</span>
                  <strong>
                    {selectedEnquiry.location}
                  </strong>
                </div>

              </div>

            </div>

            {/* PROJECT */}

            <div className="admin-detail-section">

              <div className="admin-detail-title">
                PROJECT INFORMATION
              </div>

              <div className="admin-detail-grid">

                <div>
                  <span>PROJECT TYPE</span>
                  <strong>
                    {selectedEnquiry.projectType}
                  </strong>
                </div>

                <div>
                  <span>PLOT SIZE</span>
                  <strong>
                    {selectedEnquiry.plotSize || "—"}
                  </strong>
                </div>

                <div>
                  <span>BUILT-UP AREA</span>
                  <strong>
                    {selectedEnquiry.builtUpArea || "—"}
                  </strong>
                </div>

                <div>
                  <span>FLOORS</span>
                  <strong>
                    {selectedEnquiry.floors || "—"}
                  </strong>
                </div>

                <div>
                  <span>BUDGET</span>
                  <strong>
                    {selectedEnquiry.budget || "—"}
                  </strong>
                </div>

                {/* <div>
                  <span>STATUS</span>
                  <strong>
                    {selectedEnquiry.status}
                  </strong>
                </div> */}
                <div className="admin-status-control">

                  <span>STATUS</span>

                  <select
                    value={selectedEnquiry.status}
                    onChange={(event) =>
                      updateStatus(event.target.value)
                    }
                  >
                    <option value="New">
                      New
                    </option>

                    <option value="Contacted">
                      Contacted
                    </option>

                    <option value="In Discussion">
                      In Discussion
                    </option>

                    <option value="Estimate">
                      Estimate
                    </option>

                    <option value="Approved">
                      Approved
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                    <option value="Completed">
                      Completed
                    </option>
                  </select>



                </div>

              </div>

            </div>

            {/* REQUIREMENTS */}

            <div className="admin-detail-section">

              <div className="admin-detail-title">
                REQUIREMENTS
              </div>

              <p className="admin-message-text">
                {selectedEnquiry.message ||
                  "No additional requirements provided."}
              </p>

            </div>
            {/* INTERNAL NOTES */}

            <div className="admin-detail-section">

              <div className="admin-detail-title">
                INTERNAL NOTES
              </div>

              <textarea
                className="admin-notes-input"
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                placeholder="Add private follow-up notes about this enquiry..."
              />

              <div className="admin-notes-actions">
                <button
                  type="button"
                  className="admin-notes-save"
                  onClick={saveNotes}
                  disabled={savingNotes}
                >
                  {savingNotes ? "SAVING..." : "SAVE NOTES"}
                </button>
              </div>

            </div>

            {/* FILES */}

            <div className="admin-detail-section">

              <div className="admin-detail-title">
                PROJECT FILES
              </div>

              {selectedEnquiry.files &&
                selectedEnquiry.files.length > 0 ? (

                <div className="admin-files">

                  {selectedEnquiry.files.map(
                    (file, index) => (

                      // <a
                      //   key={`${file.name}-${index}`}
                      //   href={getFileUrl(file.url)}
                      //   target="_blank"
                      //   rel="noreferrer"
                      //   className="admin-file"
                      // >

                      <a
                        key={`${file.name}-${index}`}
                        href={getFileUrl(file.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-file"
                        onClick={(event) => {
                          event.stopPropagation();
                          if (!getFileUrl(file.url)) {
                            event.preventDefault();
                          }
                        }}
                      >
                        <div>
                          <strong>{file.name}</strong>
                          <span>{file.type}</span>
                        </div>
                        <span>⬇ Download</span>
                      </a>

                    )
                  )}

                </div>

              ) : (

                <p className="admin-message-text">
                  No files uploaded.
                </p>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;