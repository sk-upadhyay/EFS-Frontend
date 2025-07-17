import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authFetch } from "../utils/api";
import { notifySuccess, notifyError } from "../utils/toastify";

const FeedbackPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");
  const [loading, setLoading] = useState(true);
  const [submittingFeedback, setSubmitting] = useState(false);

  const currentUserRole = sessionStorage.getItem("role") || "";
  const userId = sessionStorage.getItem("userId");
  const isViewer = currentUserRole === "VIEWER";

  const emojis = [
    { icon: "😢", label: "Negative" },
    { icon: "😐", label: "Neutral" },
    { icon: "😊", label: "Positive" },
  ];

  const [selectedRating, setSelectedRating] = useState(1); // default to Neutral

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await authFetch(
          `http://localhost:8080/api/events/${eventId}`
        );
        setEvent(data);
      } catch (error) {
        notifyError(error.message || "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleFeedbackSubmit = async () => {
    if (!feedbackMessage.trim()) {
      notifyError("Please enter your feedback before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        message: feedbackMessage,
        sentiment: emojis[selectedRating].label,
        event: { id: parseInt(eventId) },
        user: { id: parseInt(userId) },
      };

      await authFetch("http://localhost:8080/api/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      notifySuccess("Feedback submitted successfully!");
      setFeedbackMessage("");
      setSelectedRating(1); // reset to Neutral

      const updated = await authFetch(
        `http://localhost:8080/api/events/${eventId}`
      );
      setEvent(updated);
    } catch (err) {
      notifyError(err.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading event...</p>;
  if (!event)
    return <p className="text-center mt-8 text-red-500">Event not found.</p>;

  return (
    <div className="flex flex-col items-center justify-start bg-white min-h-screen p-6 box-border overflow-y-auto">
      <div className="page-section w-full bg-white max-w-3xl p-6 rounded-xl shadow-2xl shadow-neutral-400 my-8 ">
        <h2 className="event-page-header uppercase tracking-wider border-b-2 border-gray-400 pb-4 mb-6 text-4xl font-extrabold text-gray-900">
          {event.title}
        </h2>
        <p className="text-xl font-medium text-purple-600 mb-6">{event.date}</p>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          {event.description}
        </p>

        {isViewer && new Date(event.date) < new Date() && (
          <div id="feedbackInputSection" className="pt-6">
            <h4 className="text-xl font-bold mb-4 text-gray-800">
              Leave Your Feedback
            </h4>
            <textarea
              value={feedbackMessage}
              onChange={(e) => {
                const words = e.target.value.split(/\s+/);
                if (words.length <= 30) {
                  setFeedbackMessage(e.target.value);
                } else {
                  // Limit to first 30 words
                  setFeedbackMessage(words.slice(0, 30).join(" "));
                }
              }}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              placeholder="Share your thoughts..."
              disabled={submittingFeedback}
            />
            <div className="flex justify-center space-x-4">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedRating(index)}
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 ${
                    selectedRating === index
                      ? "border-blue-500 bg-blue-50 shadow-lg scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  aria-label={emoji.label}
                >
                  {emoji.icon}
                </button>
              ))}
            </div>

            <button
              onClick={handleFeedbackSubmit}
              disabled={submittingFeedback}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition-colors duration-200"
            >
              {submittingFeedback ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        )}

        <div
          id="feedbackPosts"
          className="space-y-6 p-6 rounded-xl border-b border-gray-200"
        >
          <h3 className="text-2xl font-semibold mb-4">Feedbacks</h3>
          {event.feedbacks?.length === 0 ? (
            <p className="text-gray-500 italic">No feedback yet.</p>
          ) : (
            [...event.feedbacks]
              .sort((a, b) => b.id - a.id)
              .map((fb) => {
                return (
                  <div
                    key={fb.id}
                    className="p-4 mb-4 border rounded-lg shadow-sm"
                  >
                    <div className="flex items-center mb-2">
                    <div className="bg-indigo-500 text-white w-10 h-10 flex items-center justify-center rounded-full mr-3 font-bold">
                      {fb.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-800">
                        {fb.userName}
                      </p>
                      <div className="w-6 h-6 border-2 border-b-blue-600 p-4 rounded-full flex items-center justify-center text-lg">
                        {fb.sentiment === "Positive" && "😊"}
                        {fb.sentiment === "Neutral" && "😐"}
                        {fb.sentiment === "Negative" && "😢"}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        {new Date(fb.timestamp).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{fb.message}</p>
                  <span className="text-sm font-medium">{fb.sentiment}</span>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;