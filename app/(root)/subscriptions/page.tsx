"use client";

const plans = [
    {
        name: "Free",
        displayPrice: "₹0",
        period: "forever",
        description: "Get started at no cost",
        features: ["5 projects", "Basic analytics", "Email support"],
        cta: "Get started",
        highlighted: false,
    },
    {
        name: "Pro",
        displayPrice: "₹999",
        period: "per month",
        description: "For power users",
        features: [
            "Unlimited projects",
            "Advanced analytics",
            "Priority support",
            "Custom exports",
        ],
        cta: "Upgrade to Pro",
        highlighted: true,
    },
    {
        name: "Enterprise",
        displayPrice: "₹3,999",
        period: "per month",
        description: "For teams and businesses",
        features: [
            "Everything in Pro",
            "Team collaboration",
            "SSO & audit logs",
            "Dedicated support",
        ],
        cta: "Contact sales",
        highlighted: false,
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 py-16">
            <h1 className="text-4xl font-semibold text-white mb-2 text-center">
                Simple, transparent pricing
            </h1>
            <p className="text-[#888] text-base mb-12 text-center">
                Choose the plan that works best for you
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-2xl p-8 flex flex-col gap-6 border transition-all duration-200
              ${
                            plan.highlighted
                                ? "border-[#c8a97e] bg-[#1a1610]"
                                : "border-[#2a2a2a] bg-[#161616]"
                        }`}
                    >
                        {plan.highlighted && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#c8a97e] text-[#0f0f0f] text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                Most popular
              </span>
                        )}

                        <div>
                            <p className="text-sm text-[#888] mb-1">{plan.description}</p>
                            <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
                        </div>

                        <div className="flex items-baseline gap-1">
              <span className="text-4xl font-semibold text-white">
                {plan.displayPrice}
              </span>
                            <span className="text-sm text-[#888]">/{plan.period}</span>
                        </div>

                        <ul className="flex flex-col gap-3">
                            {plan.features.map((f) => (
                                <li
                                    key={f}
                                    className="flex items-center gap-2 text-sm text-[#bbb]"
                                >
                                    <span className="text-[#c8a97e] text-base">✓</span>
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`mt-auto py-2.5 rounded-xl text-sm font-medium transition-all duration-150 active:scale-95
                ${
                                plan.highlighted
                                    ? "bg-[#c8a97e] text-[#0f0f0f] hover:bg-[#b8996e]"
                                    : "border border-[#2a2a2a] text-white hover:border-[#c8a97e] hover:text-[#c8a97e]"
                            }`}
                        >
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}