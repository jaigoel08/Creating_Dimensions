import { useRef, useState } from "react";
import MessageList from "./MessageList";

const Mentor = () => {
  const [conversation, setConversation] = useState(null);
  const messageInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
   let url = "http://localhost:3000/student/conversation";
    if (conversation) {
      url = `${url}/${conversation._id}`;
    }
    fetch(url, {
      method: conversation ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: messageInputRef.current.value,
        model: "gemini-1.5-flash",
      }),
    })
    .then((res) => res.json())
    .then((conversation) => {
      setConversation(conversation);
      messageInputRef.current.value = '';
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">
              {conversation?.title || "Your Study Assistant"}
            </h2>
            <button 
              className="bg-white text-purple-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition duration-200 transform hover:scale-105 flex items-center gap-2 shadow-md"
              onClick={() => setConversation(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Start New Chat
            </button>
          </div>
          <p className="text-blue-100 mt-2">Ask questions, get explanations, and enhance your learning experience</p>
        </div>

        <div className="h-[500px] overflow-y-auto p-8 bg-gray-50">
          <MessageList conversation={conversation} />
        </div>

        <div className="p-8 bg-white border-t border-gray-100">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              placeholder="Ask anything about your studies..."
              ref={messageInputRef}
              disabled={loading}
              className="flex-1 px-6 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 disabled:bg-gray-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed font-medium flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Mentor