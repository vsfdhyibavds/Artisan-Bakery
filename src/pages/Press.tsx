import { motion } from 'framer-motion';
import { Calendar, Download, ExternalLink, Award, Newspaper, Camera } from 'lucide-react';
import { formatDate } from '../lib/utils';

const pressReleases = [
	{
		id: '1',
		title: 'Artisan Bakery Wins "Best Local Bakery" for Fifth Consecutive Year',
		date: '2024-01-15',
		excerpt: 'Local community votes Artisan Bakery as the top bakery in the annual City Choice Awards.',
		content: 'We are thrilled to announce that Artisan Bakery has been awarded "Best Local Bakery" for the fifth consecutive year...',
		downloadUrl: '/press/best-bakery-2024.pdf',
	},
	{
		id: '2',
		title: 'New Gluten-Free Line Launches to Meet Growing Demand',
		date: '2024-01-08',
		excerpt: 'Expanding our offerings to serve customers with dietary restrictions while maintaining our commitment to quality.',
		content: 'In response to growing customer demand, Artisan Bakery is proud to introduce our new line of gluten-free products...',
		downloadUrl: '/press/gluten-free-launch.pdf',
	},
	{
		id: '3',
		title: 'Artisan Bakery Partners with Local Schools for Nutrition Education',
		date: '2023-12-20',
		excerpt: 'Educational program teaches children about healthy eating and traditional baking methods.',
		content: 'Artisan Bakery has partnered with three local elementary schools to provide nutrition education...',
		downloadUrl: '/press/school-partnership.pdf',
	},
];

const mediaKit = [
	{
		title: 'High-Resolution Logo',
		description: 'PNG and SVG formats, various sizes',
		downloadUrl: '/media/logo-pack.zip',
		type: 'Images',
	},
	{
		title: 'Product Photography',
		description: 'Professional photos of our signature items',
		downloadUrl: '/media/product-photos.zip',
		type: 'Images',
	},
	{
		title: 'Bakery Interior Photos',
		description: 'High-quality images of our bakery space',
		downloadUrl: '/media/interior-photos.zip',
		type: 'Images',
	},
	{
		title: 'Company Fact Sheet',
		description: 'Key information about our history and mission',
		downloadUrl: '/media/fact-sheet.pdf',
		type: 'Document',
	},
];

const awards = [
	{
		year: '2024',
		title: 'Best Local Bakery',
		organization: 'City Choice Awards',
		description: 'Fifth consecutive year winning this prestigious local award',
	},
	{
		year: '2023',
		title: 'Excellence in Customer Service',
		organization: 'Chamber of Commerce',
		description: 'Recognized for outstanding customer service and community engagement',
	},
	{
		year: '2022',
		title: 'Sustainable Business Practices',
		organization: 'Green Business Alliance',
		description: 'Honored for our commitment to environmental sustainability',
	},
	{
		year: '2021',
		title: 'Community Impact Award',
		organization: 'Downtown Business Association',
		description: 'Acknowledged for positive impact on local community',
	},
];

export default function Press() {
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
						Press & Media
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-xl text-primary-200 max-w-3xl mx-auto"
					>
						Latest news, press releases, and media resources for journalists and partners.
					</motion.p>
				</div>
			</section>

			{/* Press Contact */}
			<section className="py-16 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 mb-16">
						<div className="text-center">
							<h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
								Media Inquiries
							</h2>
							<p className="text-gray-600 dark:text-gray-300 mb-6">
								For press inquiries, interviews, or additional information, please contact:
							</p>
							<div className="space-y-2">
								<p className="text-lg font-semibold text-gray-900 dark:text-white">
									Marie Dubois, Owner & Head Baker
								</p>
								<p className="text-gray-600 dark:text-gray-300">
									Email: press@artisanbakery.com
								</p>
								<p className="text-gray-600 dark:text-gray-300">
									Phone: (+254) 787943878
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Press Releases */}
			<section className="py-16 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
							Recent Press Releases
						</h2>
					</div>

					<div className="space-y-8">
						{pressReleases.map((release, index) => (
							<motion.article
								key={release.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
							>
								<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
									<div className="flex-1">
										<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
											{release.title}
										</h3>
										<div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
											<Calendar className="w-4 h-4" />
											<span>{formatDate(release.date)}</span>
										</div>
									</div>
									<div className="flex gap-3">
										<button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
											<Download className="w-4 h-4" />
											Download PDF
										</button>
										<button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
											<ExternalLink className="w-4 h-4" />
											Read More
										</button>
									</div>
								</div>
								<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
									{release.excerpt}
								</p>
							</motion.article>
						))}
					</div>
				</div>
			</section>

			{/* Awards & Recognition */}
			<section className="py-16 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
							Awards & Recognition
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							Honored to be recognized by our community and industry peers
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{awards.map((award, index) => (
							<motion.div
								key={`${award.year}-${award.title}`}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
							>
								<div className="flex items-start gap-4">
									<div className="bg-accent-100 dark:bg-accent-900 p-3 rounded-lg">
										<Award className="w-6 h-6 text-accent-600 dark:text-accent-400" />
									</div>
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<span className="text-2xl font-bold text-accent-600 dark:text-accent-400">
												{award.year}
											</span>
										</div>
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
											{award.title}
										</h3>
										<p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
											{award.organization}
										</p>
										<p className="text-gray-600 dark:text-gray-300">
											{award.description}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Media Kit */}
			<section className="py-16 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
							Media Kit
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300">
							Download high-quality assets for your stories and articles
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{mediaKit.map((item, index) => (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
							>
								<div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									{item.type === 'Images' ? (
										<Camera className="w-8 h-8 text-primary-600 dark:text-primary-400" />
									) : (
										<Newspaper className="w-8 h-8 text-primary-600 dark:text-primary-400" />
									)}
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									{item.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
									{item.description}
								</p>
								<button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
									<Download className="w-4 h-4" />
									Download
								</button>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-primary-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl font-display font-bold mb-4"
					>
						Need Something Specific?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
					>
						Can't find what you're looking for? Contact our press team for custom assets,
						interviews, or additional information.
					</motion.p>
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
					>
						Contact Press Team
					</motion.button>
				</div>
			</section>
		</div>
	);
}