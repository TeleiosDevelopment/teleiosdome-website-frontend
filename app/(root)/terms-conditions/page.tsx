import type {Metadata} from "next";
import MainAccordion, {AccordionItem} from "@/app/components/ui/MainAccordion";
import GlobalHero from "@/app/components/ui/GlobalHero";

export const metadata: Metadata = {
  title: "Terms & Conditions | Teleios Dome Dubai",
  description: "Review the Terms & Conditions for using the Teleios Dome Dubai website and services, including booking policies and venue rules.",
  keywords: ["Teleios Dome terms and conditions", "Dubai venue terms", "booking policy"],
  openGraph: {
    title: "Terms & Conditions | Teleios Dome Dubai",
    description: "Review the Terms & Conditions for using the Teleios Dome Dubai website and services, including booking policies and venue rules.",
    url: "https://www.teleiosdome.com/terms-conditions",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://www.teleiosdome.com/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "terms conditions - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Teleios Dome Dubai",
    description: "Review the Terms & Conditions for using the Teleios Dome Dubai website and services, including booking policies and venue rules.",
    images: ["https://www.teleiosdome.com/images/home/hero_main.jpg"],
  },
};

export default function Page() {
  const accordionItems: AccordionItem[] = [
    {
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p>
             By accessing and using the website [teleiosdome.com] (the &#34;Site&#34;) and the services, experiences, events, and facilities offered by Teleios Dome Dubai, a business operating at [IMPZ D65, Dubai, UAE] (&#34;Teleios Dome&#34;, &#34;we&#34;, &#34;us&#34;, or &#34;our&#34;), you (&#34;User&#34;, &#34;you&#34;) agree to comply with and be bound by these Terms and Conditions (&#34;Terms&#34;) and our Privacy Policy [Link to Privacy Policy], which is incorporated herein by reference. If you do not agree to these Terms or the Privacy Policy, you must not use this Site or our Services.
          </p>
          <p>
            These Terms apply to all visitors, users, and others who access or use the Site or our Services. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Site or Services after any such changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.
          </p>
        </>
      ),
    },
    {
      title: "2. Services Offered",
      content: (
        <>

          <ul className="list-disc pl-5 space-y-1">
            <li>Teleios Dome provides sim racing experiences</li>
            <li>corporate and private event hosting</li>
            <li>organized championships</li>
            <li>motorsport watch parties</li>
            <li>educational programs (including camps and tours)</li>
            <li>and related services (collectively, the &#34;Services&#34;)</li>
          </ul>
          <p>
            All Services are subject to availability, these Terms, and any specific terms or rules applicable to a particular Service or event.
          </p>
        </>
      ),
    },
    {
      title: "3. Bookings, Payments, and Cancellations",
      content: (
        <>
          <p>
            <strong>3.1. Bookings:</strong> All bookings for Services must be made through our official booking channels (our Site, by phone, or in-person at our venue, as applicable). Bookings are considered confirmed only upon receipt of full payment or a specified deposit, as detailed at the time of booking. You must provide accurate and complete information when making a booking.
          </p>
          <p>
            <strong>3.2. Pricing:</strong> Prices for Services are listed on our Site or provided upon inquiry and are quoted in AED (United Arab Emirates Dirham) unless otherwise specified. Prices are subject to change without notice but changes will not affect bookings already confirmed and paid for. Prices may be subject to applicable taxes (e.g., VAT) as per UAE law.
          </p>
          <p>
            <strong>3.4. Cancellation, Refund, and Rescheduling Policy:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              (a) Individual Race Experiences (e.g., 20/40/60 min sessions, coaching): Cancellations made at least 24 hours prior to the scheduled booking time are eligible for a one-time option to reschedule to a new date/time, subject to availability.
              Cancellations made less than 24 hours prior to the scheduled booking time, or no-shows, will not be eligible for a refund.
              Rescheduling requests made less than 24 hours prior may be accommodated at our discretion, subject to availability and a potential rescheduling fee of 30AED.
            </li>
            <li>
              (b) Group Bookings & Events (e.g., birthdays, bachelor parties): A non-refundable deposit of 50% of the total estimated cost is required to secure the booking.
              Full payment is due 7 days prior to the event date, unless otherwise agreed.
              Cancellations made 7 days or less prior to the event date will result in forfeiture of all payments made.
            </li>
            <li>
              (d) Championships, Leagues, and Educational Camps: Specific cancellation and refund policies for these programs will be detailed in their respective registration forms or program descriptions and will supersede the general policies above.
            </li>
            <li>
              (e) Teleios Dome Cancellations: Teleios Dome reserves the right to cancel or reschedule any Service or booking due to unforeseen circumstances, including but not limited to technical failures, safety concerns, or insufficient participation for specific events. In such cases, affected users will be notified as soon as possible and offered a choice of a full refund for the cancelled Service or an option to reschedule to a mutually agreeable alternative date/time at no additional charge.
            </li>
          </ul>
          <p>
            <strong>3.5. Late Arrivals:</strong> We recommend arriving 10-15 minutes prior to your scheduled booking start time for check-in and briefing. If you or your group members arrive late, your session duration may be reduced to avoid delaying subsequent bookings, and no refund or compensation will be provided for the missed time.
          </p>
        </>
      ),
    },
    {
      title: "4. User Conduct and Venue Rules",
      content: (
        <>
          <p>
          All users, guests, and participants must adhere to the following rules of conduct while at Teleios Dome premises:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>4.1. Respectful Behavior:</strong> Treat all Teleios Dome staff, other guests, and property with respect and courtesy. Any form of aggressive, abusive, discriminatory, or harassing behavior, or any action that disrupts the enjoyment of others, will not be tolerated.
            </li>
            <li>
              <strong>4.2. Safety Instructions:</strong> Listen attentively to and strictly follow all safety briefings, instructions, and guidelines provided by Teleios Dome staff before and during any activity. This is crucial for your safety and the safety of others.
            </li>
            <li>
              <strong>4.3. Simulator Use:</strong> Use the simulators and other equipment only for their intended purpose and as instructed. Do not tamper with or attempt to modify any equipment. Any intentional or negligent damage to Teleios Dome property may result in the user being held liable for the full cost of repair or replacement.
            </li>
            <li>
              <strong>4.4. Age, Height, and Health Restrictions:</strong> Minimum age for standard sim racing experiences is 5 years, and a minimum height of 110 cm is required for comfortable and safe operation of the simulators. Staff may verify age/height.
              Specific age restrictions apply to Kids Camps and will be detailed in the camp information.
              Participants with certain medical conditions (e.g., epilepsy, heart conditions, back or neck problems, recent surgery, pregnancy) or those susceptible to motion sickness should consult their doctor before participating. Participation is at your own risk. Please inform staff of any relevant conditions.
            </li>
            <li>
              <strong>4.5. Food and Beverages:</strong> Only food and beverages purchased at the Teleios Dome barista and lounge area may be consumed on the premises, unless specific arrangements have been made for a private catered event. No outside food or drink is permitted.
            </li>
            <li>
              <strong>4.6. Alcohol and Prohibited Substances:</strong> Teleios Dome is an alcohol-free venue during general operating hours. Individuals who are, or appear to be, under the influence of alcohol or illegal drugs will be denied entry or participation in activities and may be asked to leave the premises without a refund. No illegal substances are permitted on the premises.
            </li>
            <li>
              <strong>4.7. Smoking and Vaping:</strong> Teleios Dome is a strictly smoke-free and vape-free facility. Designated smoking areas may be available outside the venue.
            </li>
            <li>
              <strong>4.8. Personal Belongings:</strong> Users are responsible for their personal belongings. Teleios Dome accepts no liability for any lost, stolen, or damaged items.
            </li>
            <li>
              <strong>4.9. Dress Code:</strong> Comfortable clothing and closed-toe shoes are recommended for sim racing.
            </li>
            <li>
              <strong>4.10. Right to Refuse Service/Entry:</strong> Teleios Dome staff reserve the right to refuse service, deny entry, or remove any individual or group from the premises who fails to comply with these Terms, staff instructions, behaves in an unsafe or disruptive manner, or whose presence is deemed detrimental to the safety or enjoyment of others, without any refund or compensation.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "5. Intellectual Property",
      content: (
        <>
          <p>
              All content present on the Site and within the Teleios Dome venue, including but not limited to text, graphics, logos, images, audio clips, video content, data compilations, software, simulator designs (where proprietary), brand names, and trademarks (collectively, &#34;Content&#34;), is the property of Teleios Dome or its content suppliers and is protected by UAE and international copyright, trademark, and other intellectual property laws. You may not copy, reproduce, republish, upload, post, transmit, distribute, or modify any Content in any way without prior written permission from Teleios Dome.
          </p>
        </>
      ),
    },
    {
      title: "6. Website Use and Accuracy",
      content: (
        <>
          <p>
            <strong>6.1. Lawful Use:</strong> You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of, the Site by any third party.
          </p>
          <p>
            <strong>6.2. Prohibited Conduct:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              You are prohibited from posting or transmitting to or from this Site any material:
              (a) that is threatening, defamatory, obscene, indecent, seditious, offensive, pornographic, abusive, liable to incite racial hatred, discriminatory, menacing, scandalous, inflammatory, blasphemous, in breach of confidence, in breach of privacy or which may cause annoyance or inconvenience;
            </li>
            <li>
              (b) for which you have not obtained all necessary licenses and/or approvals;
            </li>
            <li>
              (c) which constitutes or encourages conduct that would be considered a criminal offence, give rise to civil liability, or otherwise be contrary to the law of or infringe the rights of any third party, in the UAE or any other country in the world.
            </li>
          </ul>
          <p>
            <strong>6.3. Accuracy of Information:</strong> While we endeavor to ensure that the information on the Site is correct, we do not warrant the accuracy and completeness of the material on the Site. We may make changes to the material on the Site, or to the Services and prices described in it, at any time without notice. The material on the Site may be out of date, and we make no commitment to update such material.
          </p>
          <p>
            <strong>6.4. Availability:</strong> We will not be liable if for any reason the Site is unavailable at any time or for any period. Access to the Site may be suspended temporarily and without notice in the case of system failure, maintenance, or repair, or for reasons beyond our control.
          </p>
        </>
      ),
    },
    {
      title: "7. Limitation of Liability and Assumption of Risk",
      content: (
        <>
          <p>
            <strong>7.1. Assumption of Risk:</strong> You acknowledge that participation in sim racing and related activities carries inherent risks, including but not limited to the risk of minor physical discomfort, motion sickness, or, in rare cases, injury. By participating, you voluntarily assume all risks associated with these activities.
          </p>
          <p>
            <strong>7.2. No Liability for Indirect Damages:</strong> To the fullest extent permitted by applicable UAE law, Teleios Dome, its directors, employees, partners, agents, suppliers, or affiliates, shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>your access to or use of or inability to access or use the Site or Services;</li>
            <li>any conduct or content of any third party on the Site or at the venue;</li>
            <li>any content obtained from the Site or Services;</li>
            <li>unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</li>
          </ul>
          <p>
            <strong>7.3. Aggregate Liability:</strong> In no event shall Teleios Dome&#39;s aggregate liability for all claims relating to the Services exceed the total amount paid by you to Teleios Dome for the specific Service giving rise to the claim in the preceding three (3) months.
          </p>
          <p>
            <strong>7.4. Exclusions:</strong> Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages, so the limitations above may not apply to you to the extent prohibited by local law.
          </p>
        </>
      ),
    },
    {
      title: "8. Indemnification",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-1">
            <li>You agree to defend, indemnify, and hold harmless Teleios Dome and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney&#39;s fees), resulting from or arising out of:</li>
            <li>a) your use and access of the Site and Services, by you or any person using your account and password;</li>
            <li>b) a breach of these Terms;</li>
            <li>c) Content posted on the Site.</li>
          </ul>
        </>
      ),
    },
    {
      title: "9. Governing Law and Dispute Resolution",
      content: (
        <>

          <ul className="list-disc pl-5 space-y-1">
            <li>These Terms shall be governed and construed in accordance with the laws of the Emirate of Dubai and the applicable federal laws of the United Arab Emirates, without regard to its conflict of law provisions.</li>
            <li>Any dispute, claim or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation or validity thereof, including the determination of the scope or applicability of this agreement to arbitrate, shall be determined by arbitration in Dubai, UAE, before a single arbitrator, in accordance with the Rules of Arbitration of the Dubai International Arbitration Centre (DIAC), which Rules are deemed to be incorporated by reference into this clause. The language of the arbitration shall be English.</li>
            <li>Alternatively, Teleios Dome may, at its sole discretion, elect to resolve any dispute through the competent courts of Dubai.</li>
          </ul>
        </>
      ),
    },
    {
      title: "10. Severability",
      content: (
        <>
          <p>
     If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding the Service.
          </p>
        </>
      ),
    },
    {
      title: "11. Waiver",
      content: (
        <>
          <p>
          No waiver by Teleios Dome of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Teleios Dome to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.
          </p>
        </>
      ),
    },
    {
      title: "12. Contact Information",
      content: (
        <>

          <ul className="list-disc pl-5 space-y-1">
            <li>Teleios Dome Dubai</li>
            <li>IMPZ D 65, Dubai, UAE</li>
            <li>Email: info@teleios.ae</li>
            <li>Phone: +971 50 480 4408</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <main >
      <GlobalHero
        imageSrc=""
        title="Terms & Conditions"
        subtitle="Review the rules for using our services and venue"
        height="half"
        strokeTitle={false}
        overlay="dark"
        blurIntensity="backdrop-blur-sm"
      />
      <MainAccordion
          id="TermsConditions"
          subtitle="Terms & Conditions"
          items={accordionItems}
          bgColor="bg-transparent"
          textColor="text-white" sectionNumber={0}
      />
    </main>
  );
}
