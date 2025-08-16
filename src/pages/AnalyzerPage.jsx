import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function AnalyzerPage() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!emailText.trim()) {
      setError("⚠️ Please paste the email text first.");
      return;
    }
    setIsLoading(true);
    setResult(null);
    setError("");

    try {
      // API URL টি আপনার হোস্ট করা ব্যাকএন্ডের URL দিয়ে আপডেট করা হয়েছে
      const response = await fetch("https://security-cheaker-backend.onrender.com/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailText }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("❌ Failed to get analysis. Please check your backend server.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score > 75) return "text-red-400 border-red-400";
    if (score > 40) return "text-yellow-400 border-yellow-400";
    return "text-green-400 border-green-400";
  };

  return (
    <main className="w-full max-w-6xl mx-auto mt-10 mb-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side - Input Section */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
            ✉️ Analyze Suspicious Email
          </h2>

          <div className="relative">
            <textarea
              id="email-input"
              className="peer w-full h-60 p-4 bg-gray-800/60 text-gray-200 rounded-xl border-2 border-gray-700 focus:border-green-400 outline-none transition duration-300 placeholder-transparent resize-none shadow-inner"
              placeholder="Paste email text here..."
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              disabled={isLoading}
            />
            <label
              htmlFor="email-input"
              className="absolute left-4 -top-2.5 text-sm text-green-400 bg-gray-900/80 px-1 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-green-400 peer-focus:text-sm"
            >
              Email Content
            </label>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full mt-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "🚀 Analyze Email"}
          </button>

          {error && (
            <p className="text-red-500 mt-4 text-center font-semibold">{error}</p>
          )}
        </motion.div>

        {/* Right Side - Result Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700 flex flex-col items-center justify-center"
            >
              <h2 className="text-2xl font-bold text-green-300 mb-6">
                📊 Analysis Result
              </h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className={`w-40 h-40 rounded-full flex justify-center items-center text-4xl font-bold border-8 ${getScoreColor(result.riskScore)} shadow-lg mb-6`}
              >
                {result.riskScore}%
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center"
              >
                <h3 className="text-xl font-semibold text-green-400">
                  {result.verdict}
                </h3>
                <p className="text-gray-300 mt-2 whitespace-pre-wrap leading-relaxed">
                  {result.analysis}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}