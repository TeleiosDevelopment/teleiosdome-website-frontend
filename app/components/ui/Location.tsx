import React from 'react';
import Button from './Button';

export default function Location() {
  return (
    <section className="py-16 px-6 pt-24 pb-24 bg-[#0a0023] text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 mt-0">
          <div className="flex justify-end mb-2">
            <span className="text-sm text-white uppercase tracking-wider">
              Location
            </span>
          </div>
          <div className="border-t border-gray-500 w-full mb-4" />
          <h2 className="text-5xl font-bold text-white text-left mt-12 mb-12">
            Find Us
          </h2>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Google Map Embed */}
        <div className="w-full h-96">
          <iframe
              title="Map showing the location of Teleios Dome Dubai"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.1541598693957!2d55.186499399999995!3d25.0288419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6de7e687c19b%3A0x7ee24a1d13502b20!2sTeleios%20Dome!5e0!3m2!1sen!2sae!4v1748430601685!5m2!1sen!2sae"
              width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg border-0"
          ></iframe>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Find Us &amp; Get In Touch</h2>
            <p className="mb-2 font-jura">Teleios Dome Dubai</p>
            <p className="mb-2 font-jura ">D-65 - Dubai Production City</p>
            <p className="mb-2 font-jura">Dubai, UAE</p>
            <p className="mb-2 font-jura">Phone: +971 50 480 4408</p>
            <p className="mb-6 font-jura">Email: info@teleios.ae</p>
          </div>

          <div className="flex gap-4">
            <Button
                href="https://www.google.com/maps/dir//Teleios+Dome+D-65+Dubai+Production+City+-+Dubai/@25.0288419,55.1864994,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3e5f6de7e687c19b:0x7ee24a1d13502b20"
                text="Get Directions"
                colored={true}
                newTab
            />
            <Button
              href="/contacts"
              text="Contact Us"
              colored={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}