import type {Metadata} from "next";
import GlobalHero from "@/app/components/ui/GlobalHero";
import type {AccordionItem} from "@/app/components/ui/MainAccordion";
import MainAccordion from "@/app/components/ui/MainAccordion";

const accordionItems: AccordionItem[] = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p>
          Welcome to Teleios Dome Dubai (&#34;Teleios Dome&#34;, &#34;we&#34;, &#34;us&#34;, or &#34;our&#34;). We are located at IMPZ D65, Dubai, UAE. We are committed to protecting the privacy and security of the personal information of our customers and website visitors (&#34;you&#34;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [teleiosdome.com] (the &#34;Site&#34;), use our services (including sim racing experiences, event bookings, championship participation, educational programs, and watch parties), or interact with us in any other way.
        </p>
        <p>
          Please read this Privacy Policy carefully. By using our Site and Services, you signify your acceptance of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site or use our services.
        </p>
        <p>
          We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the &#34;Last Updated&#34; date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
        </p>
      </>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <p>We may collect personal information about you in a variety of ways. The types of information we may collect include:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Personal Identifiers and Contact Information:</strong> This includes your name, postal address, email address, telephone number, date of birth (for age verification or specific programs), and similar contact data. We collect this when you register on our Site, make a booking, fill out an inquiry or contact form, participate in our events or competitions, or enroll in educational programs.</li>
          <li><strong>Demographic Information:</strong> Information such as your age, gender, and general interests, which you may voluntarily provide.</li>
          <li><strong>Booking and Transaction Information:</strong> Details related to your bookings, purchases, event participation, session times, and history of transactions with us.</li>
          <li><strong>Payment Information:</strong> When you make a purchase, our third-party payment processor, [Stripe], will collect payment information such as credit/debit card details. Teleios Dome does not directly store your full credit card numbers or CVV codes. We may receive limited information from the payment processor, such as the last four digits of your card and expiration date, for verification and record-keeping.</li>
          <li><strong>Children&#39;s Information:</strong> For our educational camps and specific youth programs, we collect information about children (such as name, age, and relevant medical/allergy information for safety purposes) only with the explicit, verifiable consent of a parent or legal guardian.</li>
          <li><strong>Technical and Usage Data (Derivative Data):</strong> Information automatically collected when you access our Site, such as your IP address, browser type, operating system, device information, access times, pages viewed, and referring website addresses. We may also collect information about your interaction with our emails.</li>
          <li><strong>Information from Social Networks:</strong> If you choose to link or connect to our Site using your social media accounts (e.g., Facebook, Instagram), we may receive information from these platforms, such as your name, social network username, public profile information, and email address, in accordance with your privacy settings on those platforms.</li>
          <li><strong>Marketing and Communications Preferences:</strong> Your preferences in receiving marketing communications from us and our third parties, and your communication preferences.</li>
          <li><strong>Information You Voluntarily Provide:</strong> Any other information you choose to provide to us, such as feedback, survey responses, or information provided during customer support interactions.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect for various purposes, including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Providing and Managing Services:</strong> To process your bookings, confirm your participation in experiences, events, and educational programs, manage your account (if any), and provide customer support.</li>
          <li><strong>Communication:</strong> To communicate with you about your bookings, inquiries, account status, updates to our services, and changes to our terms or policies.</li>
          <li><strong>Personalization and Improvement:</strong> To understand how you use our Site and Services, personalize your experience, improve our offerings, develop new products and services, and enhance website functionality.</li>
          <li><strong>Marketing and Advertising:</strong> With your consent where required, to send you newsletters, promotional materials, special offers, and other information about our services, events, or those of our partners that we think may interest you. To deliver targeted advertising, content, and promotions to you on our Site and on third-party websites and platforms based on your interests, online activity, and demographic information (see Section 5 on Cookies and Tracking Technologies).</li>
          <li><strong>Analytics and Performance:</strong> To monitor and analyze usage, trends, and activities in connection with our Site and Services to improve their performance and user experience.</li>
          <li><strong>Future Automated Decision-Making/Profiling:</strong> We may in the future use your information for automated decision-making or profiling to further personalize your experience, offer relevant services, or for marketing efficiency. Should we implement such practices, we will update this policy, provide specific information about the logic involved, the significance, and the envisaged consequences, and ensure compliance with applicable laws, including obtaining necessary consents.</li>
          <li><strong>Security and Fraud Prevention:</strong> To maintain the security and integrity of our Site and Services, prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
          <li><strong>Legal Compliance and Dispute Resolution:</strong> To comply with applicable legal and regulatory obligations, respond to legal requests or processes, enforce our agreements, and resolve disputes.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Disclosure of Your Information",
    content: (
      <>
        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Third-Party Service Providers:</strong> We may share your information with trusted third-party vendors, consultants, and other service providers who perform services for us or on our behalf. These may include:
            <ul className="list-disc pl-5 space-y-1">
              <li>Payment processing</li>
              <li>Email delivery and marketing automation</li>
              <li>Data analytics providers</li>
              <li>Website hosting and cloud storage providers</li>
              <li>Advertising networks and platforms for targeted advertising</li>
              <li>Customer service and support tool providers</li>
            </ul>
            These providers are authorized to use your personal information only as necessary to provide these services to us and are obligated to protect your information.
          </li>
          <li><strong>Legal Obligations and Rights Protection:</strong> If we believe disclosure is necessary or appropriate to: (a) comply with applicable laws, regulations, legal processes, or governmental requests; (b) enforce our Terms and Conditions or other agreements, including investigation of potential violations thereof; (c) detect, prevent, or otherwise address fraud, security, or technical issues; or (d) protect against harm to the rights, property, or safety of Teleios Dome, our users, or the public as required or permitted by law.</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, financing, reorganization, bankruptcy, receivership, sale of company assets, or transition of service to another provider, your information may be sold or transferred as part of such a transaction as permitted by law and/or contract.</li>
          <li><strong>Marketing and Advertising Partners:</strong> With your consent where required, we may share certain information (such as aggregated or de-identified data, or cookie data) with third-party advertising partners to facilitate targeted advertising campaigns.</li>
          <li><strong>With Your Explicit Consent:</strong> We may share your information with other third parties when we have your explicit consent to do so.</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Cookies, Tracking Technologies, and Targeted Advertising",
    content: (
      <>
        <p>We and our third-party partners use cookies, web beacons, tracking pixels, and other similar tracking technologies on our Site to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Enable essential Site functionality.</li>
          <li>Analyze Site traffic and usage patterns to improve our Site and Services.</li>
          <li>Personalize your experience (e.g., remember your preferences and settings).</li>
          <li>Deliver relevant, interest-based advertising to you on our Site and other websites (targeted advertising).</li>
          <li>Measure the effectiveness of our advertising campaigns.</li>
        </ul>
        <p>When you first visit our Site, you will be presented with options to manage your cookie preferences, particularly for non-essential cookies like those used for advertising and analytics. Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Site.</p>
        <p>For more detailed information about the cookies we use, their purposes, and how you can manage your preferences, please see our Cookie Policy.</p>
      </>
    ),
  },
  {
    title: "6. Data Security",
    content: (
      <>
        <p>
          We implement and maintain reasonable administrative, technical, and physical security measures designed to protect the personal information you provide against accidental, unlawful, or unauthorized destruction, loss, alteration, access, disclosure, or use. However, please be aware that despite our best efforts, no security measures are perfect or impenetrable, and no method of data transmission over the Internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.
        </p>
      </>
    ),
  },
  {
    title: "7. Data Retention",
    content: (
      <>
        <p>
          We retain your personal data for as long as it is reasonably necessary to fulfill the purposes for which it was collected, including to provide our Services, operate our business, resolve disputes, establish legal defenses, conduct audits, pursue legitimate business interests, enforce our agreements, and comply with applicable legal and regulatory obligations.
        </p>
      </>
    ),
  },
  {
    title: "8. Your Data Protection Rights",
    content: (
      <>
        <p>Under applicable data protection laws in the UAE, you may have certain rights regarding your personal information. These rights may include:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>The Right to Access:</strong> You have the right to request access to the personal information we hold about you and to receive a copy of it.</li>
          <li><strong>The Right to Rectification:</strong> You have the right to request that we correct any inaccurate personal information and to have any incomplete personal information completed.</li>
          <li><strong>The Right to Erasure (Right to be Forgotten):</strong> You have the right to request the deletion or removal of your personal information under certain circumstances (e.g., if the data is no longer necessary for the purpose it was collected, or if you withdraw consent where consent was the basis for processing).</li>
          <li><strong>The Right to Restrict Processing:</strong> You have the right to request the restriction of processing of your personal information under certain circumstances (e.g., if you contest the accuracy of the data, or if the processing is unlawful).</li>
          <li><strong>The Right to Object to Processing:</strong> You have the right to object to the processing of your personal information under certain circumstances, particularly where we are processing your data for direct marketing purposes or relying on legitimate interests as our legal basis.</li>
          <li><strong>The Right to Data Portability:</strong> You have the right to request to receive your personal information in a structured, commonly used, and machine-readable format, and to have it transmitted to another controller, under certain conditions.</li>
          <li><strong>The Right to Withdraw Consent:</strong> Where we rely on your consent as the legal basis for processing your personal information (e.g., for direct marketing emails or certain cookies), you have the right to withdraw your consent at any time. Withdrawing consent will not affect the lawfulness of processing based on consent before its withdrawal.</li>
          <li><strong>Rights Related to Automated Decision-Making and Profiling:</strong> If and when we engage in automated decision-making, including profiling, that produces legal effects concerning you or similarly significantly affects you, we will inform you about the logic involved, as well as the significance and the envisaged consequences of such processing for you, and you will have the right to obtain human intervention, to express your point of view, and to contest the decision.</li>
        </ul>
        <p>To exercise any of these rights, please contact us using the details provided in the &#34;Contact Us&#34; section below. We may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data (or to exercise any of your other rights).</p>
      </>
    ),
  },
  {
    title: "9. International Data Transfers",
    content: (
      <>
        <p>Your information, including personal data, may be transferred to, stored, and processed in countries other than the UAE where our servers or third-party service providers are located. These countries may have data protection laws that are different from the laws of the UAE. When we transfer your personal data to other countries, we will take appropriate measures to ensure that your information is protected in accordance with this Privacy Policy and applicable data protection laws.</p>
      </>
    ),
  },
  {
    title: "10. Policy for Children",
    content: (
      <>
        <p>We do not knowingly collect personal information from children without parental consent, except for our educational camps and youth programs. For these specific programs, we collect children&#39;s personal information (e.g., name, age, relevant medical/allergy details) only with the explicit, verifiable consent of a parent or legal guardian, and such information is used solely for the purpose of administering and ensuring the safety of the child during the program. If you believe we have inadvertently collected information from a child without proper consent, please contact us immediately so we can take appropriate action.</p>
      </>
    ),
  },
  {
    title: "11. Third-Party Websites",
    content: (
      <>
        <p>Our Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave our Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. Before visiting and providing any information to any third-party websites, you should inform yourself of the privacy policies and practices (if any) of the third party responsible for that website, and should take those steps necessary to, in your discretion, protect the privacy of your information. We are not responsible for the content or privacy and security practices and policies of any third parties, including other sites, services, or applications that may be linked to or from our Site.</p>
      </>
    ),
  },
  {
    title: "12. Contact Us",
    content: (
      <>
        <p>If you have any questions, comments, or concerns about this Privacy Policy, our data practices, or if you wish to exercise your data protection rights, please contact us at:</p>
        <p>Teleios Dome Dubai<br />
        IMPZ D65, Dubai, UAE<br />
        Email: <a href="mailto:info@teleios.ae" className="underline text-white">info@teleios.ae</a><br />
        Phone: <a href="tel:+971504804408" className="underline text-white">+971 50 480 4408</a></p>
        <p>We will endeavor to respond to your inquiry as soon as possible.</p>
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy | Teleios Dome Dubai",
  description: "Read the Teleios Dome Dubai Privacy Policy to understand how we collect, use, and protect your personal information.",
  keywords: ["Teleios Dome privacy policy", "Dubai data protection", "website privacy"],
  openGraph: {
    title: "Privacy Policy | Teleios Dome Dubai",
    description: "Read the Teleios Dome Dubai Privacy Policy to understand how we collect, use, and protect your personal information.",
    url: "https://teleios-dome-36ev.vercel.app/privacy-policy",
    siteName: "Teleios Dome",
    images: [
      {
        url: "https://teleios-dome-36ev.vercel.app/images/home/hero_main.jpg",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Teleios Dome",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Teleios Dome Dubai",
    description: "Read the Teleios Dome Dubai Privacy Policy to understand how we collect, use, and protect your personal information.",
    images: ["https://teleios-dome-36ev.vercel.app/images/home/hero_main.jpg"],
  },
};

export default function Page() {
  return (
    <main>
      <GlobalHero
        imageSrc=""
        title="Privacy Policy"
        subtitle="Last Updated: 01/06/2025"
        height="third"
        strokeTitle={false}
        overlay="dark"
        blurIntensity="backdrop-blur-sm"
      />
      <MainAccordion
        id="PrivacyPolicy"
        sectionNumber={5}
        subtitle="Privacy Policy"
        items={accordionItems}
        bgColor="bg-transparent"
        textColor="text-white"
      />
    </main>
  );
}
