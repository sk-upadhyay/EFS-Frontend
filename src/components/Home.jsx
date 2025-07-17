import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-blue-800 text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">EFS Feedback System</h1>
            <p className="text-xl mb-8">
              Streamline your event feedback collection and analysis with our powerful dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Event Feedback Features</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-blue-600 mb-4">
              <i className="flaticon-feedback text-4xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Real-time Feedback</h3>
            <p className="text-gray-600">
              Collect attendee feedback immediately after events for accurate, timely insights.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-blue-600 mb-4">
              <i className="flaticon-analytics text-4xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Visualize feedback data with comprehensive charts and metrics.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="text-blue-600 mb-4">
              <i className="flaticon-report text-4xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Automated Reports</h3>
            <p className="text-gray-600">
              Generate and share detailed feedback reports with stakeholders.
            </p>
          </div>
        </div>
      </div>

      {/* Feedback Examples Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Recent Event Feedback</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Feedback Item 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 mr-2">
                ★★★★☆
              </div>
              <span className="text-gray-600">Annual Tech Conference</span>
            </div>
            <p className="text-gray-700 italic">
              "The workshops were incredibly valuable, though some sessions ran over time."
            </p>
          </div>
          
          {/* Feedback Item 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 mr-2">
                ★★★★★
              </div>
              <span className="text-gray-600">Product Launch Event</span>
            </div>
            <p className="text-gray-700 italic">
              "Excellent organization and engaging presentations. Would definitely attend again!"
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to improve your events?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start collecting valuable feedback to make your next event even better.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition duration-300">
              View Your Events
            </button>
            <button className="bg-transparent hover:bg-white hover:text-gray-800 text-white border-2 border-white px-8 py-3 rounded-md font-medium transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;