import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-10 text-center">
            
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-500/20 p-5 rounded-full">
                <CheckCircle className="w-16 h-16 text-green-400" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                <Sparkles size={18} />
                <span className="text-sm font-medium uppercase tracking-widest">
                  Payment Successful
                </span>
              </div>

              <h1 className="text-4xl font-bold text-white">
                Welcome to Premium 🚀
              </h1>

              <p className="text-slate-400 text-lg">
                Your subscription has been activated successfully.
              </p>
            </div>

            {/* Customer Info */}
            <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">
                Confirmation Sent
              </h3>

              <p className="text-slate-400">
                A receipt and subscription details have been sent to:
              </p>

              <p className="text-green-400 font-medium mt-2 break-all">
                {customerEmail}
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                <h4 className="text-white font-semibold">
                  Unlimited Access
                </h4>
                <p className="text-slate-400 text-sm mt-1">
                  Access all premium features.
                </p>
              </div>

              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                <h4 className="text-white font-semibold">
                  Priority Support
                </h4>
                <p className="text-slate-400 text-sm mt-1">
                  Get help faster from our team.
                </p>
              </div>

              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                <h4 className="text-white font-semibold">
                  Exclusive Tools
                </h4>
                <p className="text-slate-400 text-sm mt-1">
                  Unlock premium-only resources.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                Go to Dashboard
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center border border-slate-700 hover:bg-slate-800 text-slate-300 px-6 py-3 rounded-xl font-medium transition"
              >
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}