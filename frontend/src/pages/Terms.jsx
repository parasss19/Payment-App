
const Terms = () => {
  return (
    <div className="mt-24 px-4 sm:px-8">
      
      <div className="text-center mb-10 font-[outfit]">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
          <span className="text-blue-500">PayEasy </span>
          Terms of Service
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-slate-700">The rules you agree to when using PayEasy.</p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the PayEasy digital wallet application (“Service”), you agree to 
            comply with and be bound by these Terms of Service, as well as all applicable laws and regulations. 
            If you do not agree, you may not use PayEasy.          
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Description of Service</h2>
          <p>PayEasy provides a secure digital wallet that enables users to:</p> 
          <ul className="list-disc ml-5">
            <li>Manage and store funds</li>
            <li>Track expenses</li>
            <li>Transfer money safely</li>
            <li>Access other financial features we may introduce from time to time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. User Accounts</h2>
          <p>To use PayEasy, you must create an account. You agree to:</p>
          <ul className="list-disc ml-5">
            <li>Provide accurate and complete registration details</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Accept responsibility for all activities that occur under your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. User Conduct</h2>
          <p>You agree not to use PayEasy:</p>
          <ul className="list-disc ml-5">
            <li>For unlawful, fraudulent, or abusive purposes</li>
            <li>To disrupt or overload our services or infrastructure</li>
            <li>To attempt unauthorized access to PayEasy’s systems or user accounts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Fees and Charges</h2>
          <p>
            Certain transactions or premium features may incur fees. These fees will always be clearly disclosed to you before processing any transaction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Changes to Terms</h2>
          <p>
            We may update or modify these Terms at any time. If changes are material, 
            we will notify you through the email, or other reasonable means. 
            Your continued use of the Service after updates indicates acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
          <p>
            PayEasy shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Contact</h2>
          <p>
            For any questions about these terms, please email us at{" "}
            <a href="mailto:parasss0708@gmail.com" className="text-blue-500 underline">
              support@payeasy.com
            </a>.
          </p>
        </section>

        <p className="text-sm text-slate-500 mt-8">Last updated: August 25, 2025</p>
      </div>
    </div>
  );
};

export default Terms;
