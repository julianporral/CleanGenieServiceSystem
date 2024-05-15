import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaSync, FaTimes } from 'react-icons/fa';
import './FAQ.css';

const AutomatedFAQ = () => {
  const [userMessage, setUserMessage] = useState('');
  const [botMessages, setBotMessages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const messageContainerRef = useRef(null);

  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const userQuestion = userMessage.trim().toLowerCase();
    const botResponse = generateBotResponse(userQuestion);
    
    setBotMessages([...botMessages, { userMessage, botResponse }]);
    setUserMessage('');
  };

  const handleRefreshMessages = () => {
    setBotMessages([]);
  };

  const FAQPatterns = [
    {
      pattern: /services|offer|provide/,
      response: "We offer a range of cleaning services including deep cleaning, post-construction cleaning, in and out cleaning. How can I assist you further?"
    },
    {
      pattern: /schedule|booking/,
      response: "You can easily schedule a cleaning service through our website's booking page. Simply select the service you need, choose a date and time, and complete the booking process. Is there anything else you'd like to know?"
    },
    {
      pattern: /rates|pricing/,
      response: "Our rates vary depending on the type of service you require, the size of your space, and any additional requirements. For example, our standard rate for a space of 100 square meters is $X. Would you like to know the rates for other sizes?"
    },
    {
      pattern: /equipment|supplies/,
      response: "Yes, we provide all the necessary cleaning equipment and supplies for our services. You don't need to worry about providing anything. Is there anything else you'd like to know?"
    },
    {
      pattern: /contact|customer support/,
      response: "You can contact our customer support team through email at CleanGenieCleaningCo.gmail.com or by phone at 1-800-123-4567. Our support team is available Monday to Saturday, Whole day. How can I assist you further?"
    },
    // location adn pricing  // 
    // Rates 
    // Time 
    {
      pattern: /payment/,
      response: "You can send your Gcash Receipt, cheque or Clean Genie Cleaning Co receipt form in the payment module, where you can select what type of receipt and upload your Images. How can I assist you further?"
    },
  ];

  const generateBotResponse = (userQuestion) => {
    const matchedPattern = FAQPatterns.find(({ pattern }) => pattern.test(userQuestion));
    return matchedPattern ? matchedPattern.response : "I'm sorry, I didn't understand your question. Please feel free to ask another question.";
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        messageContainerRef.current.classList.add('show-panel');
      }, 100);
    } else {
      messageContainerRef.current.classList.remove('show-panel');
    }
  }, [isVisible]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="faq-container">
      <div ref={messageContainerRef} className="chat-panel">
        <button className="hide-button" onClick={toggleVisibility}><FaTimes size={14} /></button>
        <div className="chat-messages-container">
          <div className="chat-messages">
            {botMessages.map((message, index) => (
              <div className="message" key={index}>
                <p><strong>You:</strong> {message.userMessage}</p>
                <p><strong>Genie:</strong> {message.botResponse}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="user-input">
          <input
            type="text"
            value={userMessage}
            onChange={handleUserMessageChange}
            placeholder="Ask a question..."
          />
          <button className="send-button" onClick={handleSendMessage}><FaPaperPlane /></button>
          <button className="refresh-button" onClick={handleRefreshMessages}><FaSync /></button>
        </div>
      </div>
      {!isVisible && (
        <button className="faq-button" onClick={toggleVisibility}>FAQ</button>
      )}
    </div>
  );
};

export default AutomatedFAQ;
