export interface Review {
  id: number;
  productId: number;
  userName: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

const firstNames = ["Aarav", "Priya", "Rohit", "Sneha", "Vikram", "Ananya", "Karan", "Meera", "Arjun", "Divya", "Rahul", "Neha", "Amit", "Pooja", "Sanjay", "Ishita", "Deepak", "Riya", "Manish", "Kavita"];
const lastInitials = ["S", "M", "K", "P", "R", "G", "T", "B", "D", "V", "N", "J", "L", "A", "C"];

const reviewTemplates: { rating: number; title: string; comment: string }[] = [
  { rating: 5, title: "Absolutely love it!", comment: "Exceeded my expectations in every way. The quality is top-notch and it arrived well-packaged. Highly recommend to everyone!" },
  { rating: 5, title: "Best purchase this year", comment: "I've been using this for a few weeks now and it's been fantastic. Great value for money. Will definitely buy again." },
  { rating: 4, title: "Really good quality", comment: "Very happy with the purchase. The build quality is excellent. Only minor issue is the packaging could be better, but the product itself is great." },
  { rating: 5, title: "Worth every rupee", comment: "Was skeptical at first but this is genuinely premium quality. Fast delivery too. My friends are jealous!" },
  { rating: 4, title: "Good product, fast delivery", comment: "Received it within 3 days. Product looks exactly like the pictures. Works perfectly fine. Would have given 5 stars but the color is slightly different." },
  { rating: 3, title: "Decent but could be better", comment: "It's an okay product for the price. Does what it's supposed to do but nothing extraordinary. Average quality overall." },
  { rating: 5, title: "Premium quality!", comment: "Feels very premium in hand. The attention to detail is impressive. This brand never disappoints. Already ordered another one as a gift." },
  { rating: 4, title: "Great value for money", comment: "At this price point, you won't find anything better. Very satisfied with the purchase. Delivery was on time." },
  { rating: 5, title: "Superb! Must buy", comment: "This is exactly what I was looking for. The features are amazing and it looks beautiful. 100% recommended." },
  { rating: 4, title: "Happy with the purchase", comment: "Good product overall. The quality matches the description. Customer service was also helpful when I had a query." },
  { rating: 3, title: "It's okay", comment: "Not bad but not amazing either. Works fine for everyday use. Expected slightly better finish at this price." },
  { rating: 5, title: "Gifted it, they loved it!", comment: "Bought this as a birthday gift and the person absolutely loved it. Great presentation and quality. Will order more." },
  { rating: 4, title: "Solid product", comment: "Been using it daily for a month now. No complaints so far. Durable and looks great. Recommended." },
  { rating: 5, title: "Can't believe the quality!", comment: "For this price, the quality is unbelievable. Feels like a much more expensive product. Very impressed!" },
  { rating: 2, title: "Not as expected", comment: "The product is smaller than I imagined. Quality is average. Delivery took longer than promised. Could be better." },
  { rating: 5, title: "Second time buying", comment: "Loved it so much the first time that I ordered another one. Consistent quality. This brand has earned my loyalty." },
  { rating: 4, title: "Pretty good!", comment: "Nice product with good build quality. Slightly overpriced but the quality makes up for it. Would recommend on sale." },
  { rating: 5, title: "Outstanding product", comment: "Everything about this is perfect — the design, the quality, the packaging. One of the best purchases I've made online." },
  { rating: 3, title: "Average product", comment: "It does the job but nothing special. The material could be of better quality. Okay for the price if on discount." },
  { rating: 4, title: "Pleasantly surprised", comment: "Didn't expect much but was pleasantly surprised. Good quality, nice design, and arrived earlier than expected." },
];

// Seeded random for consistent reviews per product
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function getReviewsForProduct(productId: number): Review[] {
  const rand = seededRandom(productId * 137 + 42);
  const count = 4 + Math.floor(rand() * 5); // 4–8 reviews
  const reviews: Review[] = [];
  const usedTemplates = new Set<number>();

  for (let i = 0; i < count; i++) {
    let templateIdx: number;
    do {
      templateIdx = Math.floor(rand() * reviewTemplates.length);
    } while (usedTemplates.has(templateIdx) && usedTemplates.size < reviewTemplates.length);
    usedTemplates.add(templateIdx);

    const template = reviewTemplates[templateIdx];
    const nameIdx = Math.floor(rand() * firstNames.length);
    const initialIdx = Math.floor(rand() * lastInitials.length);
    const daysAgo = 1 + Math.floor(rand() * 180);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: productId * 100 + i,
      productId,
      userName: `${firstNames[nameIdx]} ${lastInitials[initialIdx]}.`,
      avatar: firstNames[nameIdx].charAt(0),
      rating: template.rating,
      title: template.title,
      comment: template.comment,
      date: date.toISOString(),
      verified: rand() > 0.2,
      helpful: Math.floor(rand() * 50),
    });
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAverageRating(reviews: Review[]) {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export function getRatingDistribution(reviews: Review[]) {
  const dist = [0, 0, 0, 0, 0]; // index 0 = 1 star, index 4 = 5 stars
  reviews.forEach((r) => dist[r.rating - 1]++);
  return dist;
}
