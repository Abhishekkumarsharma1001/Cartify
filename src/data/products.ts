export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  badge?: "sale" | "new" | "bestseller";
  inStock: boolean;
  features?: string[];
}

export const categories = [
  { id: "electronics", name: "Electronics", icon: "💻", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop" },
  { id: "fashion", name: "Fashion", icon: "👕", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop" },
  { id: "home", name: "Home & Living", icon: "🏠", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop" },
  { id: "beauty", name: "Beauty", icon: "✨", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop" },
];

export const products: Product[] = [
  // Electronics
  {
    id: 1, name: "Wireless Noise-Cancelling Headphones", price: 4999, originalPrice: 7999,
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio. Features adaptive sound control and multipoint connection.",
    category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop"
    ],
    rating: 4.8, reviews: 2847, badge: "bestseller", inStock: true,
    features: ["Active Noise Cancellation", "30hr Battery", "Bluetooth 5.2", "Hi-Res Audio"]
  },
  {
    id: 2, name: "Ultra-Slim Laptop 15 Pro", price: 62999, originalPrice: 74999,
    description: "Powerful 15-inch laptop with M-series chip, 16GB RAM, 512GB SSD, and stunning Retina display. Perfect for creators and professionals.",
    category: "electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop"
    ],
    rating: 4.7, reviews: 1523, badge: "sale", inStock: true,
    features: ["M-Series Chip", "16GB RAM", "512GB SSD", "15\" Retina Display"]
  },
  {
    id: 3, name: "Smart Watch Series X", price: 14999,
    description: "Advanced smartwatch with health monitoring, GPS, always-on display, and 7-day battery life. Water resistant to 50m.",
    category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop"
    ],
    rating: 4.6, reviews: 3201, badge: "new", inStock: true,
    features: ["Heart Rate Monitor", "GPS", "7-Day Battery", "Water Resistant 50m"]
  },
  {
    id: 4, name: "Portable Bluetooth Speaker", price: 2499, originalPrice: 3499,
    description: "Compact waterproof speaker with 360° sound, 12-hour battery, and rugged design. Perfect for outdoor adventures.",
    category: "electronics", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=600&fit=crop"
    ],
    rating: 4.5, reviews: 1876, inStock: true,
    features: ["360° Sound", "Waterproof IP67", "12hr Battery", "USB-C Charging"]
  },
  {
    id: 5, name: "4K Webcam Pro", price: 5999,
    description: "Ultra HD webcam with auto-focus, built-in ring light, and noise-cancelling microphone. Ideal for streaming and video calls.",
    category: "electronics", image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=600&fit=crop"
    ],
    rating: 4.4, reviews: 892, inStock: true,
    features: ["4K Resolution", "Auto-Focus", "Ring Light", "Noise-Cancelling Mic"]
  },
  {
    id: 6, name: "Wireless Charging Pad", price: 999, originalPrice: 1499,
    description: "Fast wireless charger compatible with all Qi-enabled devices. Sleek aluminum design with LED indicator.",
    category: "electronics", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615526675159-e248c68ef5ce?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=600&h=600&fit=crop"
    ],
    rating: 4.3, reviews: 2103, badge: "sale", inStock: true,
    features: ["15W Fast Charging", "Qi Compatible", "LED Indicator", "Anti-Slip"]
  },
  {
    id: 7, name: "Mechanical Gaming Keyboard", price: 4499,
    description: "RGB mechanical keyboard with hot-swappable switches, aluminum frame, and programmable macros.",
    category: "electronics", image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=600&fit=crop"
    ],
    rating: 4.7, reviews: 1445, badge: "bestseller", inStock: true,
    features: ["Hot-Swappable", "RGB Backlight", "Aluminum Frame", "N-Key Rollover"]
  },
  // Fashion
  {
    id: 8, name: "Premium Cotton Hoodie", price: 1999, originalPrice: 2999,
    description: "Ultra-soft organic cotton hoodie with a modern relaxed fit. Features a kangaroo pocket and adjustable drawstring hood.",
    category: "fashion", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578768079470-fa2bfbaeb2e2?w=600&h=600&fit=crop"
    ],
    rating: 4.6, reviews: 1567, badge: "sale", inStock: true,
    features: ["100% Organic Cotton", "Relaxed Fit", "Kangaroo Pocket", "Machine Washable"]
  },
  {
    id: 9, name: "Classic Leather Sneakers", price: 3499,
    description: "Handcrafted leather sneakers with cushioned insole and rubber outsole. Timeless design meets modern comfort.",
    category: "fashion", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop"
    ],
    rating: 4.8, reviews: 2890, badge: "bestseller", inStock: true,
    features: ["Genuine Leather", "Cushioned Insole", "Rubber Outsole", "Hand-Stitched"]
  },
  {
    id: 10, name: "Minimalist Watch", price: 5999, originalPrice: 7999,
    description: "Elegant minimalist watch with Japanese quartz movement, sapphire crystal, and interchangeable straps.",
    category: "fashion", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=600&fit=crop"
    ],
    rating: 4.7, reviews: 1234, badge: "sale", inStock: true,
    features: ["Japanese Quartz", "Sapphire Crystal", "Interchangeable Straps", "Water Resistant"]
  },
  {
    id: 11, name: "Denim Jacket – Vintage Wash", price: 3999,
    description: "Classic denim jacket with a vintage wash finish. Features button closure, chest pockets, and adjustable waist tabs.",
    category: "fashion", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495105787522-5334e726fa0d?w=600&h=600&fit=crop"
    ],
    rating: 4.5, reviews: 876, inStock: true,
    features: ["100% Cotton Denim", "Vintage Wash", "Button Closure", "Chest Pockets"]
  },
  {
    id: 12, name: "Silk Blend Scarf", price: 1299,
    description: "Luxurious silk-blend scarf with a beautiful print. Lightweight and versatile for any season.",
    category: "fashion", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc64?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=600&fit=crop"
    ],
    rating: 4.4, reviews: 543, badge: "new", inStock: true,
    features: ["Silk Blend", "Lightweight", "Versatile", "Hand-Finished Edges"]
  },
  {
    id: 13, name: "Running Shoes Ultra Boost", price: 6999,
    description: "High-performance running shoes with responsive cushioning, breathable mesh upper, and continental rubber outsole.",
    category: "fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop"
    ],
    rating: 4.8, reviews: 3456, badge: "bestseller", inStock: true,
    features: ["Responsive Cushioning", "Breathable Mesh", "Continental Rubber", "Torsion System"]
  },
  // Home & Living
  {
    id: 14, name: "Minimalist Desk Lamp", price: 1799, originalPrice: 2499,
    description: "Adjustable LED desk lamp with touch dimmer, USB charging port, and eye-care technology. Five color temperatures.",
    category: "home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534105615256-13940a56ff44?w=600&h=600&fit=crop"
    ],
    rating: 4.5, reviews: 1123, badge: "sale", inStock: true,
    features: ["LED Eye-Care", "Touch Dimmer", "USB Port", "5 Color Temps"]
  },
  {
    id: 15, name: "Ceramic Planter Set", price: 1199,
    description: "Set of 3 handcrafted ceramic planters in earthy tones. Includes drainage holes and bamboo trays.",
    category: "home", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop"
    ],
    rating: 4.6, reviews: 789, badge: "new", inStock: true,
    features: ["Set of 3", "Handcrafted", "Drainage Holes", "Bamboo Trays"]
  },
  {
    id: 16, name: "Premium Throw Blanket", price: 1999,
    description: "Ultra-soft microfiber throw blanket with fringed edges. Perfect for cozying up on the sofa.",
    category: "home", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&h=600&fit=crop"
    ],
    rating: 4.7, reviews: 2341, badge: "bestseller", inStock: true,
    features: ["Ultra-Soft Microfiber", "Fringed Edges", "Machine Washable", "60\" x 80\""]
  },
  {
    id: 17, name: "Scented Candle Collection", price: 899,
    description: "Set of 4 hand-poured soy candles with natural essential oils. Burns for 40+ hours each.",
    category: "home", image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=600&fit=crop"
    ],
    rating: 4.4, reviews: 1567, inStock: true,
    features: ["100% Soy Wax", "Essential Oils", "40hr Burn Time", "Set of 4"]
  },
  {
    id: 18, name: "Wall Art Print Set", price: 1499, originalPrice: 2199,
    description: "Set of 3 modern abstract art prints on premium matte paper. Ready to frame.",
    category: "home", image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=600&fit=crop"
    ],
    rating: 4.3, reviews: 654, badge: "sale", inStock: true,
    features: ["Set of 3", "Premium Matte", "Ready to Frame", "Modern Abstract"]
  },
  {
    id: 19, name: "Bamboo Kitchen Organizer", price: 799,
    description: "Expandable bamboo kitchen drawer organizer with adjustable compartments. Fits most standard drawers.",
    category: "home", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&h=600&fit=crop"
    ],
    rating: 4.5, reviews: 1890, inStock: true,
    features: ["Expandable", "100% Bamboo", "Adjustable", "Fits Standard Drawers"]
  },
  // Beauty
  {
    id: 20, name: "Vitamin C Serum", price: 699, originalPrice: 999,
    description: "Brightening vitamin C serum with hyaluronic acid and vitamin E. Reduces dark spots and boosts collagen production.",
    category: "beauty", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop"
    ],
    rating: 4.7, reviews: 4523, badge: "bestseller", inStock: true,
    features: ["20% Vitamin C", "Hyaluronic Acid", "Vegan", "Cruelty-Free"]
  },
  {
    id: 21, name: "Natural Face Moisturizer", price: 549,
    description: "Lightweight daily moisturizer with SPF 30. Made with natural ingredients and suitable for all skin types.",
    category: "beauty", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e68b0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop"
    ],
    rating: 4.5, reviews: 2341, badge: "new", inStock: true,
    features: ["SPF 30", "All Skin Types", "Natural Ingredients", "Lightweight"]
  },
  {
    id: 22, name: "Luxury Lipstick Collection", price: 1299,
    description: "Set of 4 long-lasting matte lipsticks in versatile shades. Enriched with vitamin E for comfortable wear.",
    category: "beauty", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631214540553-ff044a3ff1ea?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop"
    ],
    rating: 4.6, reviews: 1876, inStock: true,
    features: ["Long-Lasting Matte", "Set of 4 Shades", "Vitamin E", "Cruelty-Free"]
  },
  {
    id: 23, name: "Hair Care Bundle", price: 1499, originalPrice: 2199,
    description: "Complete hair care set with shampoo, conditioner, and hair mask. Sulfate-free formula for all hair types.",
    category: "beauty", image: "https://images.unsplash.com/photo-1522338242992-e1a54571a5f7?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522338242992-e1a54571a5f7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop"
    ],
    rating: 4.4, reviews: 987, badge: "sale", inStock: true,
    features: ["Sulfate-Free", "3-Piece Set", "All Hair Types", "Natural Extracts"]
  },
  {
    id: 24, name: "Essential Oil Diffuser", price: 1099,
    description: "Ultrasonic aromatherapy diffuser with color-changing LED lights. Quiet operation with auto shut-off.",
    category: "beauty", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=600&h=600&fit=crop"
    ],
    rating: 4.5, reviews: 1654, inStock: true,
    features: ["Ultrasonic", "LED Lights", "Auto Shut-Off", "300ml Capacity"]
  },
  {
    id: 25, name: "Jade Roller & Gua Sha Set", price: 499,
    description: "Natural jade roller and gua sha massage tool set. Promotes circulation and reduces puffiness.",
    category: "beauty", image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop"
    ],
    rating: 4.3, reviews: 3210, badge: "bestseller", inStock: true,
    features: ["Natural Jade", "2-Piece Set", "Anti-Puffiness", "Travel Pouch"]
  },
  {
    id: 26, name: "Wireless Earbuds Pro", price: 7999, originalPrice: 9999,
    description: "Premium true wireless earbuds with active noise cancellation, transparency mode, and 24-hour battery with case.",
    category: "electronics", image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop"
    ],
    rating: 4.6, reviews: 2567, badge: "sale", inStock: true,
    features: ["ANC", "Transparency Mode", "24hr Battery", "IPX4 Water Resistant"]
  },
];
