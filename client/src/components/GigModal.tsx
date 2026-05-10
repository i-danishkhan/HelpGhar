import { useState, useRef } from "react";
import { Upload, X, ImageIcon, CheckCircle, AlertCircle } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FieldErrors = {
  title?: string;
  description?: string;
  price?: string;
};

type StatusMessage = {
  type: "success" | "error";
  text: string;
} | null;

export default function GigModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [statusMessage, setStatusMessage] = useState<StatusMessage>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!description.trim()) errors.description = "Description is required";
    if (!price) {
      errors.price = "Price is required";
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      errors.price = "Enter a valid price";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitGig = async () => {
    setStatusMessage(null);
    if (!validate()) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("workerId", "1");
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gigs/create`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMessage({ type: "error", text: data.error || data.message || "Something went wrong" });
        return;
      }

      setStatusMessage({ type: "success", text: data.message || "Gig created successfully!" });

      // Reset form after short delay so user sees success
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        setFieldErrors({});
        setStatusMessage(null);
        removeImage();
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: "100%", padding: "9px 12px", borderRadius: "8px",
    border: `1.5px solid ${hasError ? "#ef4444" : "#e5e7eb"}`, fontSize: "0.85rem",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit"
  });

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 50, padding: "16px"
    }}>
      <div style={{
        background: "white", borderRadius: "16px",
        width: "100%", maxWidth: "420px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          background: "#10B981", padding: "16px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <h2 style={{ color: "white", fontWeight: 700, fontSize: "1.05rem", margin: 0 }}>
            Create a Gig
          </h2>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.2)", border: "none",
            borderRadius: "50%", width: "28px", height: "28px",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", color: "white"
          }}>
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* Status Message Banner */}
          {statusMessage && (
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 12px", borderRadius: "8px",
              background: statusMessage.type === "success" ? "#ecfdf5" : "#fef2f2",
              border: `1px solid ${statusMessage.type === "success" ? "#6ee7b7" : "#fca5a5"}`,
              fontSize: "0.82rem", fontWeight: 500,
              color: statusMessage.type === "success" ? "#065f46" : "#991b1b"
            }}>
              {statusMessage.type === "success"
                ? <CheckCircle size={15} />
                : <AlertCircle size={15} />}
              {statusMessage.text}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#444", display: "block", marginBottom: "6px" }}>
              Profile Photo
            </label>

            {imagePreview ? (
              <div style={{ position: "relative", width: "100%", height: "160px", borderRadius: "10px", overflow: "hidden" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  onClick={removeImage}
                  style={{
                    position: "absolute", top: "8px", right: "8px",
                    background: "rgba(0,0,0,0.6)", border: "none",
                    borderRadius: "50%", width: "26px", height: "26px",
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", color: "white"
                  }}
                >
                  <X size={13} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: "100%", height: "120px", borderRadius: "10px",
                  border: "2px dashed #d1d5db", display: "flex",
                  flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "8px", cursor: "pointer", background: "#f9fafb",
                  transition: "border-color 0.2s", boxSizing: "border-box"
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#10B981")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#d1d5db")}
              >
                <ImageIcon size={28} color="#9ca3af" />
                <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>Click to upload photo</span>
                <span style={{ fontSize: "0.68rem", color: "#c4c4c4" }}>JPG, PNG, WEBP — max 5MB</span>
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          {/* Title */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#444", display: "block", marginBottom: "5px" }}>
              Title <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Expert House Cleaning"
              value={title}
              onChange={e => { setTitle(e.target.value); setFieldErrors(p => ({ ...p, title: undefined })); }}
              style={inputStyle(!!fieldErrors.title)}
              onFocus={e => (e.target.style.borderColor = fieldErrors.title ? "#ef4444" : "#10B981")}
              onBlur={e => (e.target.style.borderColor = fieldErrors.title ? "#ef4444" : "#e5e7eb")}
            />
            {fieldErrors.title && (
              <span style={{ fontSize: "0.73rem", color: "#ef4444", marginTop: "3px", display: "flex", alignItems: "center", gap: "3px" }}>
                <AlertCircle size={11} /> {fieldErrors.title}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#444", display: "block", marginBottom: "5px" }}>
              Description <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <textarea
              placeholder="Describe your services..."
              value={description}
              onChange={e => { setDescription(e.target.value); setFieldErrors(p => ({ ...p, description: undefined })); }}
              rows={3}
              style={{
                ...inputStyle(!!fieldErrors.description),
                resize: "vertical"
              }}
              onFocus={e => (e.target.style.borderColor = fieldErrors.description ? "#ef4444" : "#10B981")}
              onBlur={e => (e.target.style.borderColor = fieldErrors.description ? "#ef4444" : "#e5e7eb")}
            />
            {fieldErrors.description && (
              <span style={{ fontSize: "0.73rem", color: "#ef4444", marginTop: "3px", display: "flex", alignItems: "center", gap: "3px" }}>
                <AlertCircle size={11} /> {fieldErrors.description}
              </span>
            )}
          </div>

          {/* Price + Category row */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#444", display: "block", marginBottom: "5px" }}>
                Price (Rs.) <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="number"
                placeholder="25000"
                value={price}
                onChange={e => { setPrice(e.target.value); setFieldErrors(p => ({ ...p, price: undefined })); }}
                style={inputStyle(!!fieldErrors.price)}
                onFocus={e => (e.target.style.borderColor = fieldErrors.price ? "#ef4444" : "#10B981")}
                onBlur={e => (e.target.style.borderColor = fieldErrors.price ? "#ef4444" : "#e5e7eb")}
              />
              {fieldErrors.price && (
                <span style={{ fontSize: "0.73rem", color: "#ef4444", marginTop: "3px", display: "flex", alignItems: "center", gap: "3px" }}>
                  <AlertCircle size={11} /> {fieldErrors.price}
                </span>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#444", display: "block", marginBottom: "5px" }}>
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{
                  width: "100%", padding: "9px 12px", borderRadius: "8px",
                  border: "1.5px solid #e5e7eb", fontSize: "0.85rem",
                  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
                  background: "white", cursor: "pointer"
                }}
                onFocus={e => (e.target.style.borderColor = "#10B981")}
                onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
              >
                <option value="">Select...</option>
                <option value="Servants">Servants</option>
                <option value="Drivers">Drivers</option>
                <option value="Baby Sitters">Baby Sitters</option>
                <option value="Cooks">Cooks</option>
                <option value="Home Teachers">Home Teachers</option>
                <option value="Watchman">Watchman</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: "10px", borderRadius: "8px",
                border: "1.5px solid #e5e7eb", background: "white",
                fontSize: "0.88rem", fontWeight: 600, cursor: "pointer",
                color: "#555", fontFamily: "inherit"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitGig}
              disabled={loading}
              style={{
                flex: 2, padding: "10px", borderRadius: "8px",
                border: "none", background: loading ? "#a7f3d0" : "#10B981",
                fontSize: "0.88rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                color: "white", fontFamily: "inherit", transition: "background 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
              }}
            >
              {loading ? "Submitting..." : (
                <>
                  <Upload size={14} />
                  Submit Gig
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}