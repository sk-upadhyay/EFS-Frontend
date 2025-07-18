import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authFetch } from "../utils/api";
import { notifySuccess, notifyError } from "../utils/toastify";
import Loader from "./Loader";

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return "just now";
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  
  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
};

const FeedbackPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittingFeedback, setSubmitting] = useState(false);

  const currentUserRole = sessionStorage.getItem("role") || "";
  const userId = sessionStorage.getItem("userId");
  const isViewer = currentUserRole === "VIEWER";

  const emojis = [
    { icon: "😢", label: "NEGATIVE" },
    { icon: "😐", label: "NEUTRAL" },
    { icon: "😊", label: "POSTIVE" },
  ];

  const [selectedRating, setSelectedRating] = useState(1); // default to Neutral

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await authFetch(
          `https://efs-backend-production.up.railway.app/api/events/${eventId}`
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

      await authFetch("https://efs-backend-production.up.railway.app/api/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      notifySuccess("Feedback submitted successfully!");
      setFeedbackMessage("");
      setSelectedRating(1); // reset to Neutral

      const updated = await authFetch(
        `https://efs-backend-production.up.railway.app/api/events/${eventId}`
      );
      setEvent(updated);
    } catch (err) {
      notifyError(err.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center mt-8"><Loader/></div>;
  if (!event)
    return <p className="text-center mt-8 text-red-500">Event not found.</p>;

  return (
    <div className="w-full bg-white min-h-screen p-4 md:p-6 box-border">
      <div className="w-full bg-white max-w-3xl mx-auto p-4 md:p-6 rounded-xl shadow-2xl shadow-neutral-400 my-4 md:my-8">
        <h2 className="uppercase tracking-wider border-b-2 border-gray-400 pb-2 md:pb-4 mb-4 md:mb-6 text-2xl md:text-4xl font-extrabold text-gray-900">
          {event.title}
        </h2>
        <p className="text-lg md:text-xl font-medium text-purple-600 mb-4 md:mb-6">{event.date}</p>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
          {event.description}
        </p>

        {isViewer && new Date(event.date) < new Date() && (
          <div id="feedbackInputSection" className="pt-4 md:pt-6">
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800">
              Leave Your Feedback
            </h4>
            <textarea
              value={feedbackMessage}
              onChange={(e) => {
                const words = e.target.value.split(/\s+/);
                if (words.length <= 30) {
                  setFeedbackMessage(e.target.value);
                } else {
                  notifyError("Keep it Short")
                }
              }}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              placeholder="Share your thoughts..."
              disabled={submittingFeedback}
            />
            <div className="flex justify-center space-x-2 md:space-x-4 mb-4">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedRating(index)}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-xl md:text-2xl transition-all duration-200 hover:scale-110 ${
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
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 md:px-5 rounded-full shadow-md transition-colors duration-200 text-sm md:text-base"
            >
              {submittingFeedback ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        )}

        <div id="feedbackPosts" className="space-y-4 md:space-y-6 p-4 md:p-6 rounded-xl border-b border-gray-200">
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Feedbacks</h3>
          {event.feedbacks?.length === 0 ? (
            <p className="text-gray-500 italic">No feedback yet.</p>
          ) : (
            [...event.feedbacks]
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((fb) => (
                <div key={fb.id} className="p-3 md:p-4 mb-3 md:mb-4 border rounded-lg shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center mb-2 gap-2">
                    <div className="flex items-center">
                      <div className="bg-indigo-500 text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full mr-2 md:mr-3 font-bold text-sm md:text-base">
                        {fb.userName.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-semibold text-gray-800 text-sm md:text-base">
                        {fb.userName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-b-blue-600 p-3 md:p-4 rounded-full flex items-center justify-center text-base md:text-lg">
                        {fb.sentiment === "POSTIVE" && "😊"}
                        {fb.sentiment === "NEUTRAL" && "😐"}
                        {fb.sentiment === "NEGATIVE" && "😢"}
                      </div>
                      <p className="text-xs text-gray-500">
                        {formatRelativeTime(fb.timestamp)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">{fb.message}</p>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;