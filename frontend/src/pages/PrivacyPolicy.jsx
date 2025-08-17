
const PrivacyPolicy = () => {
  return (
    <div className='mt-20 px-6 max-w-5xl mx-auto'>
      
      {/* Title */}
      <div className='text-center mb-10 font-[outfit]'>
        <h1 className='text-3xl sm:text-4xl font-bold text-slate-800'>
          <span className='text-blue-500'>PayEasy </span>
          Privacy Policy
        </h1>
        <p className='mt-2 text-lg sm:text-xl text-slate-800'>How we handle your information.</p>
      </div>

      {/* Content */}
      <div className='space-y-6 mb-10 text-slate-700 text-base leading-relaxed font-[outfit]'>
        <section>
          <h2 className='text-xl font-semibold text-slate-800 mb-2'>1. Introduction</h2>
          <p>
            Welcome to <strong>PayEasy</strong>'s Privacy Policy. This policy explains how we collect, use, and protect
            your personal and financial information when you use our digital wallet, expense tracking, and payment services.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-slate-800 mb-2'>2. Information We Collect</h2>
          <p>We collect the following types of information to provide and improve our services:</p>
          <ul className='list-disc ml-6 mt-2'>
            <li><strong>Personal Identification Information:</strong> (e.g., name, email address)</li>
            <li><strong>Financial & Transaction Information:</strong> (e.g., linked bank details, payment history, transaction records)</li>
            <li><strong>Device and Usage Data:</strong> (e.g., IP address, browser type, operating system, time zone, session activity)</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-slate-800 mb-2'>3. How We Use Your Information</h2>
          <ul className='list-disc ml-6 mt-2'>
            Your information helps us to:
            <li>Manage your account and authenticate access</li>
            <li>Process transactions and maintain your account</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Improve our services, user experience</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-slate-800 mb-2'>4. Data Security</h2>
          <p>
            We prioritize your privacy and data safety. We use:
          </p>
          <ul className='list-disc ml-6 mt-2'>
            <li><strong>Encryption</strong> for data in transit and at rest</li>
            <li><strong>Secure servers</strong> with limited access</li>
            <li><strong>Regular audits</strong> and monitoring to identify vulnerabilities</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-slate-800 mb-2'>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className='list-disc ml-6 mt-2'>
            <li>Access and receive a copy of your personal data</li>
            <li>Request the deletion of your personal data</li>
            <li>Correct or update inaccurate or outdated information</li>
            <li>Withdraw consent for optional communications at any time</li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-slate-800 mb-2'>6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We’ll notify you by updating the “Last updated” date below.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-semibold text-slate-800 mb-2'>7. Contact Us</h2>
          <p>
            For any questions or concerns about this policy or your data, please contact us at:{' '}
            <a href='mailto:parasss0708@gmail.com' className='text-blue-600 underline'>privacy@payeasy.com</a>
          </p>
        </section>

        <p className='text-sm text-slate-500 mt-6'>Last updated: August 25, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
