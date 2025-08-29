import React from 'react';
import { useState } from 'react'
import './App.css'
import './responsive.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ConnectWallet from './Components/ConnectWallet';
import { useAccount, useBalance, useEnsName } from 'wagmi';
import WalletDetails from './Components/WalletDetails';

function App() {
  const [activeIndex, setActiveIndex] = useState(null);

  // Function to handle FAQ item click
  const handleToggle = (index) => {
    if (activeIndex === index) {
      // If the clicked item is already open, close it
      setActiveIndex(null);
    } else {
      // Open the clicked item
      setActiveIndex(index);
    }
  };

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
        {/* Start cryptobit Main Menu Area */}
        {/*==================================================*/}
        <div id="sticky-header" className="cryptobit_nav_manu">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3">
                <div className="logo">
                  <a className="logo_img upper1" href="index.html" title="cryptobit">
                    <img src="/images/logo2d.png" alt = "LOGO" />
                  </a>
                  <a className="main_sticky upper1" href="index.html" title="cryptobit">
                    <img src="/images/logo2.png" alt="astute" />
                  </a>
                </div>
              </div>
              <div className="col-lg-9">
                <nav className="cryptobit_menu upper">
                  <ul className="nav_scroll">
                    <li><a href="#">Home</a>
                    </li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a>
                    </li>
                  </ul>
                  <div className="header-button upper1">
                    <ConnectButton />
                  </div>

                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Cryptobit Mobile Menu Area */}
        <div className="mobile-menu-area d-sm-block d-md-block d-lg-none bg-black">
          <div className="mobile-menu">
            <nav className="cripto_menu">
              <div className="logo">
                <a className="logo_img upper1" href="index.html" title="cryptobit">
                  <img src="/images/logo2.png" alt />
                </a>
                <a className="main_sticky upper1" href="index.html" title="cryptobit">
                  <img src="/images/logo2.png" alt="astute" />
                </a>
              </div>
              <ul className="nav_scroll">
                <li><a href="#">Home</a>
                </li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a>
                </li>
              </ul>
              <div className="header-button upper1">
                <ConnectButton />
              </div>
            </nav>
          </div>
        </div>

        {/* ===============//banner section start here \\================= */}
        <div className="hero-section style-two d-flex align-items-center" id="home">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="hero-content">
                  <WalletDetails />
                  <div className="hero-title">
                    <h1>Experience of</h1>
                    <h1>Digital Transection</h1>
                    <h3>Blockchain</h3>
                    <div className="shape" />
                  </div>
                  <div className="hero-text">
                    <p>Cryptography, encryption process of transforming information <br /> referred to as plaintext) using done.</p>
                  </div>
                  <div className="hero-button">
                    <a href="#">Get Started Now</a>
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
        {/* ===============//banner section end here \\================= */}
        {/*==================================================*/}
        {/* Start cryptobit feature Area */}
        {/*==================================================*/}
        <div className="feature-area style-two" id="feature" style={{paddingTop: '100px'}}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-sm-12" style={{paddingBottom: '70px'}}>
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
                    <img src="/images/fav-icon/image.png" alt="" width={50}/>
                      <i className="flaticon flaticon-layers restly-flaticon" />
                    </div>
                    <div className="feature-title">
                      <h3>Transparency</h3>
                      <p>Cryptography, encryption process referred to as plaintext</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="feature-single-box upper1">
                  <div className="feature-box-inner">
                    <div className="feature-icon1">
                      <img src="/images/fav-icon/presentation.png" alt="" width={50}/>
                    </div>
                    <div className="feature-title">
                      <h3>External Method</h3>
                      <p>Cryptography, encryption process referred to as plaintext</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="feature-single-box upper2">
                  <div className="feature-box-inner">
                    <div className="feature-icon1">                      
                      <img src="/images/fav-icon/cyber-security.png" alt="" width={50}/>

                    </div>
                    <div className="feature-title">
                      <h3>High Security</h3>
                      <p>Cryptography, encryption process referred to as plaintext</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="feature-bottom-text text-center">
                  <p className='d-flex align-items-center justify-content-center gap-2'>
                   <span>  <img src="/images/fav-icon/pen.png" alt="" width={30}/> </span>
                    <span>Do you Know More? <span><a href="#">Learn More</a></span></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*==================================================*/}
        {/* End cryptobit feature Area */}
        {/*==================================================*/}
        {/*==================================================*/}
        {/* Start cryptobit about Area */}
        {/*==================================================*/}
        <div className="about-area style-two" style={{paddingTop: '100px'}} id="about">
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
                      <p className="section-text">Rapidiously enhance B2C e-services before multifunctional partnerships. Energistically fabricate cross functional resources rather than excellent interfaces. Enthusiastically brand.</p>
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
                  <div className="about-button2">
                    <a href="#">Contact More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*==================================================*/}
        {/* End cryptobit about Area */}
        {/*==================================================*/}
        {/*==================================================*/}
        {/* Start cryptobit feature Area */}
        {/*==================================================*/}
        <div className="services-area style-two" style={{paddingTop: '100px'}}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="dreamit-section-title text-center style-two pb-5">
                  <h4>CRYPTOBIT SERVICE</h4>
                  <h1>The Heart of the Blockchain</h1>
                  <h1>of Value Chain</h1>
                  <p className="section-text">Rapidiously enhance service before multifunctional partnerships. Energistically fabricate cross functional resources .</p>
                </div>
              </div>
            </div>
            <div className="row service-bg">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="dreamit-section-title style-two">
                  <h1>Blockchain have</h1>
                  <h1>Record All Coin</h1>
                  <h1>Transaction</h1>
                  <p className="service-text">Monotonectally conceptualize value-added benefits <br /> process-centric infrastructure. Uniquely fashion orth <br /> whereas pandemic metrics.</p>
                </div>
                <div className="about-button2">
                  <a href="#">More Details</a>
                </div>
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
        {/*==================================================*/}
        {/* End cryptobit feature Area */}
        {/*==================================================*/}
        {/*==================================================*/}
        {/* Start cryptobit process Area */}
        {/*==================================================*/}
        <div className="process-area" id="process" style={{paddingTop: '100px'}}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="dreamit-section-title text-center style-two pb-5">
                  <h4>WORK PROCESS</h4>
                  <h1>Blockchain work Process</h1>
                  <p className="section-text">Rapidiously enhance service before multifunctional partnership cryptocurrency Energistically fabricate cross functional author done.</p>
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
        {/*==================================================*/}
        {/* End Cryptobit process Area */}
        {/*==================================================*/}
        {/*==================================================*/}
        {/* Start Cryptobit testimonial Area */}
        {/*==================================================*/}
        {/* <div className="testimonial-area pt-100 pb-70" id="testimonial">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="dreamit-section-title style-two pb-5">
                  <h4>CLIENT STORY</h4>
                  <h1>Cryptobit Clients</h1>
                  <h1>Testimonials</h1>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="about-button2 text-right">
                  <a href="#">Droap a Review</a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="testimonial-counter-thumb">
                  <div className="counter-thumb">
                    <img src="/images/resource/testi.png" alt />
                  </div>
                  <div className="testimonial-counter-title">
                    <h3 className="counter">3120 <span>+</span></h3>
                    <p>Our All Customers Satisfactions</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-6">
                <div className="row">
                  <div className="testimonial_list owl-carousel">
                    <div className="col-lg-12">
                      <div className="testimonial-single-box">
                        <div className="testimonial-thumb">
                          <img src="/images/resource/testi1.png" alt />
                        </div>
                        <div className="testimonial-content">
                          <div className="testimonial-title">
                            <h3>Devid Alexon</h3>
                          </div>
                          <div className="testi-icon">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                          </div>
                          <div className="testimonial-text">
                            <p>Cryptobit App Users</p>
                          </div>
                        </div>
                        <div className="qoute-icon">
                          <i className="fas fa-quote-right" />
                        </div>
                        <div className="testi-text">
                          <p>Authoritatively aggregate diverse ideas without backward-compatible growth strategies. Efficiently cultivator harness 24/7 interfaces via interdependent experiences. Dynamically repurpose bricks-and-clicks -critical
                            sells content before market-driven deliverables testing procedures via value-added core competencies. done at the monotonectally visualize impactful.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="testimonial-single-box">
                        <div className="testimonial-thumb">
                          <img src="/images/resource/testi1.png" alt />
                        </div>
                        <div className="testimonial-content">
                          <div className="testimonial-title">
                            <h3>Devid Alexon</h3>
                          </div>
                          <div className="testi-icon">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                          </div>
                          <div className="testimonial-text">
                            <p>Cryptobit App Users</p>
                          </div>
                        </div>
                        <div className="qoute-icon">
                          <i className="fas fa-quote-right" />
                        </div>
                        <div className="testi-text">
                          <p>Authoritatively aggregate diverse ideas without backward-compatible growth strategies. Efficiently cultivator harness 24/7 interfaces via interdependent experiences. Dynamically repurpose bricks-and-clicks -critical
                            sells content before market-driven deliverables testing procedures via value-added core competencies. done at the monotonectally visualize impactful.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="testimonial-single-box">
                        <div className="testimonial-thumb">
                          <img src="/images/resource/testi1.png" alt />
                        </div>
                        <div className="testimonial-content">
                          <div className="testimonial-title">
                            <h3>Devid Alexon</h3>
                          </div>
                          <div className="testi-icon">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                          </div>
                          <div className="testimonial-text">
                            <p>Cryptobit App Users</p>
                          </div>
                        </div>
                        <div className="qoute-icon">
                          <i className="fas fa-quote-right" />
                        </div>
                        <div className="testi-text">
                          <p>Authoritatively aggregate diverse ideas without backward-compatible growth strategies. Efficiently cultivator harness 24/7 interfaces via interdependent experiences. Dynamically repurpose bricks-and-clicks -critical
                            sells content before market-driven deliverables testing procedures via value-added core competencies. done at the monotonectally visualize impactful.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="testimonial-single-box">
                        <div className="testimonial-thumb">
                          <img src="/images/resource/testi1.png" alt />
                        </div>
                        <div className="testimonial-content">
                          <div className="testimonial-title">
                            <h3>Devid Alexon</h3>
                          </div>
                          <div className="testi-icon">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star-half-alt" />
                          </div>
                          <div className="testimonial-text">
                            <p>Cryptobit App Users</p>
                          </div>
                        </div>
                        <div className="qoute-icon">
                          <i className="fas fa-quote-right" />
                        </div>
                        <div className="testi-text">
                          <p>Authoritatively aggregate diverse ideas without backward-compatible growth strategies. Efficiently cultivator harness 24/7 interfaces via interdependent experiences. Dynamically repurpose bricks-and-clicks -critical
                            sells content before market-driven deliverables testing procedures via value-added core competencies. done at the monotonectally visualize impactful.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/*==================================================*/}
        {/* End Cryptobit testimonial Area */}
        {/*==================================================*/}
        {/* ===============//faq section start here \\================= */}
        <div className="faq-area style-two" style={{paddingTop: '100px'}}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dreamit-section-title style-two pb-2">
                  <h4>FAQ</h4>
                  <h1>Frequently Q/A</h1>
                  <p className="section-text">
                    Globally network emerging action items with best-of-breed core <br />
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
                          style={{ cursor: "pointer" }}
                        >
                          {item.question}
                        </a>
                        {activeIndex === index && <p>{item.answer}</p>}
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
        {/* ===============//faq section end here \\=================== */}
        {/* ===============//subscribe area end here \\=================== */}
        {/* <div className="subscribe-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="single-subscribe-box">
                  <div className="subscribe-title text-center">
                    <h1>Stay with Us the Next Update</h1>
                    <p>Principle-centered in a e-service with ethical total linkage. Phosfluo grow cutting edge technology vis-a-vis viral total</p>
                  </div>
                  <div className="contact-form-box-2 text-center">
                    <form action="https://formspree.io/f/myyleorq" method="POST" id="dreamit-form">
                      <div className="from-box2">
                        <input type="text" placeholder="Enter Your E-Mail" />
                        <button>Subscribe</button>
                      </div>
                    </form>
                    <div id="status" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* ===============//subscribe area end here \\=================== */}
        {/*==================================================*/}
        {/* Start Cryptobit Footer Middle Area */}
        {/*==================================================*/}
        <div className="footer-middle style-two pt-80 pb-3">
          <div className="container">
            {/* <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="widgets-company-info pt-3">
                  <div className="cryptobit-logo">
                    <a className="logo_img" href="index.html" title="cryptobit">
                      <img src="/images/logo2.png" alt />
                    </a>
                  </div>
                  <div className="company-info-desc">
                    <p>Cryptocurrencies are used prim outside existing banking govern institutions hanged</p>
                  </div>
                  <div className="company_icon">
                    <a className="facebook" href="#"><i className="fab fa-facebook-f" /></a>
                    <a className="twitter" href="#"><i className="fa-brands fa-x-twitter" /></a>
                    <a className="linkedin" href="#"><i className="fab fa-linkedin-in" /></a>
                    <a className="pinterest" href="#"><i className="fab fa-pinterest-p" /></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-6">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="widget-nav-menu">
                      <h4 className="widget-title">Catagories</h4>
                      <div className="menu-quick-link-content">
                        <ul className="menu">
                          <li><a href="#">What is ICO</a></li>
                          <li><a href="#">Token</a></li>
                          <li><a href="#">Road Map</a></li>
                          <li><a href="#">Advisor</a></li>
                          <li><a href="#">Payments</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="widget-nav-menu upper">
                      <h4 className="widget-title">Useful Link</h4>
                      <div className="menu-quick-link-content">
                        <ul className="menu">
                          <li><a href="#">Payment &amp; TAX</a></li>
                          <li><a href="#">Terms of Services</a></li>
                          <li><a href="#">My Account </a></li>
                          <li><a href="#">Return Policy</a></li>
                          <li><a href="#">Discount</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="widget-nav-menu upper1">
                      <h4 className="widget-title">Newsletter</h4>
                      <div className="menu-quick-link">
                        <p>Get now free 20% discount for all products on your first order</p>
                      </div>
                      <div className="contact-form-box-2 text-center">
                        <form>
                          <div className="from-box1">
                            <input type="text" placeholder="Enter Your E-Mail" />
                            <button><i className="fa fa-paper-plane" /></button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="row footer-bottom mt-65">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="footer-bottom-content">
                  <div className="footer-bottom-content-copy">
                    <p>© Cryptobit all Rights Reserved. By: <span>ABC@COPYRIGHT</span></p>
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
        {/*==================================================*/}
        {/* End Cryptobit Footer Middle Area */}
        {/*==================================================*/}
        {/*==================================================*/}
        {/* Start scroll Area */}
        {/*==================================================*/}
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
        {/*==================================================*/}
        {/* End cryptobit main menu Area */}
        {/*==================================================*/}

      </div>

    </>
  )
}

export default App
