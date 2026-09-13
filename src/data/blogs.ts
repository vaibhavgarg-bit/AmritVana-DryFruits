import { BlogPost } from '../types';
import { IMAGES } from '../assets/images';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'california-vs-mamra-almonds-guide',
    slug: 'california-vs-mamra-almonds-comparison',
    title: 'California Almonds vs Mamra Almonds: The Ultimate Oil & Nutrient Comparison',
    category: 'Comparisons',
    excerpt: 'Understand why Kashmiri & Iranian Mamra almonds fetch 3-4x the price of standard California almonds, and which one is right for your health goals.',
    publishedDate: '15 Aug 2026',
    readTime: '6 min read',
    coverImage: IMAGES.mamraAlmonds,
    tags: ['Almonds', 'Mamra vs California', 'Brain Health', 'Nutrition Guide'],
    author: {
      name: 'Dr. Aarav Sharma',
      role: 'Ayurvedic Physician & Nutrition Researcher',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    relatedProductIds: ['almond-mamra-kashmiri', 'almond-california-jumbo', 'almond-gurbandi-afghan'],
    content: `
      <h2>The Great Almond Debate: Cultivation, Oil Content, and Health Benefits</h2>
      <p>When walking down a dry fruit market in Delhi's Khari Baoli or shopping online, you will immediately notice the stark price difference between commercial California almonds and traditional Mamra almonds. But what justifies this gap? Let us break down the exact botanical, nutritional, and medicinal differences.</p>
      
      <h3>1. Origin and Farming Methods</h3>
      <p><strong>California Almonds:</strong> Grown extensively in vast monoculture orchards across the Central Valley of California using modern automated irrigation, machine harvesting, and pasteurization. They are mechanically uniform and sweet.</p>
      <p><strong>Mamra Almonds:</strong> Sourced from organic, non-irrigated mountain slopes of Kashmir, Iran, and Afghanistan. Grown using centuries-old rainfed techniques without synthetic chemical fertilizers or automated processing.</p>

      <h3>2. The Natural Oil Content Factor</h3>
      <p>The biggest biological distinction is oil concentration:</p>
      <ul>
        <li><strong>California Almonds:</strong> Contain approx. 25% - 30% natural oil. Much of the oil is often extracted during mechanical processing.</li>
        <li><strong>Mamra Almonds:</strong> Retain a massive 48% - 52% pure, cold-pressed natural almond oil intact inside each concave kernel!</li>
      </ul>
      <p>This high oil content makes Mamra rich in mono-unsaturated fatty acids (MUFA), pure Vitamin E, and neuro-active compounds that cross the blood-brain barrier effectively.</p>

      <h3>3. The Ayurvedic Perspective ("Medhya Rasayana")</h3>
      <p>In classical Charaka Samhita, Mamra is categorized as a Medhya Rasayana — an herb/food that sharpens Dhi (acquisition), Dhriti (retention), and Smriti (recall). For growing children, students, and seniors, soaking 5-7 Mamra kernels overnight and peeling them at sunrise delivers unmatched mental endurance.</p>

      <h3>Verdict: Which should you choose?</h3>
      <p>For daily baking, trail mixes, and almond milk, California Jumbo almonds provide delicious crunch and high plant protein at an economical price. For medicinal brain nourishment, pregnancy nutrition, and longevity, Kashmiri Mamra is well worth the premium investment.</p>
    `
  },
  {
    id: 'cashew-grades-w180-w240-w320-explained',
    slug: 'w180-vs-w240-vs-w320-cashew-grading-guide',
    title: 'W180 vs W240 vs W320: Understanding Cashew Grades Before You Buy',
    category: 'Buying Guides',
    excerpt: 'What do numbers like W180 and W320 really mean? Decode the international cashew grading standard to never get overcharged again.',
    publishedDate: '10 Aug 2026',
    readTime: '5 min read',
    coverImage: IMAGES.w180Cashews,
    tags: ['Cashews', 'Grading Guide', 'Smart Buying', 'Quality Check'],
    author: {
      name: 'Sunita Mehra',
      role: 'Quality Assurance Lead, AmritVana',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    },
    relatedProductIds: ['cashew-w180-king-jumbo', 'cashew-w240-premium', 'cashew-w320-popular'],
    content: `
      <h2>The Secret Code of Cashew Nuts Decoded</h2>
      <p>Have you ever seen letters like W180, W240, W320 on cashew packs and wondered what they indicate? The letter 'W' stands for 'White Wholes' (meaning unbroken, unblemished white kernels), while the number signifies the kernel count per pound (454 grams).</p>
      
      <h3>The Golden Rule of Cashew Grading:</h3>
      <p><strong>The smaller the number, the larger and more luxurious the cashew nut!</strong></p>

      <h3>1. W-180: The "King of Cashews"</h3>
      <p>Only 180 cashew kernels make up a pound. These are giant, jumbo-sized crescent gems. Highly sought after for VIP gifting, royal weddings, and luxury snacking.</p>

      <h3>2. W-240: The Jumbo Standard</h3>
      <p>Yielding roughly 240 kernels per pound, W-240 is noticeably larger than standard grocery cashews. Crisp, beautifully shaped, and strikes the perfect harmony of luxury and price.</p>

      <h3>3. W-320: The Universal Everyday Standard</h3>
      <p>Around 320 nuts per pound. This is the highest selling grade worldwide. Perfect for daily gravies, korma sauces, kaju katli, and healthy snacking.</p>

      <h3>4. W-450 & Broken (Tukda / Split)</h3>
      <p>Smaller whole kernels or mechanically cracked split cashews (JH, K, Tukda). Same delicious taste and nutrition, but ideal for blending into smooth creamy curries and desserts at a lower budget.</p>
    `
  },
  {
    id: 'ajwa-vs-medjool-dates-guide',
    slug: 'ajwa-vs-medjool-dates-health-benefits',
    title: 'Ajwa vs Medjool Dates: Which Blessed Date Variety Should You Buy?',
    category: 'Comparisons',
    excerpt: 'Compare the sacred Ajwa dates of Madinah with the giant Medjool King of Dates across taste, texture, glycemic index, and antioxidant profiles.',
    publishedDate: '02 Aug 2026',
    readTime: '4 min read',
    coverImage: IMAGES.ajwaDates,
    tags: ['Dates', 'Ajwa Madinah', 'Medjool', 'Heart Health'],
    author: {
      name: 'Dr. Aarav Sharma',
      role: 'Ayurvedic Physician & Nutrition Researcher',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    relatedProductIds: ['dates-ajwa-al-madinah', 'dates-royal-medjool-jumbo', 'dates-safawi-madinah'],
    content: `
      <h2>The Desert Superfoods: Sacred Ajwa vs Royal Medjool</h2>
      <p>Dates have been cultivated in the Middle East and North Africa for over 6,000 years. Among hundreds of cultivars, two stand far above the rest: Ajwa of Madinah and Medjool.</p>

      <h3>Ajwa Dates: The Sacred Black Gold</h3>
      <ul>
        <li><strong>Origin:</strong> Exclusively cultivated in the palm groves of Madinah Al-Munawwarah, Saudi Arabia.</li>
        <li><strong>Texture & Flavor:</strong> Fine wrinkled, dark blackish-purple skin, firm yet soft interior with complex prune and caramel undertones.</li>
        <li><strong>Special Properties:</strong> Peer-reviewed biochemical studies show Ajwa has the highest concentration of total polyphenols and natural anti-inflammatory flavonoids among all date varieties.</li>
      </ul>

      <h3>Medjool Dates: The Giant Dessert King</h3>
      <ul>
        <li><strong>Origin:</strong> Jordan Valley and California.</li>
        <li><strong>Texture & Flavor:</strong> Giant, succulent, moist, and tastes like rich maple-brown-sugar caramel.</li>
        <li><strong>Best Use:</strong> The ultimate pre-workout burst of electrolytes (potassium, magnesium) or whole-food sugar substitute for baking.</li>
      </ul>
    `
  },
  {
    id: 'how-to-store-dry-fruits-crisp-guide',
    slug: 'how-to-store-dry-fruits-fresh-for-12-months',
    title: 'How to Store Dry Fruits: The Professional Guide to Keep Them Crisp for 12 Months',
    category: 'Storage & Tips',
    excerpt: 'Prevent rancidity, moisture sogginess, and insect infestation with these foolproof storage techniques tested in our humidity-controlled warehouses.',
    publishedDate: '25 Jul 2026',
    readTime: '5 min read',
    coverImage: IMAGES.snowWalnuts,
    tags: ['Storage Tips', 'Freshness', 'Kitchen Hacks'],
    author: {
      name: 'Sunita Mehra',
      role: 'Quality Assurance Lead, AmritVana',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    },
    relatedProductIds: ['walnut-kashmiri-snow-white-halves', 'pista-iranian-jumbo-akbari', 'anjeer-turkish-dried-figs'],
    content: `
      <h2>The Science of Preserving Nut Oils & Crispness</h2>
      <p>Premium dry fruits are rich in healthy polyunsaturated and monounsaturated fatty acids. While these oils make nuts nutritious, they are sensitive to three natural enemies: <strong>Heat, Oxygen, and Moisture</strong>.</p>

      <h3>1. The Golden Freezer Hack for Walnuts & Pine Nuts</h3>
      <p>Walnuts have a high Omega-3 ALA content. At Indian room temperatures (above 28°C), these delicate oils oxidize over 4-6 weeks, leading to a bitter, rancid taste. Always store walnuts in an airtight zip bag inside the refrigerator or freezer!</p>

      <h3>2. Airtight Glass over Plastic</h3>
      <p>Plastic containers can breathe microscopic oxygen over months. Transfer your roasted pistachios, cashews, and almonds into airtight glass mason jars with rubber gaskets.</p>

      <h3>3. Dry Roasting Revives Sogginess</h3>
      <p>If monsoons have softened your nuts, never microwave them! Instead, toast them on a heavy iron skillet (tawa) on low flame for 3 minutes without oil, let cool completely, and watch the crunch return instantly.</p>
    `
  },
  {
    id: 'top-7-dry-fruits-for-daily-brain-power',
    slug: 'top-dry-fruits-for-brain-memory-focus',
    title: 'Top 7 Dry Fruits for Daily Brain Health, Focus & Memory Boost',
    category: 'Health & Nutrition',
    excerpt: 'Discover the science-backed nut routine for high mental productivity, exams, and neurological longevity.',
    publishedDate: '18 Jul 2026',
    readTime: '7 min read',
    coverImage: IMAGES.trailMixKids,
    tags: ['Brain Food', 'Ayurveda', 'Memory', 'Superfoods'],
    author: {
      name: 'Dr. Aarav Sharma',
      role: 'Ayurvedic Physician & Nutrition Researcher',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    relatedProductIds: ['almond-mamra-kashmiri', 'walnut-kashmiri-snow-white-halves', 'combo-kids-brain-booster-mix'],
    content: `
      <h2>Feeding the Human Brain: Nature's Cognitive Superfoods</h2>
      <p>The human brain is composed of nearly 60% fat. To operate at peak cognitive performance, it requires specific micro-lipids, antioxidants, and trace minerals.</p>

      <h3>1. Kashmiri Walnuts (The Signature Brain Nut)</h3>
      <p>Notice how a walnut kernel perfectly mirrors the left and right hemispheres of the human brain? High in DHA and Alpha-Linolenic Acid (ALA), regular intake enhances memory retention and neural signaling speed.</p>

      <h3>2. Soaked Kashmiri Mamra Almonds</h3>
      <p>Rich in Riboflavin and L-Carnitine, two vital nutrients that prevent cognitive decline and boost neurotransmitter activity.</p>

      <h3>3. Pumpkin & Chia Seeds</h3>
      <p>Rich in Zinc, Magnesium, Copper, and Iron. Zinc is critical for nerve signaling, while magnesium is essential for learning and memory formation.</p>
    `
  },
  {
    id: 'raw-vs-roasted-dry-fruits-nutrition',
    slug: 'raw-vs-roasted-dry-fruits-nutrition-comparison',
    title: 'Raw vs Slow-Roasted Dry Fruits: Which Retains More Nutrients?',
    category: 'Comparisons',
    excerpt: 'Does gentle dry-roasting destroy heat-sensitive vitamins, or does it enhance bioavailability and digestion? Let us explore the laboratory data.',
    publishedDate: '08 Jul 2026',
    readTime: '4 min read',
    coverImage: IMAGES.roastedAlmonds,
    tags: ['Raw vs Roasted', 'Nutrient Retention', 'Health Tips'],
    author: {
      name: 'Dr. Aarav Sharma',
      role: 'Ayurvedic Physician & Nutrition Researcher',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
    relatedProductIds: ['almond-slow-roasted-pink-salt', 'pista-california-roasted-salted', 'cashew-black-pepper-masala'],
    content: `
      <h2>The Heat Question: Raw versus Dry-Roasted</h2>
      <p>Both raw and slow dry-roasted dry fruits offer stellar health benefits. However, understanding their subtle biochemical shifts helps you optimize your daily routine.</p>

      <h3>1. Raw Nuts: Maximum Heat-Sensitive Vitamins</h3>
      <p>Raw nuts retain 100% of their heat-sensitive B vitamins (like Thiamine and Folate) and delicate antioxidant carotenoids. However, their natural phytate content can slightly inhibit mineral absorption.</p>

      <h3>2. Slow Dry-Roasted: Enhanced Digestibility & Zero Oil</h3>
      <p>At AmritVana, our nuts are dry-roasted at low temperatures (below 130°C) without oil. This deactivates phytic acid (making zinc and iron easier to absorb) while keeping healthy monounsaturated fats completely stable.</p>
    `
  }
];
