import { motion } from 'framer-motion';
import { RotateCcw, Shield, Clock, CheckCircle, AlertCircle, Phone } from 'lucide-react';

const returnPolicies = [
	{
		icon: Clock,
		title: '24-Hour Return Window',
		description: 'Items can be returned within 24 hours of purchase for a full refund.',
		details: [
			'Must be in original packaging',
			'Items must be unopened and unused',
			'Receipt or order confirmation required',
		],
	},
	{
		icon: Shield,
		title: 'Quality Guarantee',
		description: 'We stand behind the quality of all our products.',
		details: [
			'Immediate replacement for defective items',
			'Full refund if not satisfied with quality',
			'No time limit on quality-related returns',
		],
	},
	{
		icon: CheckCircle,
		title: 'Custom Order Policy',
		description: 'Special considerations for custom and personalized items.',
		details: [
			'Custom cakes cannot be returned unless defective',
			'Design changes must be made 48 hours before pickup',
			'Full refund if we cannot fulfill custom specifications',
		],
	},
];

const returnProcess = [
	{
		step: 1,
		title: 'Contact Us',
		description: 'Call or visit our store to initiate the return process.',
		icon: Phone,
	},
	{
		step: 2,
		title: 'Bring Your Items',
		description: 'Bring the items and your receipt to our store.',
		icon: RotateCcw,
	},
	{
		step: 3,
		title: 'Get Your Refund',
		description: 'Receive your refund in the original payment method.',
		icon: CheckCircle,
	},
];

const nonReturnableItems = [
	'Custom cakes (unless defective)',
	'Items consumed or partially consumed',
	'Items without original packaging',
	'Items purchased more than 24 hours ago (except quality issues)',
	'Special order items (unless defective)',
];

export default function Returns() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Hero Section */}
			<section className="bg-primary-800 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-4xl md:text-6xl font-display font-bold mb-6"
					>
						Returns & Refunds
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-xl text-primary-200 max-w-3xl mx-auto"
					>
						Your satisfaction is our priority. Learn about our return policy and how to get help.
					</motion.p>
				</div>
			</section>

			{/* Return Policies */}
			<section className="py-16 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
							Our Return Policy
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							We want you to be completely satisfied with your purchase
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{returnPolicies.map((policy, index) => {
							const Icon = policy.icon;
							return (
								<motion.div
									key={policy.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
								>
									<div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
										<Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
									</div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
										{policy.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
										{policy.description}
									</p>
									<ul className="space-y-2">
										{policy.details.map((detail, idx) => (
											<li key={idx} className="flex items-start gap-2">
												<div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
												<span className="text-sm text-gray-600 dark:text-gray-300">
													{detail}
												</span>
											</li>
										))}
									</ul>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Return Process */}
			<section className="py-16 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
							How to Return Items
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							Simple steps to process your return
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{returnProcess.map((step, index) => {
							const Icon = step.icon;
							return (
								<motion.div
									key={step.step}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									className="text-center"
								>
									<div className="bg-accent-100 dark:bg-accent-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
										<Icon className="w-10 h-10 text-accent-600 dark:text-accent-400" />
										<div className="absolute -top-2 -right-2 bg-accent-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
											{step.step}
										</div>
									</div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
										{step.title}
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										{step.description}
									</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Non-Returnable Items */}
			<section className="py-16 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
								Items That Cannot Be Returned
							</h2>
							<p className="text-gray-600 dark:text-gray-300 mb-6">
								For health and safety reasons, certain items cannot be returned.
								However, we still guarantee the quality of these items.
							</p>

							<ul className="space-y-3">
								{nonReturnableItems.map((item, index) => (
									<li key={index} className="flex items-start gap-3">
										<AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
										<span className="text-gray-700 dark:text-gray-300">
											{item}
										</span>
									</li>
								))}
							</ul>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8"
						>
							<div className="text-center">
								<Shield className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
								<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									Quality Guarantee
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-6">
									Even if an item can't be returned, we guarantee its quality.
									If you're not satisfied with any product, we'll make it right.
								</p>
								<div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
									<p>• Immediate replacement for defective items</p>
									<p>• Store credit for quality issues</p>
									<p>• No questions asked policy</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Contact Information */}
			<section className="py-16 bg-primary-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl font-display font-bold mb-4"
					>
						Need Help with a Return?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
					>
						Our customer service team is here to help make the return process as
						smooth as possible.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
					>
						<div>
							<Phone className="w-8 h-8 mx-auto mb-2" />
							<h3 className="font-semibold mb-1">Call Us</h3>
							<p className="text-primary-200">(555) 123-BAKE</p>
						</div>
						<div>
							<Clock className="w-8 h-8 mx-auto mb-2" />
							<h3 className="font-semibold mb-1">Store Hours</h3>
							<p className="text-primary-200">Mon-Fri: 7AM-7PM</p>
						</div>
						<div>
							<CheckCircle className="w-8 h-8 mx-auto mb-2" />
							<h3 className="font-semibold mb-1">Quick Response</h3>
							<p className="text-primary-200">Same-day resolution</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
						className="flex flex-col sm:flex-row gap-4 justify-center"
					>
						<button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
							Contact Customer Service
						</button>
						<button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
							Visit Our Store
						</button>
					</motion.div>
				</div>
			</section>
		</div>
	);
}