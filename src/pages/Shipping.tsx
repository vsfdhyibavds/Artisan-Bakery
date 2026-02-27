import { motion } from 'framer-motion';
import { Truck, Package, Clock, MapPin, Shield, DollarSign } from 'lucide-react';

const shippingZones = [
	{
		zone: 'Local Delivery',
		radius: '0-5 miles',
		fee: 'KES 779',
		time: 'Same day',
		description: 'Available Tuesday through Sunday',
	},
	{
		zone: 'Extended Delivery',
		radius: '5-10 miles',
		fee: 'KES 1,169',
		time: 'Same day',
		description: 'Available Tuesday through Saturday',
	},
	{
		zone: 'Regional Shipping',
		radius: '10-50 miles',
		fee: 'KES 2,079',
		time: '1-2 days',
		description: 'Special packaging for freshness',
	},
	{
		zone: 'State-wide Shipping',
		radius: 'Within state',
		fee: 'KES 3,249',
		time: '2-3 days',
		description: 'Overnight shipping available',
	},
];

const shippingPolicies = [
	{
		icon: Clock,
		title: 'Order Cutoff Times',
		content:
			'Orders must be placed by 2:00 PM for same-day delivery. Orders placed after 2:00 PM will be delivered the next business day.',
	},
	{
		icon: Package,
		title: 'Packaging',
		content:
			'All items are carefully packaged to maintain freshness and prevent damage during transport. We use eco-friendly packaging materials whenever possible.',
	},
	{
		icon: Shield,
		title: 'Delivery Guarantee',
		content:
			'We guarantee your order will arrive fresh and in perfect condition. If you\'re not satisfied, we\'ll replace your order or provide a full refund.',
	},
	{
		icon: MapPin,
		title: 'Delivery Areas',
		content:
			'We deliver throughout the metro area and ship state-wide. Check our delivery map or contact us to confirm delivery to your location.',
	},
];

export default function Shipping() {
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
						Shipping & Delivery
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-xl text-primary-200 max-w-3xl mx-auto"
					>
						Fresh baked goods delivered to your door with care and attention to
						quality.
					</motion.p>
				</div>
			</section>

			{/* Shipping Zones */}
			<section className="py-16 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
							Delivery Zones & Rates
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							Choose the delivery option that works best for you
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{shippingZones.map((zone, index) => (
							<motion.div
								key={zone.zone}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
							>
								<div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<Truck className="w-8 h-8 text-primary-600 dark:text-primary-400" />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
									{zone.zone}
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-2">
									{zone.radius}
								</p>
								<div className="text-2xl font-bold text-accent-600 dark:text-accent-400 mb-2">
									{zone.fee}
								</div>
								<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
									Delivery in {zone.time}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-300">
									{zone.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Shipping Policies */}
			<section className="py-16 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
							Shipping Policies
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{shippingPolicies.map((policy, index) => {
							const Icon = policy.icon;
							return (
								<motion.div
									key={policy.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1 }}
									className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
								>
									<div className="flex items-start gap-4">
										<div className="bg-accent-100 dark:bg-accent-900 p-3 rounded-lg flex-shrink-0">
											<Icon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
										</div>
										<div>
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
												{policy.title}
											</h3>
											<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
												{policy.content}
											</p>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Special Shipping Info */}
			<section className="py-16 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
						>
							<h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
								Special Shipping Considerations
							</h2>

							<div className="space-y-6">
								<div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
										Custom Cakes
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										Custom cakes require special handling and are only available
										for local delivery. We personally deliver all custom cakes to
										ensure they arrive in perfect condition.
									</p>
								</div>

								<div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
										Fragile Items
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										Delicate pastries and decorated items receive extra protective
										packaging. We may recommend pickup for extremely fragile items.
									</p>
								</div>

								<div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
										Large Orders
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										Orders over $150 qualify for free local delivery. We offer
										special rates for catering and event orders.
									</p>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8"
						>
							<div className="text-center">
								<DollarSign className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
								<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
									Free Delivery Threshold
								</h3>
								<div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
									$150+
								</div>
								<p className="text-gray-600 dark:text-gray-300 mb-6">
									Orders over $150 qualify for free local delivery within our
									standard delivery area.
								</p>
								<button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
									Start Your Order
								</button>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Contact for Shipping */}
			<section className="py-16 bg-primary-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl font-display font-bold mb-4"
					>
						Questions About Shipping?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
					>
						Our team is happy to help you choose the best shipping option for your
						needs.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="flex flex-col sm:flex-row gap-4 justify-center"
					>
						<button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
							Contact Us
						</button>
						<button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
							View Delivery Map
						</button>
					</motion.div>
				</div>
			</section>
		</div>
	);
}