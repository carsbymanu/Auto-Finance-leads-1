import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { ShieldCheck, Car, Phone, CheckCircle2, ArrowRight, ArrowLeft, Lock, MapPin, BriefcaseBusiness, Home, FileSignature, Sparkles, Building2, Star, Zap } from "lucide-react";
import "./styles.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/meednzka";
const steps = ["Contact", "Identity", "Address", "Employment", "Budget", "Vehicle", "Consent"];

function App() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const progress = Math.round(((step + 1) / steps.length) * 100);

  const updateField = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));
  const validateStep = () => {
  switch (step) {
    case 0:
      return (
        formData.firstName &&
        formData.lastName &&
        formData.phone &&
        formData.email
      );

    case 1:
      return formData.dateOfBirth;

    case 2:
      return (
        formData.homeAddress &&
        formData.city &&
        formData.province &&
        formData.postalCode &&
        formData.timeAtAddress
      );

    case 3:
      return (
        formData.employmentStatus &&
        formData.employer &&
        formData.timeEmployed &&
        formData.monthlyIncome
      );

    case 4:
      return (
        formData.housingStatus &&
        formData.housingPayment &&
        formData.downPayment
      );

    case 5:
      return (
        formData.vehicleType &&
        formData.tradeIn
      );

    case 6:
      return (
        formData.signature &&
        formData.contactConsent &&
        formData.creditConsent
      );

    default:
      return true;
  }
};

const nextStep = () => {
  if (validateStep()) {
    setStep(step + 1);
  } else {
    alert("Please complete all required fields before continuing.");
  }
};
  const prevStep = () => step > 0 && setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          source: "Auto Finance Website Lead",
          submittedAt: new Date().toISOString(),
          ...formData,
        }),
      });
      if (response.ok) setSubmitted(true);
      else alert("Submission failed. Please try again or call 437-224-0801.");
    } catch {
      alert("Submission failed. Please try again or call 437-224-0801.");
    }
  };

  return (
    <div className="page">
      <div className="background">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="grid-bg" />
      </div>

      <nav className="nav">
        <div className="brand-wrap">
          <div className="logo"><Zap size={22} /></div>
          <div>
            <p className="brand">I AM Approved</p>
            <p className="tagline">Easy Auto Finance</p>
          </div>
        </div>
        <a href="tel:+14372240801" className="call-link"><Phone size={16} /> Call now</a>
      </nav>

      <main className="main">
        <motion.section initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hero">
          <div className="pill"><Sparkles size={16} /> Private, fast, lender-style application</div>
          <h1>Flexible Auto Financing For All Credit Situations.</h1>
          <p className="hero-text">New credit, rebuilding credit, self-employed, or established credit — explore financing options designed around your situation.</p>

          <div className="feature-grid">
            {[
              { icon: ShieldCheck, label: "Secure consent" },
              { icon: Building2, label: "Lender-ready info" },
              { icon: Star, label: "Premium experience" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="feature-card"><Icon size={24} /><p>{label}</p></div>
            ))}
          </div>

          <div className="trust-row">
            <span><CheckCircle2 size={17} /> No long boring form</span>
            <span><CheckCircle2 size={17} /> All credit situations welcome</span>
            <span><CheckCircle2 size={17} /> Fast pre-qualification</span>
            <span><CheckCircle2 size={17} /> No pressure. No obligation.</span>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="form-card">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="progress-head">
                <div><strong>{steps[step]}</strong><p>Step {step + 1} of {steps.length}</p></div>
                <span>{progress}%</span>
              </div>
              <div className="progress-bar"><div style={{ width: `${progress}%` }} /></div>

              <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="step-box">
                {step === 0 && <ContactStep formData={formData} updateField={updateField} />}
                {step === 1 && <IdentityStep formData={formData} updateField={updateField} />}
                {step === 2 && <AddressStep formData={formData} updateField={updateField} />}
                {step === 3 && <EmploymentStep formData={formData} updateField={updateField} />}
                {step === 4 && <BudgetStep formData={formData} updateField={updateField} />}
                {step === 5 && <VehicleStep formData={formData} updateField={updateField} />}
                {step === 6 && <ConsentStep formData={formData} updateField={updateField} />}
              </motion.div>

              <div className="buttons">
                {step > 0 && <button type="button" className="btn secondary" onClick={prevStep}><ArrowLeft size={18} /> Back</button>}
                {step < steps.length - 1 ? <button type="button" className="btn primary" onClick={nextStep}>Continue <ArrowRight size={18} /></button> : <button type="submit" className="btn primary">Submit Application</button>}
              </div>
            </form>
          ) : (
            <div className="success"><CheckCircle2 size={70} /><h2>Application Received</h2><p>Thanks. A finance specialist will contact you shortly.</p><a href="tel:+14372240801" className="btn primary">Call Now</a></div>
          )}
        </motion.section>
      </main>
    </div>
  );
}

