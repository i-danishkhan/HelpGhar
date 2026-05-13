import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type PaymentMethod = "card" | "upi" | "wallet";

interface CardDetails {
  name: string;
  number: string;
  expiry: string;
  cvv: string;
}

interface OrderItem {
  label: string;
  amount: number;
  isDiscount?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GREEN = "#10B981";
const GREEN_DARK = "#0d9e6e";
const GREEN_FOOTER = "#0f766e";

const ORDER_ITEMS: OrderItem[] = [
  { label: "Tap replacement", amount: 10 },
  { label: "Pipeline work", amount: 30 },
  { label: "Promo Code", amount: -20, isDiscount: true },
  { label: "Taxes and Fees", amount: 5.45 },
];

const TOTAL = ORDER_ITEMS.reduce((sum, i) => sum + i.amount, 0);

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      style={{
        background: GREEN,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        height: 52,
        borderRadius: "12px 12px 0 0",
      }}
    >
      <span style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>
        HelpChar.
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#fff", fontSize: 13 }}>
        <span>Switch to worker</span>
        <BellIcon />
        <Avatar initials="ZA" />
        <span>Zohaib Ali</span>
        <ChevronDownIcon />
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: GREEN_FOOTER,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 28px",
        borderRadius: "0 0 12px 12px",
      }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        {["f", "ig", "in"].map((s) => (
          <div
            key={s}
            style={{
              width: 28,
              height: 28,
              borderRadius: 5,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {s}
          </div>
        ))}
      </div>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>
        ©2025 All Copyrights are Reserved
      </span>
    </footer>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
      <label style={{ fontSize: 12, color: "#6b7280" }}>{label}</label>
      {children}
    </div>
  );
}

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      style={{
        padding: "9px 12px",
        fontSize: 14,
        border: `1px solid ${focused ? GREEN : "#d1d5db"}`,
        borderRadius: 8,
        outline: "none",
        boxShadow: focused ? `0 0 0 3px rgba(16,185,129,0.15)` : "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
        width: "100%",
        background: "#fff",
        color: "#111827",
        ...props.style,
      }}
    />
  );
}

function RadioOption({
  value,
  selected,
  label,
  onChange,
}: {
  value: PaymentMethod;
  selected: PaymentMethod;
  label: string;
  onChange: (v: PaymentMethod) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 14,
        fontWeight: 500,
        color: "#111827",
        cursor: "pointer",
        marginBottom: 14,
      }}
    >
      <input
        type="radio"
        name="payment"
        checked={selected === value}
        onChange={() => onChange(value)}
        style={{ accentColor: GREEN, width: 16, height: 16, cursor: "pointer" }}
      />
      {label}
    </label>
  );
}

function CardPaymentPanel({ details, onChange }: {
  details: CardDetails;
  onChange: (d: CardDetails) => void;
}) {
  const set = (key: keyof CardDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...details, [key]: e.target.value });

  return (
    <div
      style={{
        background: "#f9fafb",
        borderRadius: 10,
        padding: 18,
        marginBottom: 16,
        border: `1.5px solid ${GREEN}`,
      }}
    >
      <FieldGroup label="Card Holder Name">
        <StyledInput
          placeholder="Full name"
          value={details.name}
          onChange={set("name")}
        />
      </FieldGroup>

      <FieldGroup label="Card Number">
        <div style={{ position: "relative" }}>
          <StyledInput
            placeholder="1234 5678 9012 3456"
            value={details.number}
            onChange={set("number")}
            maxLength={19}
            style={{ paddingRight: 80 }}
          />
          <div
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              gap: 5,
              alignItems: "center",
            }}
          >
            <span
              style={{
                background: "#1a1f71",
                color: "#fff",
                fontSize: 9,
                fontWeight: 700,
                padding: "2px 5px",
                borderRadius: 3,
                letterSpacing: "0.05em",
              }}
            >
              VISA
            </span>
            <MastercardIcon />
          </div>
        </div>
      </FieldGroup>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FieldGroup label="Expiry Date">
          <StyledInput placeholder="MM / YY" value={details.expiry} onChange={set("expiry")} />
        </FieldGroup>
        <FieldGroup label="CVV">
          <StyledInput placeholder="•••" type="password" maxLength={4} value={details.cvv} onChange={set("cvv")} />
        </FieldGroup>
      </div>
    </div>
  );
}

function UpiPanel() {
  return (
    <div
      style={{
        background: "#f9fafb",
        borderRadius: 10,
        padding: 18,
        marginBottom: 16,
        border: "0.5px solid #e5e7eb",
      }}
    >
      <FieldGroup label="Enter UPI ID">
        <StyledInput placeholder="yourname@upi" />
      </FieldGroup>
    </div>
  );
}

