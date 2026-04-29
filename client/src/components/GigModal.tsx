import { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GigModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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

  const handleSubmitGig = async () => {
    if (!title || !description || !price) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // ✅ Use FormData so image file can be sent
      const formData = new FormData();
      formData.append("workerId", "1"); // later dynamic
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("http://localhost:8000/api/gigs/create", {
        method: "POST",
        // ✅ Do NOT set Content-Type header — browser sets it with boundary automatically
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.message || "Something went wrong");
        return;
      }

      alert(data.message);
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      removeImage();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
          background: "#1abc9c", padding: "16px 20px",
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

          {/* ✅ Image Upload */}
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
                  transition: "border-color 0.2s"
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#1abc9c")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#d1d5db")}
              >
                <ImageIcon size={28} color="#9ca3af" />
                <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>
                  Click to upload photo
                </span>
                <span style={{ fontSize: "0.68rem", color: "#c4c4c4" }}>
                  JPG, PNG, WEBP — max 5MB
                </span>
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
              onChange={e => setTitle(e.target.value)}
              style={{
                width: "100%", padding: "9px 12px", borderRadius: "8px",
                border: "1.5px solid #e5e7eb", fontSize: "0.85rem",
                outline: "none", boxSizing: "border-box", fontFamily: "inherit"
              }}
              onFocus={e => (e.target.style.borderColor = "#1abc9c")}
              onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#444", display: "block", marginBottom: "5px" }}>
              Description <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <textarea
              placeholder="Describe your services..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              style={{
                width: "100%", padding: "9px 12px", borderRadius: "8px",
                border: "1.5px solid #e5e7eb", fontSize: "0.85rem",
                outline: "none", boxSizing: "border-box", resize: "vertical",
                fontFamily: "inherit"
              }}
              onFocus={e => (e.target.style.borderColor = "#1abc9c")}
              onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
            />
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
                onChange={e => setPrice(e.target.value)}
                style={{
                  width: "100%", padding: "9px 12px", borderRadius: "8px",
                  border: "1.5px solid #e5e7eb", fontSize: "0.85rem",
                  outline: "none", boxSizing: "border-box", fontFamily: "inherit"
                }}
                onFocus={e => (e.target.style.borderColor = "#1abc9c")}
                onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
              />
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
                onFocus={e => (e.target.style.borderColor = "#1abc9c")}
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
                border: "none", background: loading ? "#a7f3d0" : "#1abc9c",
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