function Field({ label, children }) { return <label className="field"><span>{label}</span>{children}</label>; }
const provinces = ["Ontario", "Manitoba", "Alberta", "British Columbia", "Saskatchewan", "Quebec", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador", "Prince Edward Island"];

function ContactStep({ formData, updateField }) {
  return <div><h2>Let’s start with you</h2><p className="muted">Your basic contact details.</p><div className="fields"><div className="two"><Field label="First name"><input required value={formData.firstName || ""} onChange={(e) => updateField("firstName", e.target.value)} placeholder="First name" /></Field><Field label="Last name"><input required value={formData.lastName || ""} onChange={(e) => updateField("lastName", e.target.value)} placeholder="Last name" /></Field></div><Field label="Phone number"><input required type="tel" value={formData.phone || ""} onChange={(e) => updateField("phone", e.target.value)} placeholder="Phone number" /></Field><Field label="Email address"><input required type="email" value={formData.email || ""} onChange={(e) => updateField("email", e.target.value)} placeholder="Email address" /></Field></div></div>;
}
function IdentityStep({ formData, updateField }) {
  return <div><div className="title-row"><FileSignature /><h2>Identity</h2></div><p className="muted">Just your date of birth. No SIN. No driver’s licence.</p><div className="fields"><Field label="Date of birth"><input required type="date" value={formData.dateOfBirth || ""} onChange={(e) => updateField("dateOfBirth", e.target.value)} /></Field></div></div>;
}
function AddressStep({ formData, updateField }) {
  return <div><div className="title-row"><MapPin /><h2>Address</h2></div><p className="muted">Canadian address details for the application.</p><div className="fields"><Field label="Current home address"><input required value={formData.homeAddress || ""} onChange={(e) => updateField("homeAddress", e.target.value)} autoComplete="street-address" placeholder="Start typing your address" /></Field><div className="two"><Field label="City"><input required value={formData.city || ""} onChange={(e) => updateField("city", e.target.value)} placeholder="City" /></Field><Field label="Province"><select required value={formData.province || ""} onChange={(e) => updateField("province", e.target.value)}><option value="">Select province</option>{provinces.map(p => <option key={p}>{p}</option>)}</select></Field></div><div className="two"><Field label="Postal code"><input required value={formData.postalCode || ""} onChange={(e) => updateField("postalCode", e.target.value)} placeholder="A1A 1A1" /></Field><Field label="Time at address"><select required value={formData.timeAtAddress || ""} onChange={(e) => updateField("timeAtAddress", e.target.value)}><option value="">Select</option><option>Less than 6 months</option><option>6-12 months</option><option>1-2 years</option><option>2+ years</option></select></Field></div></div></div>;
}
function EmploymentStep({ formData, updateField }) {
  return <div><div className="title-row"><BriefcaseBusiness /><h2>Employment</h2></div><p className="muted">Helps understand lender fit.</p><div className="fields"><Field label="Employment status"><select required value={formData.employmentStatus || ""} onChange={(e) => updateField("employmentStatus", e.target.value)}><option value="">Select</option><option>Full-time</option><option>Part-time</option><option>Self-employed</option><option>Student</option><option>Retired</option><option>Other</option></select></Field><Field label="Employer name"><input required value={formData.employer || ""} onChange={(e) => updateField("employer", e.target.value)} placeholder="Employer or business name" /></Field><div className="two"><Field label="Job title"><input value={formData.jobTitle || ""} onChange={(e) => updateField("jobTitle", e.target.value)} placeholder="Position" /></Field><Field label="Time employed"><select required value={formData.timeEmployed || ""} onChange={(e) => updateField("timeEmployed", e.target.value)}><option value="">Select</option><option>Less than 3 months</option><option>3-6 months</option><option>6-12 months</option><option>1-2 years</option><option>2+ years</option></select></Field></div><Field label="Monthly income before tax"><input required value={formData.monthlyIncome || ""} onChange={(e) => updateField("monthlyIncome", e.target.value)} placeholder="$4,500" /></Field></div></div>;
}
function BudgetStep({ formData, updateField }) {
  return <div><div className="title-row"><Home /><h2>Budget</h2></div><p className="muted">Payment comfort and housing info.</p><div className="fields"><div className="two"><Field label="Rent or own"><select required value={formData.housingStatus || ""} onChange={(e) => updateField("housingStatus", e.target.value)}><option value="">Select</option><option>Rent</option><option>Own</option><option>Live with family</option></select></Field><Field label="Monthly housing payment"><input required value={formData.housingPayment || ""} onChange={(e) => updateField("housingPayment", e.target.value)} placeholder="$1,800" /></Field></div><Field label="Preferred monthly car payment"><input value={formData.preferredPayment || ""} onChange={(e) => updateField("preferredPayment", e.target.value)} placeholder="$500/month" /></Field><Field label="Down payment available"><select required value={formData.downPayment || ""} onChange={(e) => updateField("downPayment", e.target.value)}><option value="">Select</option><option>$0</option><option>$500 - $1,000</option><option>$1,000 - $2,500</option><option>$2,500 - $5,000</option><option>$5,000+</option></select></Field></div></div>;
}
function VehicleStep({ formData, updateField }) {
  return <div><div className="title-row"><Car /><h2>Vehicle</h2></div><p className="muted">What are they looking for?</p><div className="fields"><Field label="Vehicle type"><select required value={formData.vehicleType || ""} onChange={(e) => updateField("vehicleType", e.target.value)}><option value="">Select</option><option>Sedan</option><option>SUV</option><option>Truck</option><option>Van</option><option>No preference</option></select></Field><Field label="Do you have a trade-in?"><select required value={formData.tradeIn || ""} onChange={(e) => updateField("tradeIn", e.target.value)}><option value="">Select</option><option>Yes</option><option>No</option><option>Maybe</option></select></Field><Field label="Vehicle notes"><textarea value={formData.vehicleNotes || ""} onChange={(e) => updateField("vehicleNotes", e.target.value)} rows="4" placeholder="Example: 7-seater SUV, AWD, under $600/month" /></Field></div></div>;
}
function ConsentStep({ formData, updateField }) {
  return <div><div className="title-row"><Lock /><h2>Consent</h2></div><p className="muted">Final step before submission.</p><div className="fields"><Field label="Electronic signature"><input required value={formData.signature || ""} onChange={(e) => updateField("signature", e.target.value)} placeholder="Type your full legal name" /></Field><label className="check"><input required checked={!!formData.contactConsent} onChange={(e) => updateField("contactConsent", e.target.checked)} type="checkbox" />I agree to be contacted by phone, text, or email about my auto financing request. Message/data rates may apply.</label><label className="check"><input required checked={!!formData.creditConsent} onChange={(e) => updateField("creditConsent", e.target.checked)} type="checkbox" />I authorize Approved by Manu and its lending partners to collect, use, and disclose my personal information for the purpose of reviewing my auto financing request. I understand a full credit application may require authorization for a credit bureau review with Equifax, TransUnion, or another credit reporting agency. Submission does not guarantee approval, rate, term, payment, or vehicle availability.</label></div></div>;
}

createRoot(document.getElementById("root")).render(<App />);