function WalletPanel() {
  const [active, setActive] = useState<"gpay" | "jazzcash" | null>(null);
  return (
    <div
      style={{
        background: "#f9fafb",
        borderRadius: 10,
        padding: 18,
        marginBottom: 16,
        border: "0.5px solid #e5e7eb",
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        {(["gpay", "jazzcash"] as const).map((w) => (
          <button
            key={w}
            onClick={() => setActive(w)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "10px 14px",
              background: active === w ? "#ecfdf5" : "#fff",
              border: `1px solid ${active === w ? GREEN : "#d1d5db"}`,
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              color: "#111827",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {w === "gpay" ? <GPayIcon /> : <span style={{ fontSize: 16 }}>🏦</span>}
            {w === "gpay" ? "G Pay" : "Jazzcash"}
          </button>
        ))}
      </div>
    </div>
  );
}

function SummaryCard({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "0.5px solid #e5e7eb",
        overflow: "hidden",
        alignSelf: "start",
      }}
    >
      <div
        style={{
          background: GREEN,
          padding: "14px 20px",
          textAlign: "center",
          fontSize: 14,
          fontWeight: 500,
          color: "#fff",
          letterSpacing: "0.04em",
        }}
      >
        Summary
      </div>

      <div style={{ padding: "16px 20px" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 4 }}>Plumber</p>

        <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>Timing</p>
        <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>9:00 AM – 12:00 AM</p>

        <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 2 }}>Location</p>
        <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>North Karachi sector 5C-1</p>

        <hr style={{ border: "none", borderTop: "0.5px solid #e5e7eb", margin: "10px 0" }} />

        <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 10 }}>Work</p>

        {ORDER_ITEMS.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              color: item.isDiscount ? GREEN : "#6b7280",
              padding: "3px 0",
            }}
          >
            <span>{item.label}</span>
            <span>
              {item.isDiscount ? `-$${Math.abs(item.amount)}` : `$${item.amount}`}
            </span>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 15,
            fontWeight: 600,
            color: "#111827",
            padding: "10px 0 4px",
            borderTop: "0.5px solid #e5e7eb",
            marginTop: 8,
          }}
        >
          <span>Total Price</span>
          <span>${TOTAL.toFixed(2)}</span>
        </div>

        <button
          onClick={onConfirm}
          style={{
            width: "100%",
            background: GREEN,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 0",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            marginTop: 14,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = GREEN_DARK)}
          onMouseLeave={(e) => (e.currentTarget.style.background = GREEN)}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}

// ─── Tiny Icons ───────────────────────────────────────────────────────────────

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 600,
        color: "#fff",
      }}
    >
      {initials}
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ChevronDownGrayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg width="28" height="18" viewBox="0 0 38 24" fill="none" aria-hidden="true">
      <circle cx="15" cy="12" r="10" fill="#EB001B" opacity="0.9" />
      <circle cx="23" cy="12" r="10" fill="#F79E1B" opacity="0.9" />
    </svg>
  );
}

function GPayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="url(#gp)" />
      <defs>
        <linearGradient id="gp" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="0.3" stopColor="#34A853" />
          <stop offset="0.6" stopColor="#FBBC05" />
          <stop offset="1" stopColor="#EA4335" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [billingOpen, setBillingOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2500);
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 820,
          background: "#fff",
          borderRadius: 12,
          border: "0.5px solid #e5e7eb",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        }}
      >
        <Navbar />

        {confirmed && (
          <div
            style={{
              background: "#ecfdf5",
              borderBottom: `1px solid ${GREEN}`,
              padding: "10px 28px",
              fontSize: 13,
              color: GREEN,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <LockIcon /> Payment confirmed successfully!
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: 28,
            padding: "28px 32px",
          }}
        >
          {/* Left: Payment Form */}
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 500, color: "#111827", marginBottom: 20 }}>
              Payment
            </h1>

            {/* Credit / Debit Card */}
            <RadioOption
              value="card"
              selected={paymentMethod}
              label="Credit / Debit Card"
              onChange={setPaymentMethod}
            />
            {paymentMethod === "card" && (
              <CardPaymentPanel details={cardDetails} onChange={setCardDetails} />
            )}

            {/* UPI */}
            <RadioOption
              value="upi"
              selected={paymentMethod}
              label="UPI"
              onChange={setPaymentMethod}
            />
            {paymentMethod === "upi" && <UpiPanel />}

            {/* Wallet */}
            <RadioOption
              value="wallet"
              selected={paymentMethod}
              label="Wallet"
              onChange={setPaymentMethod}
            />
            {paymentMethod === "wallet" && <WalletPanel />}

            {/* Billing Address */}
            <button
              onClick={() => setBillingOpen((o) => !o)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
                color: "#6b7280",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginBottom: 14,
              }}
            >
              <input
                type="radio"
                readOnly
                style={{ accentColor: GREEN, width: 16, height: 16 }}
              />
              Billing Address (optional)
              <span style={{ marginLeft: "auto", transition: "transform 0.2s", transform: billingOpen ? "rotate(180deg)" : "none" }}>
                <ChevronDownGrayIcon />
              </span>
            </button>

            {billingOpen && (
              <div style={{ marginBottom: 14 }}>
                <FieldGroup label="Street Address">
                  <StyledInput placeholder="123 Main Street" />
                </FieldGroup>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <FieldGroup label="City">
                    <StyledInput placeholder="Karachi" />
                  </FieldGroup>
                  <FieldGroup label="Postal Code">
                    <StyledInput placeholder="75500" />
                  </FieldGroup>
                </div>
              </div>
            )}

            {/* SSL Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: "#6b7280",
                background: "#f9fafb",
                borderRadius: 8,
                padding: "9px 14px",
                border: "0.5px solid #e5e7eb",
                marginBottom: 16,
              }}
            >
              <LockIcon />
              SSL Secure Payment (100% Safe Transaction)
            </div>

            {/* Back */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 13,
                color: GREEN,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontWeight: 500,
              }}
            >
              <ArrowLeftIcon /> Back
            </button>
          </div>

          {/* Right: Summary */}
          <SummaryCard onConfirm={handleConfirm} />
        </div>

        <Footer />
      </div>
    </div>
  );
}