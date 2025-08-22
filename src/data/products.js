export const products = [
  // -------------------------- JK Products ----------------------------
  {
    id: 'JK-Super-Strong',
    brand: 'JK Products',
    category: 'cement',
    name: 'JK Super Strong',
    description: "The foundation of your success. Engineered for superior strength and lasting durability.",
    image: '/src/media/JK-Super-Strong.png',
    alt: 'JK Super Strong Cement - Best cement dealer in Goa',
    badge: { text: 'Bestseller', class: '' },
    specs: { 'Strength': '53 MPa', 'Pack Size': '50 kg', 'Applications': 'High-rise buildings, bridges, industrial structures' },
    features: ['High Strength', 'Fast Setting'],
    rating: 5,
    ratingText: '4.9/5'
  },
  {
    id: 'JK-Super-PSC',
    brand: 'JK Products',
    category: 'cement',
    name: 'JK Super PSC',
    description: "An eco-friendly choice offering excellent long-term strength and enhanced protection against chemical attacks.",
    image: '/src/media/JK-Super-Cemnt-PSC.png',
    alt: 'JK Super PSC Cement - Best cement dealer in Goa',
    badge: { text: 'Eco-Friendly', class: '' },
    specs: { 'Grade': 'PSC', 'Strength': 'Comparable to OPC 43/53', 'Pack Size': '50 kg', 'Applications': 'Marine structures, mass concrete works, residential construction' },
    features: ['Sulphate Resistant', 'Low Heat Hydration', 'Improved Workability'],
    rating: 4.5,
    ratingText: '4.7/5'
  },
  {
    id: 'JK-Super-PPC',
    brand: 'JK Products',
    category: 'cement',
    name: 'JK Super PPC',
    description: "A versatile, all-purpose cement that ensures denser concrete, making it ideal for plastering, masonry, and general construction.",
    image: '/src/media/JK-Super-Cement-PPC.png',
    alt: 'JK Super PPC Cement - Best cement dealer in Goa',
    badge: { text: 'All-Rounder', class: '' },
    specs: { 'Grade': 'PPC', 'Strength': 'Comparable to OPC 43', 'Pack Size': '50 kg', 'Applications': 'Plastering, masonry, residential RCC, finishing works' },
    features: ['Denser Concrete', 'Corrosion Resistant', 'Improved Finish'],
    rating: 4.5,
    ratingText: '4.8/5'
  },
  {
    id: 'JK-Super-OPC-43',
    brand: 'JK Products',
    category: 'cement',
    name: 'JK Super Cement OPC 43',
    description: "A reliable, all-purpose cement ideal for plastering and general masonry work where initial strength is not a critical factor.",
    image: '/src/media/JK-Super-Cement-OPC-43-Grade.png',
    alt: 'JK Super Cement OPC 43 Grade - Best cement dealer in Goa',
    badge: { text: 'Reliable Choice', class: '' },
    specs: { 'Grade': 'OPC 43', 'Strength': '43 MPa', 'Pack Size': '50 kg', 'Applications': 'Plastering, masonry, non-RCC works, finishing' },
    features: ['43 Grade OPC', 'Consistent Quality', 'Good Workability'],
    rating: 4.5,
    ratingText: '4.6/5'
  },

  // -------------------------- UltraTech Products ----------------------------
  {
    id: 'UltraTech-Super',
    brand: 'UltraTech Products',
    category: 'cement',
    name: 'UltraTech Super Cement',
    description: "India's No. 1 cement, trusted for its superior quality and consistency. Ideal for all types of construction.",
    image: '/src/media/UltraTech-Cement.png',
    alt: 'UltraTech Super Cement - Best cement dealer in Goa',
    badge: { text: 'India\'s No. 1', class: '' },
    specs: { 'Grade': 'PPC', 'Strength': 'High Durability', 'Pack Size': '50 kg', 'Applications': 'Beams, columns, slabs, foundations, general construction' },
    features: ['Superior Quality', 'High Durability', 'Optimal Fineness'],
    rating: 4.5,
    ratingText: '4.9/5'
  },
  {
    id: 'UltraTech-Weather-Plus',
    brand: 'UltraTech Products',
    category: 'cement',
    name: 'UltraTech Weather Plus',
    description: "A water-repellent cement designed to protect structures from moisture and harsh weather.",
    image: '/src/media/UltraTech-Cememt-Weather-Plus.png',
    alt: 'UltraTech Weather Plus Cement - Best cement dealer in Goa',
    badge: { text: 'Weather Shield', class: '' },
    specs: { 'Grade': 'Specialized PPC', 'Strength': 'High Water Repellence', 'Pack Size': '50 kg', 'Applications': 'Damp-prone areas, foundations, roofing, plastering' },
    features: ['Water Repellent', 'Corrosion Resistant', 'Reduces Dampness'],
    rating: 4.5,
    ratingText: '4.8/5'
  },

  {
    id: 'UltraTech-Weather-Pro',
    brand: 'UltraTech Products',
    category: 'chemical',
    name: 'UltraTech Weather Pro WP+200',
    description: "An integral liquid waterproofing compound that protects concrete and mortar from dampness and seepage from the ground up.",
    image: '/src/media/UltraTech-Weather-Pro.jpeg',
    alt: 'UltraTech Weather Pro waterproofing chemical - Best dealer in Goa',
    badge: { text: 'Damp Proofing', class: '' },
    specs: { 
      'Type': 'Integral Liquid Waterproofing', 
      'Dosage': '200ml per 50kg cement', 
      'Pack Size': '1L, 5L, 20L', 
      'Applications': 'Concrete, plaster for basements, roofs, bathrooms' 
    },
    features: ['Reduces Water Permeability', 'Improves Workability', 'Corrosion Protection'],
    rating: 4.5,
    ratingText: '4.8/5'
  },

  /*{
    id: 'UltraTech-Seal-Dry',
    brand: 'UltraTech Products',
    category: 'chemical',
    name: 'UltraTech Seal & Dry',
    description: "A flexible, acrylic-based waterproofing coat for concrete and masonry surfaces to prevent dampness.",
    image: '/src/media/ultratech-seal-dry.png',
    alt: 'UltraTech Seal & Dry waterproofing chemical in Goa',
    badge: { text: 'Waterproofing', class: '' },
    specs: { 'Type': 'Acrylic Polymer', 'Coverage': 'Approx. 2 sq. mt./kg', 'Pack Size': '1kg, 5kg, 20kg', 'Applications': 'Roofs, bathrooms, basements, water tanks' },
    features: ['High Flexibility', 'Crack Bridging', 'Excellent Adhesion'],
    rating: 4.5,
    ratingText: '4.7/5'
  },*/

  // -------------------------- Ramco Products ----------------------------

  {
    id: 'Ramco-43-Grade',
    brand: 'Ramco Products',
    category: 'cement',
    name: 'Ramco Cement 43 Grade',
    description: "A high-quality Ordinary Portland Cement known for its consistency and strength, making it a reliable choice for general construction work.",
    image: '/src/media/Ramco-43-Grade.png',
    alt: 'Ramco OPC 43 Grade Cement - Best cement dealer in Goa',
    badge: { text: 'Trusted Quality', class: '' },
    specs: { 'Grade': '43', 'Strength': '43 MPa', 'Pack Size': '50 kg', 'Applications': 'Plastering, masonry, tile work, non-structural applications' },
    features: ['Consistent Quality', 'Good Workability', 'Reliable Strength'],
    rating: 4.5,
    ratingText: '4.7/5'
  },

  {
    id: 'Ramco-53-Grade',
    brand: 'Ramco Products',
    category: 'cement',
    name: 'Ramco Cement 53 Grade',
    description: "A high-strength cement engineered for projects requiring rapid strength development and superior structural integrity, like high-rise buildings and bridges.",
    image: '/src/media/Ramco-53-Grade.png',
    alt: 'Ramco OPC 53 Grade Cement - Best cement dealer in Goa',
    badge: { text: 'High Strength', class: '' },
    specs: { 'Grade': '53', 'Strength': '53 MPa', 'Pack Size': '50 kg', 'Applications': 'High-rise structures, precast concrete, bridges, runways' },
    features: ['Rapid Hardening', 'Superior Strength', 'High Durability'],
    rating: 5,
    ratingText: '4.8/5'
  },

  {
    id: 'Ramco-Supercrete',
    brand: 'Ramco Products',
    category: 'cement',
    name: 'Ramco Supercrete Cement',
    description: "A high-performance blended cement with a unique concrete-specific formula, providing high early strength and long-term durability.",
    image: '/src/media/Ramco-Supercrete-Cement.jpg',
    alt: 'Ramco Supercrete Cement - Best cement dealer in Goa',
    badge: { text: 'Premium Blend', class: '' },
    specs: { 'Strength': 'High Early Strength', 'Pack Size': '50 kg', 'Applications': 'All concrete work, foundations, columns, roofing' },
    features: ['Concrete Specific', 'Corrosion Resistant', 'Superior Durability'],
    rating: 5,
    ratingText: '4.9/5'
  },

  {
    id: 'Ramco-Super-Grade',
    brand: 'Ramco Products',
    category: 'cement',
    name: 'Ramco Super Grade',
    description: "A popular all-purpose Portland Pozzolana Cement (PPC) known for its consistent quality and suitability for a wide range of applications.",
    image: '/src/media/Ramco-Super-Grade.jpg',
    alt: 'Ramco Super Grade Cement - Best cement dealer in Goa',
    badge: { text: 'All-Purpose', class: '' },
    specs: { 'Strength': 'High Durability', 'Pack Size': '50 kg', 'Applications': 'General construction, plastering, masonry, residential work' },
    features: ['Versatile Use', 'Consistent Quality', 'Good Workability'],
    rating: 4.5,
    ratingText: '4.8/5'
  },

  {
    id: 'Ramco-Infra-43',
    brand: 'Ramco Products',
    category: 'cement',
    name: 'Ramco Infra 43 Grade',
    description: "A specialized 43 Grade cement engineered for infrastructure projects, offering optimized fineness for better workability and durability.",
    image: '/src/media/Ramco-Infra-43-Grade.png',
    alt: 'Ramco Infra 43 Grade Cement - Best cement dealer in Goa',
    badge: { text: 'Infra Special', class: '' },
    specs: { 'Grade': '43', 'Strength': '43 MPa', 'Pack Size': '50 kg', 'Applications': 'Infrastructure projects, bridges, roads, heavy-duty works' },
    features: ['Optimized Fineness', 'High Durability', 'Superior Workability'],
    rating: 4.5,
    ratingText: '4.8/5'
  },

  {
    id: 'Ramco-Infra-53',
    brand: 'Ramco Products',
    category: 'cement',
    name: 'Ramco Infra 53 Grade',
    description: "A high-strength 53 Grade cement for infrastructure projects demanding rapid strength gain and superior structural performance.",
    image: '/src/media/Ramco-Infra-53-Grade.png',
    alt: 'Ramco Infra 53 Grade Cement - Best cement dealer in Goa',
    badge: { text: 'High-Strength Infra', class: '' },
    specs: { 'Grade': '53', 'Strength': '53 MPa', 'Pack Size': '50 kg', 'Applications': 'Major infrastructure' },
    features: ['Rapid Strength Gain', 'High Performance', 'Engineered for Infra'],
    rating: 5,
    ratingText: '4.9/5'
  },

  {
    id: 'Ramco-Tile-Fix',
    brand: 'Ramco Products',
    category: 'chemical',
    name: 'Ramco Tile Fix',
    description: "A polymer-modified tile adhesive designed for strong, reliable bonding of ceramic and vitrified tiles on floors and walls.",
    image: '/src/media/Ramco-Tile-Fix.png',
    alt: 'Ramco Tile Fix adhesive - Best building material dealer in Goa',
    badge: { text: 'Tile Adhesive', class: '' },
    specs: { 
      'Type': 'Polymer-Modified Adhesive', 
      'Coverage': 'Approx. 55-60 sq.ft./25kg bag', 
      'Pack Size': '25 kg', 
      'Applications': 'Fixing ceramic & vitrified tiles, interior floors & walls' 
    },
    features: ['Excellent Adhesion', 'Non-Slip Formula', 'Easy to Mix'],
    rating: 4.5,
    ratingText: '4.8/5'
  },

  {
    id: 'Ramco-Super-Shield',
    brand: 'Ramco Products',
    category: 'cement',
    name: 'Ramco Super Shield',
    description: "A premium water-repellent cement designed to provide a protective shield against moisture and dampness for the entire structure.",
    image: '/src/media/Ramco-Super-Shield.jpg',
    alt: 'Ramco Super Shield water-repellent cement - Best dealer in Nuvem, Goa',
    badge: { text: 'Water Repellent', class: '' },
    specs: { 
      'Grade': 'Blended PPC', 
      'Strength': 'High Water Resistance', 
      'Pack Size': '1L', 
      'Applications': 'Foundations, basements, external plastering, roofing' 
    },
    features: ['Shields from Dampness', 'Reduces Water Absorption', 'Corrosion Resistant'],
    rating: 4.5,
    ratingText: '4.9/5'
  },

  {
    id: 'Ramco-Super-Plaster-Eco',
    brand: 'Ramco Products',
    category: 'chemical',
    name: 'Ramco Super Plaster Eco',
    description: "An eco-friendly, ready-to-use plaster mix that provides a super smooth finish for both internal and external walls, with reduced cracking.",
    image: '/src/media/Ramco-Super-Plaster-Eco.png',
    alt: 'Ramco Super Plaster Eco mix - Best building material dealer in Nuvem, Goa',
    badge: { text: 'Ready-Mix Plaster', class: '' },
    specs: { 
      'Type': 'Ready-Mix Plaster', 
      'Strength': 'Superior Smooth Finish', 
      'Pack Size': '25kg', 
      'Applications': 'Internal & external wall plastering, masonry surfaces' 
    },
    features: ['Super Smooth Finish', 'Eco-Friendly', 'Reduces Cracking'],
    rating: 4.5,
    ratingText: '4.7/5'
  },

  // ------------------------ JSW Products ----------------------------

  {
    id: 'JSW-Power-PRO',
    brand: 'JSW Products',
    category: 'cement',
    name: 'JSW Cement Power PRO',
    description: "A premium cement engineered for high early strength, ensuring faster setting times and enhanced durability for all structural applications.",
    image: '/src/media/JSW-Cement-Power-PRO.png',
    alt: 'JSW Cement Power PRO - Best cement dealer in Goa',
    badge: { text: 'Early Strength', class: '' },
    specs: { 'Strength': 'High Early Strength', 'Pack Size': '50 kg', 'Applications': 'Structural concrete, foundations, columns, roofing' },
    features: ['High Early Strength', 'Faster Setting', 'Tamper-Proof Bag'],
    rating: 4.5,
    ratingText: '4.8/5'
  },

  {
    id: 'JSW-Compcem',
    brand: 'JSW Products',
    category: 'cement',
    name: 'JSW Cement Compcem',
    description: "A composite cement specially designed for masonry and plastering, providing a superior smooth finish and improved workability.",
    image: '/src/media/JSW-Cement-Compcem.png',
    alt: 'JSW Cement Compcem - Best cement dealer in Goa',
    badge: { text: 'Finishing Special', class: '' },
    specs: { 'Grade': 'Composite', 'Strength': 'Optimized for Plastering', 'Pack Size': '50 kg', 'Applications': 'Internal & external plastering, masonry, brickwork' },
    features: ['Superior Finish', 'Reduced Cracking', 'Improved Workability'],
    rating: 4.5,
    ratingText: '4.7/5'
  },

  // -------------------------- Sand & Aggregates ----------------------------
 /* {
    id: 'river-sand-fine',
    brand: 'Sand & Aggregates',
    category: 'sand',
    name: 'River Sand (Fine)',
    description: 'Fine grade river sand ideal for plastering, flooring, and finishing work.',
    image: '/src/media/river-sand-fine.png',
    alt: 'Fine sand supplier Goa - Plastering sand dealer',
    badge: null,
    specs: { 'Type': 'Fine Sand', 'Size': '0.5-2mm', 'Unit': 'Per Ton', 'Applications': 'Plastering, flooring, finishing work' },
    features: ['Fine Grade', 'Plastering', 'Smooth Finish'],
    rating: 4,
    ratingText: '4.7/5'
  },*/
];