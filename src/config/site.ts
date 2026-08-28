import type { Product, TeamMember } from '../types'

// Order button link — the real MBNC order/interest form (used for sanitary pads).
export const ORDER_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScH4WYpcJa5ZwFJj_goq98dBvadap1qEVm6Pi-ETfQh4glrwQ/viewform?usp=header'

// Order/interest form for the herbal products (Amalaki, Brahmi, Punarnava, Shatavari, Vasaka).
export const HERBAL_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeLHmZ8OqB8muX3Usj9vt_jxMQfrW-CxaFy6y273tXHFpip8w/viewform?usp=publish-editor'

export const WHATSAPP_NUMBER = '9030505110'
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/^0+/, '91')}`
export const YOUTUBE_LINK = 'https://youtube.com/@mbnc_org'
export const INSTAGRAM_LINK = 'https://instagram.com/mbnc_org'

export const products: Product[] = [
  {
    id: 'amalaki',
    name: 'Amalaki',
    subtitle: 'Indian Gooseberry · Phyllanthus emblica',
    image: '/images/AMALAKI.jpeg',
    category: 'Immunity & Vitality',
    price: 599,
    description:
      'A cornerstone of Ayurvedic wellness, naturally rich in vitamin C, polyphenols, and antioxidants. Traditionally used to support digestion, immunity, healthy skin and hair, and overall vitality — and a key ingredient in classic formulations like Triphala and Chyawanprash.',
    benefits: [
      'Immunity — a stable, natural source of vitamin C',
      'Youthful skin & hair — neutralizes free radicals',
      'Digestion — gently supports healthy Agni without acidity',
      'Natural detoxifier — supports liver function',
      'Metabolic balance — supports healthy blood sugar levels',
    ],
    dosage: null,
    formUrl: HERBAL_FORM_URL,
  },
  {
    id: 'brahmi',
    name: 'Brahmi',
    subtitle: 'Bacopa monnieri',
    image: '/images/BRAHMI.jpeg',
    category: 'Mind & Focus',
    price: 599,
    description:
      'A traditional Ayurvedic herb long associated with cognitive clarity. Brahmi is used to support memory, focus, and calm under stress, with naturally occurring bacosides studied for their neuroprotective, antioxidant properties.',
    benefits: [
      'Boosts brain function — memory, focus, processing speed',
      'Reduces stress & anxiety — calming adaptogen, lowers cortisol',
      'Rich in antioxidants — bacosides protect brain cells',
      'Anti-inflammatory — helps combat chronic inflammation',
    ],
    dosage: 'Standard extract: 300–450mg/day (up to 600mg under medical supervision). Powder: 1–2g daily.',
    formUrl: HERBAL_FORM_URL,
  },
  {
    id: 'punarnava',
    name: 'Punarnava',
    subtitle: 'Boerhavia diffusa',
    image: '/images/PUNARNAVA.jpeg',
    category: 'Kidney & Liver Support',
    price: 599,
    description:
      '"Punarnava" means "that which makes the body new again." Traditionally used in Ayurveda to support kidney and urinary function, liver health, digestion, and healthy fluid balance.',
    benefits: [
      'Supports kidney health & reduces water retention',
      'Promotes liver detoxification',
      'Eases joint discomfort — anti-inflammatory properties',
      'Aids healthy weight management',
      'Improves digestion',
      'Boosts immunity — rich in antioxidants',
    ],
    dosage: null,
    formUrl: HERBAL_FORM_URL,
  },
  {
    id: 'shatavari',
    name: 'Shatavari',
    subtitle: 'Asparagus racemosus · "Queen of Herbs"',
    image: '/images/SHATAVARI.jpeg',
    category: "Women's Wellness & Vitality",
    price: 599,
    description:
      'A rejuvenating Rasayana herb traditionally associated with women\u2019s wellness, though valued as a universal tonic for longevity, strength, and balance at every stage of life.',
    benefits: [
      'Hormonal & reproductive balance',
      'Vitality & energy boost',
      'Stress & nervous system support',
      'Healthy digestion',
      'Immune system shield',
    ],
    dosage: null,
    formUrl: HERBAL_FORM_URL,
  },
  {
    id: 'vasaka',
    name: 'Vasaka',
    subtitle: 'Adhatoda vasaka',
    image: '/images/VASAKA.jpeg',
    category: 'Respiratory Health',
    price: 599,
    description:
      'A traditional medicinal plant long used in Ayurveda for respiratory wellness. Vasaka contains naturally occurring compounds — including vasicine and vasicinone — studied for their effects on the respiratory system, and is traditionally used to support comfortable breathing and healthy mucus clearance.',
    benefits: [
      'Supports respiratory health and comfortable breathing',
      'Traditionally used for healthy mucus clearance',
      'Contains naturally occurring vasicine and vasicinone',
      'A staple of traditional herbal respiratory formulations',
    ],
    dosage: '1 capsule twice daily.',
    formUrl: HERBAL_FORM_URL,
  },
  {
    id: 'now-no-murmurings',
    name: 'Now No Murmurings',
    subtitle: 'Eco-Friendly Sanitary Pads · 8+2 Pack',
    image: '/images/PAD.jpeg',
    category: 'Sustainable Care',
    price: 100,
    description:
      'Made with plant-based materials — banana fiber for a soft, absorbent structure and biodegradable corn-starch components — designed to reduce reliance on petroleum-derived materials while keeping absorbency, comfort, and leak protection intact.',
    benefits: [
      'Soft, fibrous top sheet from natural banana fiber',
      'Biodegradable absorbent core',
      'Comfortable, hygienic, leak-protective design',
      'Introductory offer: 8+2 pads per pack',
    ],
    dosage: null,
    formUrl: ORDER_FORM_URL,
  },

]

export const teamMembers: TeamMember[] = [
  { name: 'Mahendra Bharadwaj', role: 'Founder', photo: '/images/team/mahendra.jpeg' },
  { name: 'Malleshwari Bharadwaj', role: 'Co-Founder', photo: '/images/team/malleshwari.jpeg' },
  { name: 'Raj Bharadwaj', role: 'Representative — India', photo: '/images/team/raj.jpeg' },
  { name: 'Anurag Bharadwaj', role: 'Representative — India', photo: '/images/team/anurag.jpeg' },
]