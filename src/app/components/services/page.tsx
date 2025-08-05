import Navbar from "../navbar";

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Service 1</h3>
              <p className="text-gray-600">
                Detailed description of your first service offering.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Service 2</h3>
              <p className="text-gray-600">
                Detailed description of your second service offering.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Service 3</h3>
              <p className="text-gray-600">
                Detailed description of your third service offering.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
