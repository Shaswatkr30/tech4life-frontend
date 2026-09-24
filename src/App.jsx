import AdminLogin from "./AdminLogin.jsx";
import AdminDashboard from "./AdminDashboard.jsx";

import { useEffect, useState } from "react";

import {
  Activity,
  ArrowRight,
  BedDouble,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Droplets,
  HeartPulse,
  Hospital,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Trash2,
  UserPlus,
  Wrench,
  X,
} from "lucide-react";

import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";


// ============================================================
// COMMON HELPERS
// ============================================================

async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      "Something went wrong. Please try again.";

    throw new Error(message);
  }

  return data;

  
}


function getToken() {
  return localStorage.getItem("tech4life_token");
}


function authHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function formatUpdatedAt(dateString) {
  if (!dateString) {
    return "Update time unavailable";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Update time unavailable";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// ============================================================
// NAVBAR
// ============================================================

function Navbar() {
  const navigate = useNavigate();

  const token = getToken();

  const handleLogout = () => {
    localStorage.removeItem("tech4life_token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        <div className="logo-icon">
          <HeartPulse size={24} />
        </div>

        <div className="logo-text">
          <h2>Tech4Life</h2>
          <span>Healthcare Network</span>
        </div>
      </div>


      {/* Navigation */}
      <div className="navbar-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/resources"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Resources
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          About
        </NavLink>

        {token ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Dashboard
            </NavLink>

            <button
              className="nav-logout"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="nav-register"
            >
              <UserPlus size={16} />
              Register Hospital
            </NavLink>
          </>
        )}

        {/* Admin */}
        <NavLink
          to="/admin/login"
          className={({ isActive }) =>
            isActive
              ? "nav-admin active"
              : "nav-admin"
          }
        >
          <ShieldCheck size={16} />
          Admin Portal
        </NavLink>

      </div>

    </nav>
  );
}


// ============================================================
// HOME PAGE
// ============================================================

function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-badge">
            <Activity size={16} />
            Healthcare Resource Network
          </div>

          <h1>
            Healthcare resources,
            <span> connected.</span>
          </h1>

          <p>
            Find blood, ICU beds, organs and medical equipment reported by
            registered hospitals through one centralized platform.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button large"
              onClick={() => navigate("/resources")}
            >
              Find Resources
              <ArrowRight size={19} />
            </button>

            <button
              className="secondary-button large"
              onClick={() => navigate("/register")}
            >
              Register Hospital
            </button>
          </div>

          <div className="hero-trust">
            <div>
              <CheckCircle2 size={17} />
              Registered hospitals
            </div>

            <div>
              <ShieldCheck size={17} />
              Secure hospital accounts
            </div>

            <div>
              <Clock3 size={17} />
              Resource updates
            </div>
          </div>
        </div>
      </section>


      <section className="stats-section">
        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon blue">
              <Building2 />
            </div>

            <div>
              <h3>Hospitals</h3>
              <p>Registered healthcare providers</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">
              <Droplets />
            </div>

            <div>
              <h3>Blood</h3>
              <p>Blood group availability</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">
              <BedDouble />
            </div>

            <div>
              <h3>ICU Beds</h3>
              <p>Total and available beds</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <Wrench />
            </div>

            <div>
              <h3>Equipment</h3>
              <p>Medical equipment availability</p>
            </div>
          </div>

        </div>
      </section>


      <section className="features-section">
        <div className="section-heading">
          <span>PLATFORM</span>
          <h2>Everything in one place</h2>
          <p>
            Tech4Life brings hospital resource information together in a
            simple and searchable interface.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <Droplets className="feature-icon red-text" />
            <h3>Blood Availability</h3>
            <p>
              Search hospitals and see reported blood groups and available
              units.
            </p>
          </div>

          <div className="feature-card">
            <BedDouble className="feature-icon purple-text" />
            <h3>ICU Beds</h3>
            <p>
              View total ICU beds and currently available beds reported by
              hospitals.
            </p>
          </div>

          <div className="feature-card">
            <HeartPulse className="feature-icon pink-text" />
            <h3>Organ Availability</h3>
            <p>
              View organ availability information provided by registered
              hospitals.
            </p>
          </div>

          <div className="feature-card">
            <Wrench className="feature-icon orange-text" />
            <h3>Medical Equipment</h3>
            <p>
              Check important medical equipment and available quantities.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}


// ============================================================
// RESOURCES PAGE
// ============================================================

function Resources() {
  const [hospitals, setHospitals] = useState([]);
  const [blood, setBlood] = useState([]);
  const [icu, setIcu] = useState([]);
  const [organs, setOrgans] = useState([]);
  const [equipment, setEquipment] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const [
        hospitalsRes,
        bloodRes,
        icuRes,
        organsRes,
        equipmentRes
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/api/hospitals/`),
        fetch(`${API_BASE_URL}/api/blood/public`),
        fetch(`${API_BASE_URL}/api/icu/public`),
        fetch(`${API_BASE_URL}/api/organs/public`),
        fetch(`${API_BASE_URL}/api/equipment/public`)
      ]);

      const hospitalsData = await hospitalsRes.json();
      const bloodData = await bloodRes.json();
      const icuData = await icuRes.json();
      const organsData = await organsRes.json();
      const equipmentData = await equipmentRes.json();

      setHospitals(hospitalsData);
      setBlood(bloodData);
      setIcu(icuData);
      setOrgans(organsData);
      setEquipment(equipmentData);

    } catch (error) {
      console.error("Resource loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEARCH ONLY RESOURCES
  // =====================================================

  const query = search.trim().toLowerCase();

  const resourceMatchesHospital = (hospital) => {
    if (!query) return true;

    const hospitalBlood = blood.filter(
      item => item.hospital_id === hospital.id
    );

    const hospitalICU = icu.filter(
      item => item.hospital_id === hospital.id
    );

    const hospitalOrgans = organs.filter(
      item => item.hospital_id === hospital.id
    );

    const hospitalEquipment = equipment.filter(
      item => item.hospital_id === hospital.id
    );

    // Blood search
    const bloodMatch = hospitalBlood.some(item =>
      query === "blood" ||
      item.blood_group.toLowerCase().includes(query)
    );

    // ICU search
    const icuMatch = hospitalICU.some(item =>
      query === "icu" ||
      query === "beds" ||
      query === "icu beds"
    );

    // Organ search
    const organMatch = hospitalOrgans.some(item =>
      query === "organ" ||
      item.organ_name.toLowerCase().includes(query)
    );

    // Equipment search
    const equipmentMatch = hospitalEquipment.some(item =>
      query === "equipment" ||
      item.equipment_name.toLowerCase().includes(query)
    );

    return (
      bloodMatch ||
      icuMatch ||
      organMatch ||
      equipmentMatch
    );
  };

  const filteredHospitals = hospitals.filter(resourceMatchesHospital);

  if (loading) {
    return (
      <div className="page">
        <div className="loading-box">
          Loading healthcare resources...
        </div>
      </div>
    );
  }

  return (
    <div className="page resources-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="resources-header">

        <div>
          <h1>Healthcare Resources</h1>

          <p>
            Search blood, organs, ICU beds and medical equipment
            available at registered hospitals.
          </p>
        </div>

      </div>


      {/* =================================================
          RESOURCE SEARCH
      ================================================= */}

      <div className="resource-search-wrapper">

        <div className="resource-search">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blood, A+, kidney, ICU, ventilator..."
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}

        </div>

        <div className="search-hints">

          <button onClick={() => setSearch("blood")}>
            🩸 Blood
          </button>

          <button onClick={() => setSearch("icu")}>
            🛏️ ICU
          </button>

          <button onClick={() => setSearch("organ")}>
            🫀 Organs
          </button>

          <button onClick={() => setSearch("equipment")}>
            🛠️ Equipment
          </button>

          <button onClick={() => setSearch("A+")}>
            A+
          </button>

          <button onClick={() => setSearch("kidney")}>
            Kidney
          </button>

          <button onClick={() => setSearch("ventilator")}>
            Ventilator
          </button>

        </div>

      </div>


      {/* =================================================
          SEARCH RESULT
      ================================================= */}

      {query && (
        <div className="search-result-text">

          Showing hospitals with resource:
          <strong> {search}</strong>

        </div>
      )}


      {/* =================================================
          HOSPITAL CARDS
      ================================================= */}

      <div className="hospital-resource-grid">

        {filteredHospitals.map((hospital) => {

          const hospitalBlood = blood.filter(
            item => item.hospital_id === hospital.id
          );

          const hospitalICU = icu.filter(
            item => item.hospital_id === hospital.id
          );

          const hospitalOrgans = organs.filter(
            item => item.hospital_id === hospital.id
          );

          const hospitalEquipment = equipment.filter(
            item => item.hospital_id === hospital.id
          );

          return (

            <div
              className="hospital-resource-card"
              key={hospital.id}
            >

              {/* ================================
                  HOSPITAL HEADER
              ================================= */}

              <div className="hospital-card-header">

                <div>

                  <h2>
                    🏥 {hospital.name}
                  </h2>

                  <p>
                    📍 {hospital.city}, {hospital.state}
                  </p>

                </div>

                <span className="hospital-id">
                  ID: {hospital.id}
                </span>

              </div>


              {/* ================================
                  CONTACT
              ================================= */}

              <div className="hospital-contact">

                {hospital.phone && (
                  <span>
                    📞 {hospital.phone}
                  </span>
                )}

                {hospital.email && (
                  <span>
                    ✉️ {hospital.email}
                  </span>
                )}

              </div>


              {/* ================================
                  BLOOD
              ================================= */}

              <div className="resource-section">

                <h3>
                  🩸 Blood Availability
                </h3>

                {hospitalBlood.length === 0 ? (

                  <p className="no-resource">
                    No blood information
                  </p>

                ) : (

                  <div className="resource-items">

                    {hospitalBlood.map((item) => (

                      <div className="resource-mini-card" key={item.id}>

  <strong>
    {item.blood_group}
  </strong>

  <span>
    {item.units_available} units
  </span>

  <small className="resource-updated">
    🕒 Updated: {formatUpdatedAt(item.updated_at)}
  </small>

</div>

                    ))}

                  </div>

                )}

              </div>


              {/* ================================
                  ICU
              ================================= */}

              <div className="resource-section">

                <h3>
                  🛏️ ICU Beds
                </h3>

                {hospitalICU.length === 0 ? (

                  <p className="no-resource">
                    No ICU information
                  </p>

                ) : (

                  hospitalICU.map((item) => (

                   <div
  className="icu-box"
  key={item.id}
>

  <span>
    Total Beds:
    <strong>
      {item.total_beds}
    </strong>
  </span>

  <span>
    Available:
    <strong>
      {item.available_beds}
    </strong>
  </span>

  <small className="resource-updated">
    🕒 Updated: {formatUpdatedAt(item.updated_at)}
  </small>

</div>

                  ))

                )}

              </div>


              {/* ================================
                  ORGANS
              ================================= */}

              <div className="resource-section">

                <h3>
                  🫀 Organ Availability
                </h3>

                {hospitalOrgans.length === 0 ? (

                  <p className="no-resource">
                    No organ information
                  </p>

                ) : (

                  <div className="resource-items">

                    {hospitalOrgans.map((item) => (

                      <div
  className="resource-mini-card"
  key={item.id}
>

  <strong>
    {item.organ_name}
  </strong>

  <span
    className={
      item.available
        ? "available"
        : "not-available"
    }
  >
    {item.available
      ? "Available"
      : "Not Available"}
  </span>

  <small className="resource-updated">
    🕒 Updated: {formatUpdatedAt(item.updated_at)}
  </small>

</div>

                    ))}

                  </div>

                )}

              </div>


              {/* ================================
                  EQUIPMENT
              ================================= */}

              <div className="resource-section">

                <h3>
                  🛠️ Medical Equipment
                </h3>

                {hospitalEquipment.length === 0 ? (

                  <p className="no-resource">
                    No equipment information
                  </p>

                ) : (

                  <div className="resource-items">

                    {hospitalEquipment.map((item) => (

                     <div
  className="resource-mini-card"
  key={item.id}
>

  <strong>
    {item.equipment_name}
  </strong>

  <span>
    {item.available_quantity}
    {" / "}
    {item.total_quantity} available
  </span>

  <small className="resource-updated">
    🕒 Updated: {formatUpdatedAt(item.updated_at)}
  </small>

</div>

                    ))}

                  </div>

                )}

              </div>

            </div>

          );

        })}

      </div>


      {/* =================================================
          NO RESULTS
      ================================================= */}

      {filteredHospitals.length === 0 && (

        <div className="no-results">

          <div className="no-results-icon">
            🔎
          </div>

          <h2>
            No resource found
          </h2>

          <p>
            Try searching for blood, ICU, organ,
            equipment, A+, kidney, ventilator, etc.
          </p>

          <button
            onClick={() => setSearch("")}
          >
            Show All Resources
          </button>

        </div>

      )}

    </div>
  );
}


// ============================================================
// HOSPITAL CARD
// ============================================================

function HospitalCard({ hospital }) {
  return (
    <article className="hospital-card">

      <div className="hospital-card-header">

        <div className="hospital-title-area">

          <div className="hospital-icon">
            <Hospital size={25} />
          </div>

          <div>
            <h2>{hospital.name}</h2>

            <p className="hospital-location">
              <MapPin size={15} />
              {hospital.city}, {hospital.state}
            </p>
          </div>

        </div>

        <span className="hospital-id">
          ID #{hospital.id}
        </span>

      </div>


      <div className="hospital-contact">

        {hospital.phone && (
          <a href={`tel:${hospital.phone}`}>
            <Phone size={16} />
            {hospital.phone}
          </a>
        )}

        {hospital.email && (
          <a href={`mailto:${hospital.email}`}>
            <Mail size={16} />
            {hospital.email}
          </a>
        )}

      </div>


      <div className="hospital-address">
        <MapPin size={15} />
        <span>{hospital.address}</span>
      </div>


      <div className="resource-section">

        <div className="resource-section-title">
          <Droplets size={19} />
          <span>Blood Availability</span>
        </div>

        {hospital.blood.length === 0 ? (
          <div className="no-resource">
            No blood information
          </div>
        ) : (
          <div className="mini-grid">

            {hospital.blood.map((item) => (
              <div className="mini-card blood-card" key={item.id}>
                <strong>{item.blood_group}</strong>
                <span>{item.units_available} units</span>
              </div>
            ))}

          </div>
        )}

      </div>


      <div className="resource-section">

        <div className="resource-section-title">
          <BedDouble size={19} />
          <span>ICU Beds</span>
        </div>

        {hospital.icu.length === 0 ? (
          <div className="no-resource">
            No ICU information
          </div>
        ) : (
          hospital.icu.map((item) => (
            <div className="icu-card" key={item.id}>
              <div>
                <span>Total Beds</span>
                <strong>{item.total_beds}</strong>
              </div>

              <div>
                <span>Available</span>
                <strong className="available-text">
                  {item.available_beds}
                </strong>
              </div>
            </div>
          ))
        )}

      </div>


      <div className="resource-section">

        <div className="resource-section-title">
          <HeartPulse size={19} />
          <span>Organ Availability</span>
        </div>

        {hospital.organs.length === 0 ? (
          <div className="no-resource">
            No organ information
          </div>
        ) : (
          <div className="mini-grid">

            {hospital.organs.map((item) => (
              <div className="mini-card organ-card" key={item.id}>
                <strong>{item.organ_name}</strong>

                <span
                  className={
                    item.available
                      ? "status-available"
                      : "status-unavailable"
                  }
                >
                  {item.available ? "Available" : "Not available"}
                </span>
              </div>
            ))}

          </div>
        )}

      </div>


      <div className="resource-section">

        <div className="resource-section-title">
          <Wrench size={19} />
          <span>Medical Equipment</span>
        </div>

        {hospital.equipment.length === 0 ? (
          <div className="no-resource">
            No equipment information
          </div>
        ) : (
          <div className="equipment-list">

            {hospital.equipment.map((item) => (
              <div className="equipment-row" key={item.id}>

                <div>
                  <strong>{item.equipment_name}</strong>
                  <span>
                    {item.total_quantity} total
                  </span>
                </div>

                <div className="equipment-available">
                  {item.available_quantity} available
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </article>
  );
}


// ============================================================
// LOGIN
// ============================================================

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  function updateField(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await apiRequest(`${API_BASE_URL}apihospitals/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      localStorage.setItem("tech4life_token", data.access_token);

      navigate("/dashboard");
      window.location.reload();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          <LogIn size={27} />
        </div>

        <div className="auth-heading">
          <span>HOSPITAL PORTAL</span>
          <h1>Hospital Login</h1>
          <p>Login to manage your hospital resources.</p>
        </div>


        {error && (
          <div className="form-error">
            {error}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <Mail size={18} />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="hospital@example.com"
                required
              />
            </div>
          </div>


          <div className="form-group">
            <label>Password</label>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={updateField}
              placeholder="Enter password"
              required
            />
          </div>


          <button
            className="primary-button full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && <ArrowRight size={18} />}
          </button>

        </form>


        <p className="auth-bottom">
          Don't have a hospital account?

          <Link to="/register">
            Register Hospital
          </Link>
        </p>

      </div>

    </main>
  );
}


// ============================================================
// REGISTER
// ============================================================

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    password: "",
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  function updateField(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = {
        name: form.name,
        address: form.address,
        city: form.city,
        state: form.state,
        phone: form.phone || null,
        email: form.email,
        password: form.password,
        latitude: form.latitude
          ? Number(form.latitude)
          : null,
        longitude: form.longitude
          ? Number(form.longitude)
          : null,
      };

      await apiRequest(`${API_BASE_URL}apihospitals/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setSuccess(
        "Hospital registered successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="auth-page">

      <div className="register-card">

        <div className="auth-icon">
          <UserPlus size={27} />
        </div>

        <div className="auth-heading">
          <span>JOIN TECH4LIFE</span>
          <h1>Register Hospital</h1>
          <p>
            Create a secure hospital account and manage your resources.
          </p>
        </div>


        {error && (
          <div className="form-error">
            {error}
          </div>
        )}


        {success && (
          <div className="form-success">
            <CheckCircle2 size={18} />
            {success}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <div className="form-section-title">
            <Building2 size={18} />
            Hospital Information
          </div>


          <div className="form-grid">

            <div className="form-group">
              <label>Hospital Name *</label>

              <input
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="City Care Hospital"
                required
              />
            </div>


            <div className="form-group">
              <label>Phone Number</label>

              <input
                name="phone"
                value={form.phone}
                onChange={updateField}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>


            <div className="form-group full-width">
              <label>Hospital Address *</label>

              <input
                name="address"
                value={form.address}
                onChange={updateField}
                placeholder="Complete hospital address"
                required
              />
            </div>


            <div className="form-group">
              <label>City *</label>

              <input
                name="city"
                value={form.city}
                onChange={updateField}
                placeholder="Dehradun"
                required
              />
            </div>


            <div className="form-group">
              <label>State *</label>

              <input
                name="state"
                value={form.state}
                onChange={updateField}
                placeholder="Uttarakhand"
                required
              />
            </div>

          </div>


          <div className="form-section-title">
            <ShieldCheck size={18} />
            Account Security
          </div>


          <div className="form-grid">

            <div className="form-group">
              <label>Email Address *</label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="hospital@example.com"
                required
              />
            </div>


            <div className="form-group">
              <label>Password *</label>

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={updateField}
                placeholder="Create password"
                required
              />
            </div>

          </div>


          <div className="form-section-title optional-title">
            <MapPin size={18} />
            Location Coordinates
            <span>Optional</span>
          </div>


          <div className="form-grid">

            <div className="form-group">
              <label>Latitude</label>

              <input
                name="latitude"
                value={form.latitude}
                onChange={updateField}
                placeholder="30.3165"
              />
            </div>


            <div className="form-group">
              <label>Longitude</label>

              <input
                name="longitude"
                value={form.longitude}
                onChange={updateField}
                placeholder="78.0322"
              />
            </div>

          </div>


          <button
            className="primary-button full register-submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register Hospital"}
            {!loading && <ArrowRight size={18} />}
          </button>

        </form>


        <p className="auth-bottom">
          Already registered?

          <Link to="/login">
            Login here
          </Link>
        </p>

      </div>

    </main>
  );
}


// ============================================================
// DASHBOARD
// ============================================================

function Dashboard() {
  const navigate = useNavigate();

  const [hospital, setHospital] = useState(null);

  const [blood, setBlood] = useState([]);
  const [icu, setIcu] = useState([]);
  const [organs, setOrgans] = useState([]);
  const [equipment, setEquipment] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    loadDashboard();
  }, []);


  async function loadDashboard() {
    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        hospitalData,
        bloodData,
        icuData,
        organData,
        equipmentData,
      ] = await Promise.all([
        apiRequest(`${API_BASE_URL}apihospitals/me`, { headers }),
        apiRequest(`${API_BASE_URL}apiblood/my`, { headers }),
        apiRequest(`${API_BASE_URL}apiicu/my`, { headers }),
        apiRequest(`${API_BASE_URL}apiorgans/my`, { headers }),
        apiRequest(`${API_BASE_URL}apiequipment/my`, { headers }),
      ]);

      setHospital(hospitalData);
      setBlood(bloodData || []);
      setIcu(icuData || []);
      setOrgans(organData || []);
      setEquipment(equipmentData || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  async function deleteHospital() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hospital account? All its resources will also be deleted."
    );

    if (!confirmed) return;

    try {
      await apiRequest(`${API_BASE_URL}apihospitals/delete`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      localStorage.removeItem("tech4life_token");

      alert("Hospital account deleted successfully.");

      navigate("/");
      window.location.reload();

    } catch (err) {
      alert(err.message);
    }
  }


  if (loading) {
    return (
      <main className="dashboard-page">
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </main>
    );
  }


  if (error) {
    return (
      <main className="dashboard-page">
        <div className="error-box">
          <strong>Dashboard error</strong>
          <p>{error}</p>

          <button
            className="primary-button"
            onClick={() => {
              localStorage.removeItem("tech4life_token");
              navigate("/login");
            }}
          >
            Login Again
          </button>
        </div>
      </main>
    );
  }


  return (
    <main className="dashboard-page">

      <section className="dashboard-top">

        <div>
          <div className="page-eyebrow">
            <Activity size={17} />
            HOSPITAL MANAGEMENT
          </div>

          <h1>{hospital?.name}</h1>

          <p>
            Manage your hospital information and available resources.
          </p>
        </div>

        <div className="dashboard-status">
          <span></span>
          Account Active
        </div>

      </section>


      <section className="hospital-profile">

        <div className="profile-icon">
          <Hospital size={31} />
        </div>

        <div className="profile-main">
          <h2>{hospital?.name}</h2>

          <div className="profile-details">

            <span>
              <Mail size={15} />
              {hospital?.email}
            </span>

            <span>
              <Phone size={15} />
              {hospital?.phone || "Phone not added"}
            </span>

            <span>
              <MapPin size={15} />
              {hospital?.city}, {hospital?.state}
            </span>

          </div>
        </div>

      </section>


      <div className="dashboard-stats">

        <DashboardStat
          icon={<Droplets />}
          title="Blood Groups"
          value={blood.length}
          className="red"
        />

        <DashboardStat
          icon={<BedDouble />}
          title="ICU Records"
          value={icu.length}
          className="purple"
        />

        <DashboardStat
          icon={<HeartPulse />}
          title="Organs"
          value={organs.length}
          className="pink"
        />

        <DashboardStat
          icon={<Wrench />}
          title="Equipment"
          value={equipment.length}
          className="orange"
        />

      </div>


      <ResourceManager
        title="Blood Availability"
        icon={<Droplets />}
        type="blood"
        items={blood}
        setItems={setBlood}
      />


      <ResourceManager
        title="ICU Beds"
        icon={<BedDouble />}
        type="icu"
        items={icu}
        setItems={setIcu}
      />


      <ResourceManager
        title="Organ Availability"
        icon={<HeartPulse />}
        type="organ"
        items={organs}
        setItems={setOrgans}
      />


      <ResourceManager
        title="Medical Equipment"
        icon={<Wrench />}
        type="equipment"
        items={equipment}
        setItems={setEquipment}
      />


      <section className="danger-zone">

        <div>
          <h3>Delete Hospital Account</h3>

          <p>
            Permanently delete your hospital account and all associated
            resource records.
          </p>
        </div>

        <button
          className="delete-hospital-button"
          onClick={deleteHospital}
        >
          <Trash2 size={18} />
          Delete Hospital
        </button>

      </section>

    </main>
  );
}


// ============================================================
// DASHBOARD STAT
// ============================================================

function DashboardStat({
  icon,
  title,
  value,
  className,
}) {
  return (
    <div className="dashboard-stat">

      <div className={`dashboard-stat-icon ${className}`}>
        {icon}
      </div>

      <div>
        <strong>{value}</strong>
        <span>{title}</span>
      </div>

    </div>
  );
}


// ============================================================
// RESOURCE MANAGER
// ============================================================

function ResourceManager({
  title,
  icon,
  type,
  items,
  setItems,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({});

  const [saving, setSaving] = useState(false);


  function resetForm() {
    if (type === "blood") {
      setForm({
        blood_group: "",
        units_available: "",
      });
    }

    if (type === "icu") {
      setForm({
        total_beds: "",
        available_beds: "",
      });
    }

    if (type === "organ") {
      setForm({
        organ_name: "",
        available: true,
      });
    }

    if (type === "equipment") {
      setForm({
        equipment_name: "",
        total_quantity: "",
        available_quantity: "",
      });
    }
  }


  function openCreate() {
    resetForm();
    setEditingId(null);
    setShowForm(true);
  }


  function openEdit(item) {
    if (type === "blood") {
      setForm({
        blood_group: item.blood_group,
        units_available: item.units_available,
      });
    }

    if (type === "icu") {
      setForm({
        total_beds: item.total_beds,
        available_beds: item.available_beds,
      });
    }

    if (type === "organ") {
      setForm({
        organ_name: item.organ_name,
        available: item.available,
      });
    }

    if (type === "equipment") {
      setForm({
        equipment_name: item.equipment_name,
        total_quantity: item.total_quantity,
        available_quantity: item.available_quantity,
      });
    }

    setEditingId(item.id);
    setShowForm(true);
  }


  function updateForm(e) {
    const { name, value, type: inputType, checked } = e.target;

    setForm({
      ...form,
      [name]: inputType === "checkbox" ? checked : value,
    });
  }


  function endpoint() {
    if (type === "blood") return "blood";
    if (type === "icu") return "icu";
    if (type === "organ") return "organs";
    return "equipment";
  }


  function createPayload() {
    if (type === "blood") {
      return {
        blood_group: form.blood_group,
        units_available: Number(form.units_available),
      };
    }

    if (type === "icu") {
      return {
        total_beds: Number(form.total_beds),
        available_beds: Number(form.available_beds),
      };
    }

    if (type === "organ") {
      return {
        organ_name: form.organ_name,
        available: form.available,
      };
    }

    return {
      equipment_name: form.equipment_name,
      total_quantity: Number(form.total_quantity),
      available_quantity: Number(form.available_quantity),
    };
  }


  async function saveResource(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const url = editingId
        ? `${API_BASE_URL}api${endpoint()}/${editingId}`
        : `${API_BASE_URL}api${endpoint()}/`;

      const method = editingId ? "PUT" : "POST";

      const data = await apiRequest(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(createPayload()),
      });

      if (editingId) {
        setItems(
          items.map((item) =>
            item.id === editingId ? data : item
          )
        );
      } else {
        setItems([...items, data]);
      }

      setShowForm(false);
      setEditingId(null);
      resetForm();

    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }


  async function deleteResource(id) {
    const confirmed = window.confirm(
      "Delete this resource?"
    );

    if (!confirmed) return;

    try {
      await apiRequest(
        `${API_BASE_URL}api${endpoint()}/${id}`,
        {
          method: "DELETE",
          headers: authHeaders(),
        }
      );

      setItems(
        items.filter((item) => item.id !== id)
      );

    } catch (err) {
      alert(err.message);
    }
  }


  return (
    <section className="manager-section">

      <div className="manager-header">

        <div className="manager-title">

          <div className={`manager-icon ${type}`}>
            {icon}
          </div>

          <div>
            <h2>{title}</h2>
            <p>Manage your {title.toLowerCase()} records.</p>
          </div>

        </div>

        <button
          className="small-primary-button"
          onClick={openCreate}
        >
          + Add
        </button>

      </div>


      {showForm && (
        <form
          className="resource-form"
          onSubmit={saveResource}
        >

          <div className="resource-form-header">
            <h3>
              {editingId ? "Update Resource" : "Add Resource"}
            </h3>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="close-form-button"
            >
              <X size={18} />
            </button>
          </div>


          {type === "blood" && (
            <div className="resource-form-grid">

              <div className="form-group">
                <label>Blood Group</label>

                <select
                  name="blood_group"
                  value={form.blood_group || ""}
                  onChange={updateForm}
                  required
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>


              <div className="form-group">
                <label>Available Units</label>

                <input
                  type="number"
                  min="0"
                  name="units_available"
                  value={form.units_available ?? ""}
                  onChange={updateForm}
                  required
                />
              </div>

            </div>
          )}


          {type === "icu" && (
            <div className="resource-form-grid">

              <div className="form-group">
                <label>Total Beds</label>

                <input
                  type="number"
                  min="0"
                  name="total_beds"
                  value={form.total_beds ?? ""}
                  onChange={updateForm}
                  required
                />
              </div>


              <div className="form-group">
                <label>Available Beds</label>

                <input
                  type="number"
                  min="0"
                  name="available_beds"
                  value={form.available_beds ?? ""}
                  onChange={updateForm}
                  required
                />
              </div>

            </div>
          )}


          {type === "organ" && (
            <div className="resource-form-grid">

              <div className="form-group">
                <label>Organ Name</label>

                <input
                  name="organ_name"
                  value={form.organ_name || ""}
                  onChange={updateForm}
                  placeholder="Kidney"
                  required
                />
              </div>


              <label className="checkbox-field">

                <input
                  type="checkbox"
                  name="available"
                  checked={!!form.available}
                  onChange={updateForm}
                />

                <span>Currently Available</span>

              </label>

            </div>
          )}


          {type === "equipment" && (
            <div className="resource-form-grid">

              <div className="form-group">
                <label>Equipment Name</label>

                <input
                  name="equipment_name"
                  value={form.equipment_name || ""}
                  onChange={updateForm}
                  placeholder="Ventilator"
                  required
                />
              </div>


              <div className="form-group">
                <label>Total Quantity</label>

                <input
                  type="number"
                  min="0"
                  name="total_quantity"
                  value={form.total_quantity ?? ""}
                  onChange={updateForm}
                  required
                />
              </div>


              <div className="form-group">
                <label>Available Quantity</label>

                <input
                  type="number"
                  min="0"
                  name="available_quantity"
                  value={form.available_quantity ?? ""}
                  onChange={updateForm}
                  required
                />
              </div>

            </div>
          )}


          <button
            className="primary-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editingId
              ? "Update Resource"
              : "Save Resource"}
          </button>

        </form>
      )}


      {items.length === 0 ? (
        <div className="manager-empty">
          <span>No records added yet.</span>

          <button onClick={openCreate}>
            Add your first record
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        <div className="manager-list">

          {items.map((item) => (

            <div className="manager-item" key={item.id}>

              <div className="manager-item-info">

                {type === "blood" && (
                  <>
                    <strong>{item.blood_group}</strong>
                    <span>
                      {item.units_available} units available
                    </span>
                  </>
                )}

                {type === "icu" && (
                  <>
                    <strong>ICU Beds</strong>
                    <span>
                      {item.available_beds} available /{" "}
                      {item.total_beds} total
                    </span>
                  </>
                )}

                {type === "organ" && (
                  <>
                    <strong>{item.organ_name}</strong>
                    <span>
                      {item.available
                        ? "Available"
                        : "Not available"}
                    </span>
                  </>
                )}

                {type === "equipment" && (
                  <>
                    <strong>{item.equipment_name}</strong>
                    <span>
                      {item.available_quantity} available /{" "}
                      {item.total_quantity} total
                    </span>
                  </>
                )}

              </div>


              <div className="manager-actions">

                <button
                  className="edit-button"
                  onClick={() => openEdit(item)}
                >
                  Edit
                </button>

                <button
                  className="item-delete-button"
                  onClick={() => deleteResource(item.id)}
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}


// ============================================================
// ABOUT
// ============================================================

function About() {
  return (
    <main className="about-page">

      <div className="about-hero">
        <div className="page-eyebrow">
          <HeartPulse size={17} />
          ABOUT TECH4LIFE
        </div>

        <h1>
          Connecting healthcare resources
          <span> when they matter.</span>
        </h1>

        <p>
          Tech4Life is a hospital resource management platform designed
          to make resource information easier to discover and manage.
        </p>
      </div>


      <div className="about-grid">

        <div className="about-card">
          <ShieldCheck />
          <h3>Secure Accounts</h3>
          <p>
            Registered hospitals can securely manage their own resource
            information.
          </p>
        </div>

        <div className="about-card">
          <Search />
          <h3>Simple Search</h3>
          <p>
            Search hospitals by name, city, phone number or email.
          </p>
        </div>

        <div className="about-card">
          <Activity />
          <h3>Resource Management</h3>
          <p>
            Hospitals can add, update and remove resource records.
          </p>
        </div>

      </div>

    </main>
  );
}


// ============================================================
// APP
// ============================================================

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/resources"
          element={<Resources />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

      </Routes>

      <footer className="footer">
        {/* existing footer code */}
      </footer>

    </BrowserRouter>
  );
}

export default App;


