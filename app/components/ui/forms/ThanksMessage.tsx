

"use client";

import React from "react";

interface ThanksMessageProps {
  success: boolean;
}

const ThanksMessage: React.FC<ThanksMessageProps> = ({ success }) => {
  return (
    <div className="max-w-xl mx-auto text-center py-12 px-4">
      {success ? (
        <div className="bg-green-100 text-green-800 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Thank you for your submission!</h2>
          <p>We’ve received your form and will contact you within 48 hours.</p>
        </div>
      ) : (
        <div className="bg-red-100 text-red-800 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Oops, something went wrong.</h2>
          <p>
            Please try submitting the form again later or contact us directly at{" "}
            <a href="tel:+971504804408" className="underline text-blue-700">+971 50 480 4408</a>{" "}
            or{" "}
            <a href="mailto:info@teleios.ae" className="underline text-blue-700">info@teleios.ae</a>.
          </p>
        </div>
      )}
    </div>
  );
};

export default ThanksMessage;