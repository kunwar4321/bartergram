const sections = [
  {
    title: "No Refund Policy",
    content: [
      "As a service-based company, Bartergram provides customised marketing solutions tailored to the specific needs of our clients. Due to the nature of our services, all sales are final. Once a service has been purchased, we do not offer refunds, cancellations, or returns.",
    ],
  },
  {
    title: "Non-Refundable Services",
    content: [
      "All services provided by Bartergram, including but not limited to Influencer Marketing, SEO/SEM, Website Management, Advertisement Production, and other marketing services, are non-refundable. This policy applies to all clients, regardless of the circumstances.",
    ],
  },
  {
    title: "Service Modification",
    content: [
      "If you are not satisfied with the services provided, we encourage you to contact our support team to discuss possible modifications to your project or campaign. We are committed to working with you to ensure that the services meet your expectations.",
    ],
  },
  {
    title: "Exceptions",
    content: [
      "In exceptional cases, where Bartergram is unable to deliver the agreed-upon services due to unforeseen circumstances or failure on our part, we may offer a partial or full refund at our sole discretion. Such cases will be evaluated on an individual basis.",
    ],
  },
  {
    title: "Dispute Resolution",
    content: [
      "If you believe that you have been charged in error or if there is a dispute regarding the services provided, please contact us within 30 days of the invoice date. We will review your case and provide a response within a reasonable time frame.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "If you have any questions or concerns regarding our Refund & Return Policy, please contact us at:",
      "Bartergram",
      "[126, Aram Nagar part 2, Versova Andheri West]",
      "[support@bartergram.co]",
      "[+91 91676 66333]",
    ],
  },
];

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white/10 shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-4xl font-bold mb-8 text-purple-800">
            Refund & Return Policy
          </h1>
          <p className="mb-4 text-purple-500">
            Thank you for choosing Bartergram! We strive to provide the highest
            quality of marketing services to our clients. Please read our Refund
            & Return Policy carefully.
          </p>
          <p className="text-sm text-gray-600">Effective Date: 08/08/2024</p>
        </div>

        {sections.map((section, index) => (
          <section
            key={index}
            className="bg-white/10 shadow-md rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-700">
              {index + 1}. {section.title}
            </h2>
            <div className="text-purple-500 space-y-4">
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default RefundPolicyPage;
