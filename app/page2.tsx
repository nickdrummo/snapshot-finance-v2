'use client';

import React, { useState } from "react";

const faqs = [
  {
    question: "How does the one-time payment work?",
    answer:
      "You pay once to analyze your bank statements, and you'll have lifetime access to the insights and reports generated from that analysis. There are no recurring fees or subscriptions.",
  },
  {
    question: "Can I add more statements later?",
    answer:
      "Yes! If you need to analyze more statements later, you can purchase additional analysis packs at the same bundle pricing.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Absolutely. We use bank-level encryption and never store your actual bank statements. Our system extracts only the subscription information and then discards the statements.",
  },
  {
    question: "What if I have more than 3 statements to analyze?",
    answer:
      "For more than 3 statements, you can purchase multiple packs or contact us for enterprise pricing. Each additional statement beyond the third is just $2.00.",
  },
];

const Page2: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="container">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
          background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf1 100%);
          color: #2c3e50;
          line-height: 1.6;
          padding-bottom: 40px;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        header {
          text-align: center;
          padding: 40px 0;
        }
        header h1 {
          font-size: 2.8rem;
          color: #2c3e50;
          margin-bottom: 15px;
        }
        header p {
          font-size: 1.2rem;
          color: #7f8c8d;
          max-width: 700px;
          margin: 0 auto;
        }
        .pricing-highlight {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 25px;
          margin: 30px auto;
          max-width: 800px;
          text-align: center;
        }
        .pricing-highlight i {
          font-size: 2.5rem;
          color: #3498db;
          margin-bottom: 15px;
        }
        .pricing-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
          margin-top: 30px;
        }
        .pricing-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 30px;
          flex: 1;
          min-width: 280px;
          max-width: 350px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        .pricing-card.popular {
          border: 2px solid #3498db;
        }
        .popular-tag {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #3498db;
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .plan-name {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-bottom: 15px;
          font-weight: 700;
        }
        .price {
          font-size: 2.8rem;
          color: #3498db;
          margin-bottom: 10px;
          font-weight: 800;
        }
        .price span {
          font-size: 1.2rem;
          color: #7f8c8d;
          font-weight: normal;
        }
        .savings {
          background: #e8f4fc;
          color: #3498db;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.9rem;
          margin-bottom: 20px;
          display: inline-block;
        }
        .features {
          list-style: none;
          margin: 25px 0;
          flex-grow: 1;
        }
        .features li {
          margin-bottom: 12px;
          display: flex;
          align-items: center;
        }
        .features li i {
          color: #2ecc71;
          margin-right: 10px;
          font-size: 1.1rem;
        }
        .features li i.inactive {
          color: #e74c3c;
        }
        .btn {
          display: block;
          width: 100%;
          padding: 14px;
          background: #3498db;
          color: white;
          text-align: center;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: auto;
        }
        .btn:hover {
          background: #2980b9;
        }
        .btn.outline {
          background: transparent;
          border: 2px solid #3498db;
          color: #3498db;
        }
        .btn.outline:hover {
          background: #3498db;
          color: white;
        }
        .payment-info {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 30px;
          margin: 50px auto;
          max-width: 800px;
          text-align: center;
        }
        .payment-info h2 {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 1.8rem;
        }
        .payment-info-content {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: left;
        }
        .payment-info-content i {
          color: #3498db;
          font-size: 2rem;
          margin-right: 20px;
          flex-shrink: 0;
        }
        .faq {
          margin-top: 60px;
        }
        .faq h2 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 30px;
          font-size: 1.8rem;
        }
        .faq-item {
          background: white;
          border-radius: 8px;
          margin-bottom: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        .faq-question {
          padding: 20px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
        }
        .faq-answer {
          padding: 0 20px 20px;
          color: #7f8c8d;
          display: none;
        }
        .faq-answer.open {
          display: block;
        }
        .testimonial {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 30px;
          margin: 50px auto;
          max-width: 800px;
          text-align: center;
        }
        .testimonial p {
          font-style: italic;
          font-size: 1.1rem;
          margin-bottom: 20px;
        }
        .testimonial .author {
          font-weight: 600;
          color: #2c3e50;
        }
        @media (max-width: 768px) {
          .pricing-container {
            flex-direction: column;
            align-items: center;
          }
          .pricing-card {
            width: 100%;
            max-width: 400px;
          }
          header h1 {
            font-size: 2.2rem;
          }
          .payment-info-content {
            flex-direction: column;
            text-align: center;
          }
          .payment-info-content i {
            margin-right: 0;
            margin-bottom: 15px;
          }
        }
      `}</style>
      <header>
        <h1>One-Time Payment Plans</h1>
        <p>
          Analyze your bank statements once and get lifetime access to your
          subscription insights. No recurring fees.
        </p>
      </header>

      <div className="pricing-highlight">
        <i className="fas fa-money-bill-wave"></i>
        <h2>Pay Once, Use Forever</h2>
        <p>
          Our unique one-time payment model means you'll never pay a
          subscription fee for our service.
        </p>
      </div>

      <div className="pricing-container">
        <div className="pricing-card">
          <h2 className="plan-name">Single Analysis</h2>
          <div className="price">
            $7.99<span> one time</span>
          </div>
          <p>Perfect for analyzing one bank statement</p>
          <ul className="features">
            <li>
              <i className="fas fa-check-circle"></i> 1 Bank Statement Analysis
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Subscription Identification
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Annual Spend Calculation
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Basic Categorization
            </li>
            <li>
              <i className="fas fa-times-circle inactive"></i> Multiple Statements
            </li>
            <li>
              <i className="fas fa-times-circle inactive"></i> Comparative Reports
            </li>
          </ul>
          <a href="#" className="btn outline">
            Select Plan
          </a>
        </div>

        <div className="pricing-card popular">
          <div className="popular-tag">BEST VALUE</div>
          <h2 className="plan-name">Double Analysis</h2>
          <div className="price">
            $12.99<span> one time</span>
          </div>
          <div className="savings">
            Save $2.99 compared to individual purchases
          </div>
          <p>Analyze two bank statements together</p>
          <ul className="features">
            <li>
              <i className="fas fa-check-circle"></i> 2 Bank Statement Analyses
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Subscription Identification
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Annual Spend Calculation
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Advanced Categorization
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Comparative Reports
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Duplicate Detection
            </li>
          </ul>
          <a href="#" className="btn">
            Select Plan
          </a>
        </div>

        <div className="pricing-card">
          <h2 className="plan-name">Triple Analysis</h2>
          <div className="price">
            $15.99<span> one time</span>
          </div>
          <div className="savings">
            Save $6.98 compared to individual purchases
          </div>
          <p>Perfect for analyzing multiple accounts</p>
          <ul className="features">
            <li>
              <i className="fas fa-check-circle"></i> 3 Bank Statement Analyses
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Subscription Identification
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Annual Spend Calculation
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Advanced Categorization
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Comparative Reports
            </li>
            <li>
              <i className="fas fa-check-circle"></i> Duplicate Detection
            </li>
          </ul>
          <a href="#" className="btn outline">
            Select Plan
          </a>
        </div>
      </div>

      <div className="payment-info">
        <h2>
          <i className="fas fa-info-circle"></i> Transparent Pricing
        </h2>
        <p>
          We believe in complete transparency. Before any payment is processed,
          you'll see:
        </p>

        <div className="payment-info-content">
          <i className="fas fa-exclamation-triangle"></i>
          <div>
            <p>
              <strong>Before you pay, we'll show you:</strong>
            </p>
            <ul>
              <li>Your total yearly subscription spend</li>
              <li>Your most expensive subscription</li>
              <li>A detailed breakdown of all costs</li>
              <li>The exact one-time payment amount</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testimonial">
        <p>
          "I was able to identify $45/month in subscriptions I'd forgotten about.
          The triple analysis pack paid for itself in the first month!"
        </p>
        <div className="author">- Sarah J., satisfied customer</div>
      </div>

      <div className="faq">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <div className="faq-item" key={idx}>
            <div
              className="faq-question"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              {faq.question}
              <i
                className={`fas fa-chevron-${
                  openFaq === idx ? "up" : "down"
                }`}
                style={{ marginLeft: 10 }}
              ></i>
            </div>
                        <div
                          className={`faq-answer${openFaq === idx ? " open" : ""}`}
                        >
                          {faq.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            };
            
            export default Page2;