import Navbar from "../navbar";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-lg text-gray-600 mb-6">
              Get in touch with us using the information below.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">contact@example.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600">123 Main St, City, State 12345</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
