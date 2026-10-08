import { useState } from "react";

function QuoteSection() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    location: "",
    projectType: "",
    plotSize: "",
    builtUpArea: "",
    floors: "",
    budget: "",
    message: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setApiError("");
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const validFiles = selectedFiles.filter((file) => {
      const isValidType = allowedTypes.includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024;

      return isValidType && isValidSize;
    });

    setFiles((previous) => [...previous, ...validFiles]);

    event.target.value = "";
  };

  const removeFile = (indexToRemove) => {
    setFiles((previous) =>
      previous.filter((_, index) => index !== indexToRemove)
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Project location is required";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError("");

    try {
      const submissionData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        submissionData.append(key, value);
      });

      files.forEach((file) => {
        submissionData.append("files", file);
      });

      const response = await fetch(
        "http://localhost:5000/api/enquiries",
        {
          method: "POST",
          body: submissionData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit enquiry"
        );
      }

      console.log("Enquiry created:", data.enquiry);


      setSubmitted(true);
      setTimeout(() => {
        document
          .getElementById("get-quote")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 50);
      setSubmittedData({
        ...formData,
      });
      setFormData({
        name: "",
        mobile: "",
        email: "",
        location: "",
        projectType: "",
        plotSize: "",
        builtUpArea: "",
        floors: "",
        budget: "",
        message: "",
      });
      setFiles([]);
      setErrors({});
    } catch (error) {
      console.error("Enquiry submission error:", error);

      setApiError(
        "We couldn't submit your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setApiError("");
  };

  return (
    <section className="quote-section" id="get-quote">
      <div className="quote-container">

        {/* HEADER */}

        <div className="quote-header">

          <div className="quote-section-title">
            07 <span>GET A QUOTE</span>
          </div>

          <div className="quote-header-content">

            <div>
              <h2>
                Tell us about
                <br />
                <em>your project.</em>
              </h2>
            </div>

            <div className="quote-header-side">
              <p>
                Share a few details about your project and
                our team will get back to you to discuss the
                next steps.
              </p>

              <span className="quote-time">
                APPROX. 2 MINUTES
              </span>
            </div>

          </div>

        </div>

        {submitted ? (

          /* SUCCESS */

          <div className="quote-success">

            <div className="quote-success-number">
              ✓
            </div>

            <h3>
              Thank you.
            </h3>

            <p>
              Your project enquiry has been received.
              Our team will contact you shortly.
            </p>

            <button
              type="button"
              onClick={resetForm}
              className="quote-submit-button"
            >
              SUBMIT ANOTHER ENQUIRY
            </button>
            <button
              type="button"
              className="whatsapp-share-button"
              onClick={() => {
                const whatsappMessage = `
🏗️ NEW PROJECT ENQUIRY
RADHA CONSTRUCTIONS
━━━━━━━━━━━━━━━━━━

CLIENT DETAILS
Name: ${submittedData?.name || "Not provided"}
Mobile: ${submittedData?.mobile || "Not provided"}
Email: ${submittedData?.email || "Not provided"}
Location: ${submittedData?.location || "Not provided"}

PROJECT DETAILS
Project Type: ${submittedData?.projectType || "Not provided"}
Plot Size: ${submittedData?.plotSize || "Not provided"}
Built-up Area: ${submittedData?.builtUpArea || "Not provided"}
Floors: ${submittedData?.floors || "Not provided"}
Budget: ${submittedData?.budget || "Not provided"}

PROJECT BRIEF
${submittedData?.message || "No additional requirements provided."}

━━━━━━━━━━━━━━━━━━
Submitted via Radha Constructions Website
`;

                const whatsappUrl = `https://wa.me/919848851443?text=${encodeURIComponent(
                  whatsappMessage
                )}`;

                window.open(whatsappUrl, "_blank");
              }}
            >
              SHARE ON WHATSAPP →
            </button>
            <a
  href="https://www.instagram.com/radha.constructions/"
  target="_blank"
  rel="noopener noreferrer"
  className="instagram-share-button"
>
  VISIT US ON INSTAGRAM →
</a>
          </div>

        ) : (

          <form
            className="quote-form"
            onSubmit={handleSubmit}
          >

            {/* =========================================
                01 — YOUR DETAILS
            ========================================= */}

            <div className="quote-form-section">

              <div className="quote-section-heading">
                <span>01</span>
                <div>
                  <strong>YOUR DETAILS</strong>
                  <small>
                    How can we reach you?
                  </small>
                </div>
              </div>

              <div className="quote-form-grid">

                {/* NAME */}

                <div className="quote-field">

                  <label htmlFor="name">
                    NAME <span>*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />

                  {errors.name && (
                    <span className="quote-error">
                      {errors.name}
                    </span>
                  )}

                </div>

                {/* MOBILE */}

                <div className="quote-field">

                  <label htmlFor="mobile">
                    MOBILE <span>*</span>
                  </label>

                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                  />

                  {errors.mobile && (
                    <span className="quote-error">
                      {errors.mobile}
                    </span>
                  )}

                </div>

                {/* EMAIL */}

                <div className="quote-field">

                  <label htmlFor="email">
                    EMAIL
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                  />

                </div>

                {/* LOCATION */}

                <div className="quote-field">

                  <label htmlFor="location">
                    PROJECT LOCATION <span>*</span>
                  </label>

                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City / Area"
                  />

                  {errors.location && (
                    <span className="quote-error">
                      {errors.location}
                    </span>
                  )}

                </div>

              </div>

            </div>


            {/* =========================================
                02 — PROJECT DETAILS
            ========================================= */}

            <div className="quote-form-section">

              <div className="quote-section-heading">
                <span>02</span>
                <div>
                  <strong>PROJECT DETAILS</strong>
                  <small>
                    Tell us about the space you're planning.
                  </small>
                </div>
              </div>

              <div className="quote-form-grid">

                {/* PROJECT TYPE */}

                <div className="quote-field">

                  <label htmlFor="projectType">
                    PROJECT TYPE <span>*</span>
                  </label>

                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select project type
                    </option>

                    <option value="Residential House">
                      Residential House
                    </option>

                    <option value="Villa">
                      Villa
                    </option>

                    <option value="Apartment">
                      Apartment
                    </option>

                    <option value="Commercial">
                      Commercial
                    </option>

                    <option value="Renovation">
                      Renovation
                    </option>

                    <option value="Interiors">
                      Interiors
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>

                  {errors.projectType && (
                    <span className="quote-error">
                      {errors.projectType}
                    </span>
                  )}

                </div>

                {/* PLOT SIZE */}

                <div className="quote-field">

                  <label htmlFor="plotSize">
                    PLOT SIZE
                  </label>

                  <input
                    id="plotSize"
                    name="plotSize"
                    type="text"
                    value={formData.plotSize}
                    onChange={handleChange}
                    placeholder="Example: 30 × 40 ft"
                  />

                </div>

                {/* BUILT UP AREA */}

                <div className="quote-field">

                  <label htmlFor="builtUpArea">
                    BUILT-UP AREA
                  </label>

                  <input
                    id="builtUpArea"
                    name="builtUpArea"
                    type="text"
                    value={formData.builtUpArea}
                    onChange={handleChange}
                    placeholder="Example: 1800 sq.ft"
                  />

                </div>

                {/* FLOORS */}

                <div className="quote-field">

                  <label htmlFor="floors">
                    FLOORS
                  </label>

                  <select
                    id="floors"
                    name="floors"
                    value={formData.floors}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select floors
                    </option>

                    <option value="Ground Floor">
                      Ground Floor
                    </option>

                    <option value="G+1">
                      G+1
                    </option>

                    <option value="G+2">
                      G+2
                    </option>

                    <option value="G+3">
                      G+3
                    </option>

                    <option value="G+4">
                      G+4
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>

                </div>

                {/* BUDGET */}

                <div className="quote-field quote-field-budget">

                  <label htmlFor="budget">
                    APPROXIMATE BUDGET
                  </label>

                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select budget range
                    </option>

                    <option value="Below ₹25 Lakhs">
                      Below ₹25 Lakhs
                    </option>

                    <option value="₹25–50 Lakhs">
                      ₹25–50 Lakhs
                    </option>

                    <option value="₹50 Lakhs–1 Crore">
                      ₹50 Lakhs–1 Crore
                    </option>

                    <option value="₹1–2 Crores">
                      ₹1–2 Crores
                    </option>

                    <option value="Above ₹2 Crores">
                      Above ₹2 Crores
                    </option>

                    <option value="Not Decided">
                      Not Decided
                    </option>
                  </select>

                </div>

              </div>

            </div>


            {/* =========================================
                03 — PROJECT BRIEF
            ========================================= */}

            <div className="quote-form-section">

              <div className="quote-section-heading">
                <span>03</span>
                <div>
                  <strong>PROJECT BRIEF</strong>
                  <small>
                    Give us a little more to work with.
                  </small>
                </div>
              </div>

              {/* REQUIREMENTS */}

              <div className="quote-field quote-field-full">

                <label htmlFor="message">
                  YOUR REQUIREMENTS
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, preferred style, requirements, timeline, or anything else you'd like us to know."
                />

              </div>


              {/* FILE UPLOAD */}

              <div className="quote-upload">

                <input
                  id="projectFiles"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  onChange={handleFileChange}
                  hidden
                />

                <div className="quote-upload-content">

                  <div className="quote-upload-icon">
                    +
                  </div>

                  <div className="quote-upload-copy">

                    <strong>
                      PROJECT DRAWINGS / PHOTOS
                    </strong>

                    <span>
                      Optional — upload your site plan,
                      floor plan, elevation or site photographs
                      if available.
                    </span>

                    <small>
                      PDF, JPG, PNG or WEBP · Max 10MB per file
                    </small>

                  </div>

                  <button
                    type="button"
                    className="quote-upload-button"
                    onClick={() =>
                      document
                        .getElementById("projectFiles")
                        ?.click()
                    }
                  >
                    CHOOSE FILES
                  </button>

                </div>

                {files.length > 0 && (

                  <div className="quote-file-list">

                    {files.map((file, index) => (

                      <div
                        className="quote-file-item"
                        key={`${file.name}-${index}`}
                      >

                        <span>
                          {file.name}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          aria-label={`Remove ${file.name}`}
                        >
                          ×
                        </button>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </div>


            {/* API ERROR */}

            {apiError && (
              <div className="quote-api-error">
                {apiError}
              </div>
            )}


            {/* SUBMIT */}

            <div className="quote-submit">

              <div className="quote-submit-note">
                <span>READY WHEN YOU ARE.</span>

                <p>
                  By submitting this form, you agree to be
                  contacted by Radha Constructions regarding
                  your project enquiry.
                </p>
              </div>

              <button
                type="submit"
                className="quote-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "SUBMITTING..."
                  : "SUBMIT PROJECT ENQUIRY"}

                <span>↗</span>
              </button>

            </div>

          </form>

        )}

      </div>
    </section>
  );
}

export default QuoteSection;