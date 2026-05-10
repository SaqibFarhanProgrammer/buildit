import Link from 'next/link';

const plans = [
  {
    id: 1,
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for students and hobbyists exploring the platform.',
    features: [
      'AI Code Editor',
      'Basic Debugging',
      '5 Challenges/day',
      'Personal Dashboard',
      'Community Support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 2,
    name: 'Pro',
    price: '$12',
    period: '/month',
    description: 'For serious developers who ship code every day.',
    features: [
      'Everything in Starter',
      'Advanced AI Assistant',
      'Unlimited Challenges',
      'Team Collaboration',
      'Priority Support',
      'Analytics & Insights',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    id: 3,
    name: 'Team',
    price: '$39',
    period: '/month',
    description: 'Built for engineering teams scaling their workflow.',
    features: [
      'Everything in Pro',
      'Unlimited Team Members',
      'Shared Workspaces',
      'Admin Controls',
      'SSO & Security',
      'Dedicated Support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-white">
      {/* Section Header */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-16 md:mb-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-[#0a0a0a]" />
          <span className="text-xs font-[inter] text-[#0a0a0a]/40 uppercase tracking-[0.2em]">
            Pricing
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-[inter] md:text-4xl lg:text-5xl f[inter] text-[#0a0a0a] leading-tight -tracking-[2px] max-w-xl">
              Simple pricing for{' '}
              <span className="text-[#000]">every developer</span>.
            </h2>
            <p className="mt-4 text-base text-[#0a0a0a]/80 max-w-md leading-tight">
              Start free, upgrade when you need more power. No hidden fees,
              cancel anytime.
            </p>
          </div>
          <p className="text-sm text-[#0a0a0a]/30 font-medium">
            All plans include 14-day free trial
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`group relative p-7 md:p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? 'border-[#0a0a0a]/10 bg-[#0a0a0a] text-white'
                  : 'border-[#0a0a0a]/5 bg-white hover:border-[#0a0a0a]/10 hover:shadow-lg hover:shadow-[#0a0a0a]/[0.03]'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#000] text-white text-[10px] f[inter] uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3
                className={`text-sm font-[inter] uppercase tracking-wider mb-4 ${
                  plan.popular ? 'text-white/50' : 'text-[#0a0a0a]/40'
                }`}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-3">
                <span
                  className={`text-4xl md:text-5xl f[inter] tracking-tight ${
                    plan.popular ? 'text-white' : 'text-[#0a0a0a]'
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm font-medium ${
                    plan.popular ? 'text-white/40' : 'text-[#0a0a0a]/40'
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  plan.popular ? 'text-white/50' : 'text-[#0a0a0a]/50'
                }`}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div
                className={`w-full h-[1px] mb-6 ${
                  plan.popular ? 'bg-white/10' : 'bg-[#0a0a0a]/5'
                }`}
              />

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        plan.popular ? 'text-[#000]' : 'text-[#0a0a0a]/30'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`text-sm ${
                        plan.popular ? 'text-white/70' : 'text-[#0a0a0a]/60'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/signup"
                className={`block w-full text-center py-3 rounded-full text-sm f[inter] transition-all duration-200 ${
                  plan.popular
                    ? 'bg-white text-[#0a0a0a] hover:bg-white/90'
                    : 'bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]/90'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 mt-16 md:mt-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 py-8 border-t border-[#0a0a0a]/5">
          <div className="flex items-center gap-2 text-[#0a0a0a]/30 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-[#0a0a0a]/30 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2 text-[#0a0a0a]/30 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
