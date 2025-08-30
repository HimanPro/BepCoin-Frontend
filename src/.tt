import React from "react";
import { useState } from "react";
import "./App.css";
import "./responsive.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import WalletDetails from "./Components/WalletDetails";
import { injected } from "wagmi/connectors";
import { useConnect } from "wagmi";
import ConnectWallet from "./Components/ConnectWallet";
import { Hamburger, HamburgerIcon, Menu, X } from "lucide-react";

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isWallet, setIsWallet] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleToggle = (index) => {
    console.log(index);
    setActiveIndex(activeIndex === index ? null : index);
  };
  const links = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Faq", href: "#Faq" },
    { name: "Feature", href: "#feature" },
  ];
  const closeMenu = () => setMenuOpen(false);

  // FAQ data
  const faqItems = [
    {
      question: "What is Blockchain?",
      answer:
        "Globally network emerging action items with best-of-breed core Efficiently build end-to-end mindshare cultivate top-line web-readiness before 24/7 scenarios.",
    },
    {
      question: "Can I Transact Using Tokens?",
      answer:
        "Globally network emerging action items with best-of-breed core Efficiently build end-to-end mindshare cultivate top-line web-readiness before 24/7 scenarios.",
    },
    {
      question: "How can I create a crypto-wallet?",
      answer:
        "Globally network emerging action items with best-of-breed core Efficiently build end-to-end mindshare cultivate top-line web-readiness before 24/7 scenarios.",
    },
  ];

  return (
    <>
      <div>
        <div id="sticky-header" className="cryptobit_nav_manu">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="logo">
                  <a className="logo_img upper1" href="/" title="cryptobit">
                    <img src="/images/logo2.png" alt="LOGO" width={150} />
                  </a>
                  <a className="main_sticky upper1" href="#" title="cryptobit">
                    <img src="/images/logo2.png" alt="astute" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <nav className="cryptobit_menu upper">
                  <ul className="nav_scroll">
                    <li>
                      <a href="#" className="">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#about">About</a>
                    </li>
                    <li>
                      <a href="#services">Services</a>
                    </li>
                    <li>
                      <a href="#Faq">Faq</a>
                    </li>
                    <li>
                      <a href="#feature">Feature</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu-area d-lg-none bg-black">
          <div className="mobile-menu-header d-flex justify-content-between align-items-center p-3">
            <a href="#" className="logo_img">
              <img src="/images/logo2.png" alt="logo" width={150} />
            </a>
            {/* Hamburger button */}
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "transparent", // remove white bg
                border: "none", // remove border
                padding: "0", // remove default button spacing
                cursor: "pointer",
              }}
            >
              <Menu size={28} color="#ffc107" />
            </button>
          </div>

          {/* Menu items */}
          {/* Overlay */}
          <div
            className={`custom_mobile_menu_overlay ${menuOpen ? "active" : ""}`}
            onClick={closeMenu}
          ></div>

          {/* Mobile menu */}
          <nav
            className={`custom_mobile_menu_wrapper ${menuOpen ? "active" : ""}`}
          >
            <div className="d-flex justify-content-end align-items-center mobile-header">
              {/* <a href="#" className="logo_img">
                <img src="/images/logo2.png" alt="logo" width={150} />
              </a> */}
              <button
                className="close-btn"
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "0",
                  cursor: "pointer",
                }}
              >
                <X size={28} color="#ffc107" />
              </button>
            </div>
            <ul >
              {links.map((link, idx) => (
                <li key={idx} >
                  <a href={link.href} onClick={closeMenu}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div
          className="hero-section style-two d-flex align-items-center"
          id="home"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="hero-content">
                  <WalletDetails checkStatus={isWallet} data={setIsWallet} />
                  <div className="hero-title">
                    <h1>Experience of</h1>
                    <h1>Digital Transection</h1>
                    <h3>Blockchain</h3>
                    <div className="shape" />
                  </div>
                  <div className="hero-text">
                    <p>
                      Cryptography, encryption process of transforming
                      information <br /> referred to as plaintext using done.
                    </p>
                  </div>
                  <div className="hero-button">
                    <ConnectWallet data={setIsWallet} />
                  </div>
                </div>
                <div className="dreamit-hero-thumb">
                  <div className="hero-thumb-inner4 bounce-animate4">
                    <img src="/images/slider/half-circle.png" alt />
                  </div>
                  <div className="hero-thumb-inner5 bounce-animate">
                    <img src="/images/slider/cross-2.png" alt />
                  </div>
                  <div className="hero-thumb-inner6 bounce-animate2">
                    <img src="/images/slider/cross.png" alt />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="dreamit-hero-thumb">
                  <div className="hero-main-thumb">
                    <img src="/images/slider/main-img.png" alt />
                  </div>
                  <div className="hero-thumb-inner1 rotateme">
                    <img src="/images/slider/round.png" alt />
                  </div>
                  <div className="hero-thumb-inner2 bounce-animate">
                    <img src="/images/slider/style-1.png" alt />
                  </div>
                  <div className="hero-thumb-inner3 bounce-animate3">
                    <img src="/images/slider/style-2.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="feature-area style-two"
          id="feature"
          style={{ paddingTop: "100px" }}
        >
          <div className="container">
            <div className="row">
              <div
                className="col-lg-12 col-sm-12"
                style={{ paddingBottom: "70px" }}
              >
                <div className="dreamit-section-title style-two text-center pb-65">
                  <h4>CRYPTOBIT FEATURES</h4>
                  <h1>The most trusted way for</h1>
                  <h1>Powerfull Influence</h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="feature-single-box">
                  <div className="feature-box-inner">
                    <div className="feature-icon1">
                      <img src="/images/fav-icon/image.png" alt="" width={50} />
                      <i className="flaticon flaticon-layers restly-flaticon" />
                    </div>
                    <div className="feature-title">
                      <h3>Transparency</h3>
                      <p>
                        Cryptography, encryption process referred to as
                        plaintext
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="feature-single-box upper1">
                  <div className="feature-box-inner">
                    <div className="feature-icon1">
                      <img
                        src="/images/fav-icon/presentation.png"
                        alt=""
                        width={50}
                      />
                    </div>
                    <div className="feature-title">
                      <h3>External Method</h3>
                      <p>
                        Cryptography, encryption process referred to as
                        plaintext
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="feature-single-box upper2">
                  <div className="feature-box-inner">
                    <div className="feature-icon1">
                      <img
                        src="/images/fav-icon/cyber-security.png"
                        alt=""
                        width={50}
                      />
                    </div>
                    <div className="feature-title">
                      <h3>High Security</h3>
                      <p>
                        Cryptography, encryption process referred to as
                        plaintext
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="feature-bottom-text text-center">
                  <p className="d-flex align-items-center justify-content-center gap-2">
                    <span>
                      {" "}
                      <img
                        src="/images/fav-icon/pen.png"
                        alt=""
                        width={30}
                      />{" "}
                    </span>
                    {/* <span>
                      Do you Know More?{" "}
                      <span>
                        <a href="#">Learn More</a>
                      </span>
                    </span> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="about-area style-two"
          style={{ paddingTop: "100px" }}
          id="about"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="dreamit-about-thumb">
                  <img src="/images/resource/about-main-img.png" alt />
                  <div className="about-thumb-inner rotateme">
                    <img src="/images/resource/about-coin.png" alt />
                  </div>
                  <div className="about-thumb-inner1 bounce-animate3">
                    <img src="/images/resource/about-icon.png" alt />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="dreamit-section-title style-two pb-2">
                      <h4>TRANSACTIONS</h4>
                      <h1>Blockchain will Record</h1>
                      <h1>All Transactions</h1>
                      <p className="section-text">
                        Rapidiously enhance B2C e-services before
                        multifunctional partnerships. Energistically fabricate
                        cross functional resources rather than excellent
                        interfaces. Enthusiastically brand.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="about-single-icon-box">
                      <div className="about-icon">
                        <i className="flaticon-light-bulb" />
                      </div>
                      <div className="about-title">
                        <h4>Exchange Value</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="about-single-icon-box">
                      <div className="about-icon">
                        <i className="flaticon-support-3" />
                      </div>
                      <div className="about-title">
                        <h4>User Secuirity</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="about-single-icon-box">
                      <div className="about-icon">
                        <i className="flaticon-hand-shake" />
                      </div>
                      <div className="about-title">
                        <h4>User Dashboard</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="about-single-icon-box">
                      <div className="about-icon">
                        <i className="flaticon-time-3" />
                      </div>
                      <div className="about-title">
                        <h4>Asset Registries</h4>
                      </div>
                    </div>
                  </div>
                  {/* <div className="about-button2">
                    <a href="#">Contact More</a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="services-area style-two"
          style={{ paddingTop: "100px" }}
          id="services"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="dreamit-section-title text-center style-two pb-5">
                  <h4>CRYPTOBIT SERVICE</h4>
                  <h1>The Heart of the Blockchain</h1>
                  <h1>of Value Chain</h1>
                  <p className="section-text">
                    Rapidiously enhance service before multifunctional
                    partnerships. Energistically fabricate cross functional
                    resources .
                  </p>
                </div>
              </div>
            </div>
            <div className="row service-bg">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="dreamit-section-title style-two">
                  <h1>Blockchain have</h1>
                  <h1>Record All Coin</h1>
                  <h1>Transaction</h1>
                  <p className="service-text">
                    Monotonectally conceptualize value-added benefits <br />{" "}
                    process-centric infrastructure. Uniquely fashion orth <br />{" "}
                    whereas pandemic metrics.
                  </p>
                </div>
                {/* <div className="about-button2">
                  <a href="#">More Details</a>
                </div> */}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="service-single-thumb">
                  <div className="service-main-thumb">
                    <img src="/images/resource/mobile-img.png" alt />
                  </div>
                  <div className="service-thumb-inner bounce-animate3">
                    <img src="/images/resource/coin.png" alt />
                  </div>
                  <div className="service-thumb-inner1 bounce-animate4">
                    <img src="/images/resource/half-circle-red.png" alt />
                  </div>
                  <div className="service-thumb-inner2 bounce-animate5">
                    <img src="/images/resource/half-cirlce-green.png" alt />
                  </div>
                  <div className="service-thumb-inner3 bounce-animate">
                    <img src="/images/resource/crosss-icon.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="process-area"
          id="process"
          style={{ paddingTop: "100px" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="dreamit-section-title text-center style-two pb-5">
                  <h4>WORK PROCESS</h4>
                  <h1>Blockchain work Process</h1>
                  <p className="section-text">
                    Rapidiously enhance service before multifunctional
                    partnership cryptocurrency Energistically fabricate cross
                    functional author done.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="row process-bg">
                  <div className="col-lg-3 col-md-6">
                    <div className="single-process-box">
                      <div className="single-process-thumb">
                        <img src="/images/resource/process1.png" alt />
                        <div className="process-number">
                          <span>01</span>
                        </div>
                      </div>
                      <div className="single-process-content">
                        <div className="process-title">
                          <h4>Join Crypto</h4>
                        </div>
                        <div className="process-text">
                          <p>Multifunctional partnershi Cryptocurrency</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="single-process-box">
                      <div className="single-process-thumb">
                        <img src="/images/resource/process2.png" alt />
                        <div className="process-number">
                          <span>02</span>
                        </div>
                      </div>
                      <div className="single-process-content">
                        <div className="process-title">
                          <h4>Colect Bitcoin</h4>
                        </div>
                        <div className="process-text">
                          <p>Multifunctional partnershi Cryptocurrency</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="single-process-box">
                      <div className="single-process-thumb">
                        <img src="/images/resource/process3.png" alt />
                        <div className="process-number">
                          <span>03</span>
                        </div>
                      </div>
                      <div className="single-process-content">
                        <div className="process-title">
                          <h4>Start Selling</h4>
                        </div>
                        <div className="process-text">
                          <p>Multifunctional partnershi Cryptocurrency</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="single-process-box">
                      <div className="single-process-thumb">
                        <img src="/images/resource/process4.png" alt />
                        <div className="process-number">
                          <span>04</span>
                        </div>
                      </div>
                      <div className="single-process-content">
                        <div className="process-title">
                          <h4>Paid Member</h4>
                        </div>
                        <div className="process-text">
                          <p>Multifunctional partnershi Cryptocurrency</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="faq-area style-two"
          style={{ paddingTop: "100px" }}
          id="Faq"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dreamit-section-title style-two pb-2">
                  <h4>FAQ</h4>
                  <h1>Frequently Q/A</h1>
                  <p className="section-text">
                    Globally network emerging action items with best-of-breed
                    core <br />
                    Efficiently build end-to-end mindshare
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="accordion-menu">
                  <ul className="accordion">
                    {faqItems.map((item, index) => (
                      <li key={index}>
                        <a
                          onClick={() => handleToggle(index)}
                          style={{ cursor: "pointer", display: "block" }}
                        >
                          {item.question}
                        </a>
                        {activeIndex === index && (
                          <div style={{ marginTop: "10px", color: "white" }}>
                            {item.answer}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="faq-single-thumb">
                  <img src="/images/resource/faq1.png" alt="FAQ Image" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-middle style-two pt-80 pb-3">
          <div className="container">
            <div className="row footer-bottom mt-65">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="footer-bottom-content">
                  <div className="footer-bottom-content-copy">
                    <p>
                      Rights Reserved. By: <span>BNB</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="footer-bottom-content">
                  <div className="footer-bottom-menu">
                    <ul>
                      <li>Privacy Policy</li>
                      <li>Terms &amp; Condition</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="footer-bottom-shape">
                  <img src="/images/resource/footer-b.png" alt />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-area">
          <div className="top-wrap">
            <div className="go-top-btn-wraper">
              <div className="go-top go-top-button">
                <i className="fas fa-arrow-up" />
                <i className="fas fa-arrow-up" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
