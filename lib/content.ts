/**
 * Verbatim content for the Box It Up Storage home page, transcribed from the
 * live WordPress/Elementor source. Keeping copy here (not inline in JSX) makes
 * it easy to verify against the original and to reuse in structured data.
 *
 * Image URLs intentionally point at the existing WordPress media library, as
 * requested. next/image is configured to allow that host (next.config.ts).
 */

export const MEDIA = "https://www.boxitupstorage.ca/wp-content/uploads";

export const HERO = {
  heading: "Storage Rentals in Chilliwack and Beyond",
  subheading:
    "Feel confident knowing your belongings are safe with Box It Up rental services.",
  primaryCta: { label: "REQUEST A QUOTE", href: "/inquire-today" },
  secondaryCta: { label: "CALL US TODAY", href: "tel:1-877-226-9488" },
  // Background is a YouTube video on the live site.
  videoId: "MFVvIDClMlA",
  features: [
    {
      title: "Convenient Access",
      body: "Say goodbye to long drives and strict facility hours—store your items close to home with flexible access that fits your schedule.",
    },
    {
      title: "Secure Storage",
      body: "Rest easy knowing your valuables are protected in our 24/7 monitored facility, ensuring safety and security at all times.",
    },
  ],
};

export const BOX_SIZES = {
  heading: "OUR BOX SIZES AVAILABLE",
  intro:
    "At Box It Up Storage, we understand that there are many different storage needs! Our rental box services are designed to offer flexibility and convenience for any situation, whether you’re moving, renovating, or simply need the extra space, we’re here to help.",
  legend: [
    { label: "Available For Mobile Storage", color: "var(--brand)" },
    { label: "Available For Daily Storage", color: "var(--accent)" },
  ],
  slides: [
    {
      title: "8 Ft or 10 Ft Boxes",
      image: `${MEDIA}/2026/05/8feel-stack.jpg`,
      body: "These are our smallest units, and come with a low price tag. Whether on your site or ours, you can get to your items on your schedule. If you are a local business or a construction company boxes can be rented on our site or delivered to you. Also great if you are moving, downsizing, or just looking to take back space in your garage. These are perfect for keeping your winter gear, like coats and boots organized and secure. You can also store furniture, seasonal decorations, and even sports equipment. Within the unit you can easily organize your home in preparation for a move or just tuck away items that are not needed for the time being.",
    },
    {
      title: "20 Ft Boxes",
      image: `${MEDIA}/2026/05/20ft-box.jpg`,
      body: "These units can offer a variety of different storage solutions. If you are a local business or a construction company boxes can be rented on our site or delivered to you. Also great if you are moving, downsizing, or just looking to take back space in your garage. They are perfect for keeping your winter gear, like coats and boots organized and secure. You can also store furniture, seasonal decorations, and even sports equipment. Within the unit you can easily organize your home in preparation for a move or just tuck away items that are not needed for the time being.",
    },
    {
      title: "20 Ft Stackable Boxes",
      image: `${MEDIA}/2026/05/Stackable-cover.jpg`,
      body: "20 Ft Stackable storage units are our most affordable onsite option. Ideal for longterm storage where consistent access in not as important. Great for safeguarding your winter essentials such as coats and boots. This storage solution also accommodates furniture, seasonal decorations, and sports gear helping you to take back precious space in your home or garage. With stackable bins, you can efficiently organize your space while ensuring your items remain secure. These units are perfect for those traveling, downsizing, or storing family belongings.",
    },
    {
      title: "40 Ft Boxes",
      image: `${MEDIA}/2026/06/40ft-updated.jpg`,
      body: "If you have serious space needs on your site 40 Ft mobile units are what you are looking for! Whether you are a home owner or a business, if you have the space on your site, these boxes are an instant solution. Our customers store items such as large furniture, equipment, and excess inventory. If you are doing a large home renovation these units could be just what you need.",
    },
  ],
};

export const HOW_IT_WORKS = {
  heading: "HOW IT WORKS",
  lead: "Delivered Right To Your Door or Accessible Daily At Our Location",
  paragraphs: [
    "If you have the space at home and want the convenience of having your belongings stored right in your backyard, we can happily deliver a mobile box to you! Don’t have room for a storage container at home? Securely store your items at our Chilliwack Storage Facility. Trust that your belongings are in good hands with our 24/7 surveillance, flexible access times, and an automated gate system for your convenience.",
    "On a budget? We have a range of storage solutions to fit your needs. You can also choose from mini storage for frequent access or stackable boxes, which is a more budget friendly alternative for those who don’t need continual access to their storage.",
  ],
  image: `${MEDIA}/2026/05/how-it-works.jpg`,
};

export const SERVICES = {
  heading: "SERVICES AVAILABLE",
  cards: [
    {
      image: `${MEDIA}/2026/05/Rectangle-16.jpg`,
      badge: "Free Daily Access At Our Facility",
      title: "Daily Mini Storage",
      price: "(Starting @ $110/mo)",
      body: "Our mini storage units are accessible daily, 7am-8pm via our automated gate. The facility is fully lit, and monitored by cameras. Each unit is secured with an individual lock box, and features ground level drive up access.",
    },
    {
      image: `${MEDIA}/2026/05/Rectangle-17.jpg`,
      badge: "Access Once A Month For Free",
      title: "Stackable Long Term Storage",
      price: "(Starting @ $165/mo)",
      body: "This option is best suited for long term storage, where consistent access is not necessary. This allows for the best value for a 20’ Storage Box at only $165/month, and comes with 1 free access every 30 days.",
    },
    {
      image: `${MEDIA}/2026/05/Rectangle-18.jpg`,
      badge: "We Come Right To Your Backyard",
      title: "Mobile Storage Boxes",
      price: "(Starting @ $150/mo)",
      body: "Our 10’, 20’ and 40’ Boxes are available for delivery to your specific location. If convenience is what you’re looking for, this is for you!",
    },
  ],
};

export const BOOK_STEPS = {
  heading: "BOOK YOUR RENTAL TODAY",
  intro:
    "Get in touch with us today to discuss your storage needs and find the perfect solution.",
  steps: [
    {
      tab: "Step One:",
      tabLabel: "Choose Your Box Size & Plan",
      title: "Choose Your Box Size",
      body: "Browse our range of storage box sizes and pick the one that fits your needs.",
      image: `${MEDIA}/2026/05/IMG-16-2-scaled-1.jpg`,
    },
    {
      tab: "Step Two:",
      tabLabel: "Fill Out Our Inquiry Form",
      title: "Fill Out Our Inquiry Form",
      body: "Tell us a bit about yourself and what you are looking to store. Just share your contact details, your preferred box size, and how long you expect to need it. Prefer to talk it through? Give us a call and we will walk you through your options directly.",
      image: `${MEDIA}/2024/08/IMG-19--scaled.jpg`,
    },
    {
      tab: "Step Three:",
      tabLabel: "Talk To Us & Get Approved",
      title: "Talk to Us and Get Approved",
      body: "We will follow up to make sure you have everything you need and answer any questions about pricing, access, or terms. Once you are ready to move forward, we send over our digital rental agreement. Everything is laid out in plain language, so our terms are clear and easy to understand before you sign.",
      image: `${MEDIA}/2024/08/IMG-12-5-scaled.jpg`,
    },
    {
      tab: "Step Four:",
      tabLabel: "Meet Your New Unit",
      title: "Start Storing Your Items",
      body: "As soon as your agreement is signed, your rental box is ready to go. Start moving your items in right away, with no waiting period and no hidden steps. Your space is yours to use from day one.",
      image: `${MEDIA}/2024/08/IMG-39-1-scaled.jpg`,
    },
  ],
  // Step One inquiry form options (Elementor form on the live site).
  boxSizeOptions: ["8ft", "10ft", "20ft", "40ft"],
  serviceOptions: ["Daily Access", "Stackable Monthly Access", "Delivery To Door"],
};

export const STORY = {
  eyebrow: "Our Story",
  heading: "How It All Began",
  body: "We both moved from the small towns of Salmon Arm and West Kelowna to Chilliwack in our early 20s and fell in love with each other and the Lower Mainland! Since the beginning of our story in 2003, we have had three beautiful children and built a home and community in Chilliwack. With our combined 20+ years of experience in the storage industry and customer service, we decided to start a company to meet people’s storage needs.",
  cta: { label: "Discover more", href: "/about" },
  image: `${MEDIA}/2024/08/ecea7f_049c64ac5cac4b85a76b31ab83c03b55mv2.webp`,
};

export const PARTNERS = {
  heading: "Trusted by our happy partners",
  logos: [
    { src: `${MEDIA}/2024/08/westbow-construction.png`, alt: "Westbow Construction" },
    { src: `${MEDIA}/2024/08/valley-waste.jpg`, alt: "Valley Waste" },
    { src: `${MEDIA}/2024/08/swiss-pro.png`, alt: "Swiss Pro" },
    { src: `${MEDIA}/2024/08/sproutbox-garden-1024x1024.png`, alt: "Sproutbox Garden" },
    { src: `${MEDIA}/2024/08/Shxwhay-Village.png`, alt: "Shxwhay Village" },
    { src: `${MEDIA}/2024/08/shandhar-hut.png`, alt: "Shandhar Hut" },
    { src: `${MEDIA}/2024/08/ruth-and-naomis.png`, alt: "Ruth and Naomi's" },
    { src: `${MEDIA}/2024/08/Platinum-Electric.png`, alt: "Platinum Electric" },
    { src: `${MEDIA}/2024/08/pinnacle-custom.jpg`, alt: "Pinnacle Custom" },
    { src: `${MEDIA}/2024/08/modular-electric.png`, alt: "Modular Electric" },
    { src: `${MEDIA}/2024/08/macqueen-systems.png`, alt: "MacQueen Systems" },
    { src: `${MEDIA}/2024/08/mainland-crane.png`, alt: "Mainland Crane" },
    { src: `${MEDIA}/2024/08/llt-llp.png`, alt: "LLT LLP" },
    { src: `${MEDIA}/2024/08/hope-river-contracting.png`, alt: "Hope River Contracting" },
    { src: `${MEDIA}/2024/08/gidney-signs.png`, alt: "Gidney Signs" },
    { src: `${MEDIA}/2024/08/fernic-group-contracting.png`, alt: "Fernic Group Contracting" },
    { src: `${MEDIA}/2024/08/elevated-pizza.png`, alt: "Elevated Pizza" },
    { src: `${MEDIA}/2024/08/doubletime-logo.png`, alt: "Doubletime" },
  ],
};

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What Hours Can I Access My Mini Storage Unit?",
    a: "Our mini storage facility is accessible every day of the year, from 7:00 AM to 8:00 PM — including weekends and holidays. Entry is quick and easy through our automated gate, so you can access your unit on your own schedule without needing to check in with anyone.",
  },
  {
    q: "Are There Any Hidden Fees?",
    a: "We believe in straightforward, honest pricing — no surprises. Here's exactly what you can expect:\nOne-Month Minimum All rentals require a one-month minimum to get started. After that, you're free to cancel at any time — just give us a notice, and we'll even prorate a refund for any unused days remaining in your billing period.\nLock Included We provide a lock that fits perfectly in your unit's lockbox at no extra charge. It's yours to use for the full duration of your rental, keeping your belongings completely secure.\nNo Hidden Fees That's really it. No administration fees, no surprise charges, and no fine print. What you're quoted is what you pay.\nWe want storing with us to be as simple and stress-free as possible — because the last thing you need when you're moving, travelling, or running a business is an unexpected bill.",
  },
  {
    q: "Where Are You Located Exactly?",
    a: "Box It Up Storage is located at 44620 Skylark Road, Chilliwack, BC V2R 6H5 — just five minutes off Highway 1, making us easy to access from anywhere in the Fraser Valley. We're nestled in a growing area of Chilliwack, near the new Cedarbrook development. Our facility is open seven days a week from 7:00 AM to 8:00 PM, and you can reach us at 1-877-226-9488",
  },
  {
    q: "Do You Have A Minimum Rental Period?",
    a: "We have a one month minimum rental period, but beyond that month we pro-rate your storage to the day so that if you move out before your monthly billing date you will receive a credit for days not used.",
  },
  {
    q: "What Can I Store In There?",
    a: "Our storage units are suitable for a wide range of items, including:\n•  Furniture, sofas, tables, and chairs\n•  Mattresses and bed frames\n•  Boxes, bins, and bags\n•  Clothing and seasonal wardrobes\n•  Holiday and seasonal decorations\n•  Winter tires and automotive accessories\n•  Bikes, sports equipment, and camping gear\n•  Lawn and garden equipment\n•  Patio furniture\n•  Tools and hardware\n•  Business inventory and stock\n•  Equipment and supplies\n•  Filing, records, and office items\nWhether you're moving, travelling, decluttering, or need extra space for your business, we have a unit to fit your needs — from our compact 8 ft units all the way up to our spacious 20 ft units. Our stackable storage option is also perfect for long-term storage at an affordable price.",
  },
  {
    q: "Who Would You Recommend Daily Story over Monthly To?",
    a: "Do I need daily access or is monthly access enough?\nIt really depends on how you plan to use your storage — and which product is the right fit for you!\nMini Storage (8 ft, 10 ft, or 20 ft units) Our mini storage units are perfect if you need regular, flexible access to your belongings. Available seven days a week from 7:00 AM to 8:00 PM, these are ideal for:\n•  Moving — adding and retrieving items as you go\n•  Home renovations — rotating furniture and belongings\n•  Businesses needing frequent access to inventory, equipment, or supplies\n•  Anyone who wants the convenience of dropping by whenever they need\nStackable Storage (20 ft) Our stackable storage option is designed for customers who don't need frequent access and are looking for an affordable long-term solution. Access is included once per month with advance notice, making it a great fit for:\n•  Travellers or those living abroad\n•  Seasonal items you only need a couple of times a year\n•  Businesses storing slow-moving stock or equipment\n•  Anyone looking for simple, cost-effective long-term storage",
  },
  {
    q: "How Do You Quote On Delivery?",
    a: "Delivery pricing is based on two simple factors: where you are located and whether your unit is loaded or empty.\nLocation We deliver across the Fraser Valley and beyond, from Hope in the east all the way to Vancouver in the west. We have set delivery prices for each city along the way, with a local rate for customers right here in Chilliwack. The further the delivery, the higher the rate — so you only pay for the distance you need.\nLoaded vs. Empty Whether your unit is full or empty also affects the delivery price. A loaded unit always carries an additional charge, so keep that in mind when planning your move or delivery.\nGetting a Quote Because pricing varies by city and load, we provide custom quotes based on your specific needs. Simply contact us and let us know:\n•  Your delivery location\n•  Whether your unit will be loaded or empty\nWe'll get you a fast, accurate quote so you know exactly what to expect.\n📞 1-877-226-9488",
  },
  {
    q: "How Secure is Your Facility",
    a: "Your peace of mind is important to us, and we've built our facility with security in mind from the ground up.\n•  Fully lit yard — the entire property is well-lit, day and night\n•  Full perimeter fencing with a secure automated gate\n•  Individual access codes — every customer receives their own unique gate code, so only you can access the facility\n•  Monitored cameras — the property is under camera surveillance at all times\n•  Stackable units — our stackable storage units are stacked door-to-door, adding an extra layer of security\n•  Included lock — we provide a lock that fits perfectly into your unit's lockbox, keeping your belongings safe and secure",
  },
  {
    q: "What Are the Steps to Get a Unit and How Does Billing Work?",
    a: "Getting started with Box It Up Storage is simple, and the entire process can be done digitally from the comfort of your home!\nGetting Set Up\n1  Contact us by phone, email, or through our website to discuss your needs and get a quote\n2  We'll send you a short form to fill out with your details\n3  You'll receive a rental agreement to review and sign digitally — no printing or in-person visit required\n4  Once your signed agreement and payment are in place, you'll be assigned your unit and receive your personal gate code\n5  That's it — you're ready to go!\nBilling We accept credit card payments, and billing is fully automatic. Your monthly payment is charged to your card on file — no invoices to chase, no e-transfers to remember, and nothing to think about. It just happens seamlessly in the background so you can focus on everything else.\nThe entire experience — from signing up to managing your rental — is designed to be as easy and hassle-free as possible.",
  },
];

export const TESTIMONIALS = {
  eyebrow: "Client Testimonial",
  heading: "Read Our Client Feedback & Reviews",
  items: [
    {
      text: "Great service, good rates and very easy to work with! I would definitely recommend Box It Up for any of your storage needs :)!",
      name: "Josh",
      role: "Client",
    },
    {
      text: "This was the best storage company EVER to deal with. It is privately owned and operated by a young couple who were easy to reach, incredibly accommodating, and totally professional. The location was also ideal for us as it is on the edge of Chilliwack.",
      name: "Kristin",
      role: "Client",
    },
    {
      text: "Excellent customer service experience along with value for money in a safe and secure compound. Highly recommended, it’s my storage facility of choice! Thank you for the great service.",
      name: "Suzanne",
      role: "Client",
    },
  ],
  rating: { score: "5.0+", count: "75+ reviews", label: "Excellent Score" },
  image: `${MEDIA}/2024/08/IMG_3701.HEIC.jpg`,
  reviewsUrl:
    "https://www.google.com/maps/place/Box+It+Up+Storage/@49.1662027,-121.9898882,635m/data=!3m1!1e3!4m8!3m7!1s0x548447388a778223:0xc66e8fc770f08c13!8m2!3d49.1662027!4d-121.9873133!9m1!1b1!16s%2Fg%2F11swzklbx6",
};

export const FINAL_CTA = {
  heading: "Box It Up Today",
  body: "At Box It Up Storage, customer satisfaction is our number one priority. We offer flexible storage solutions that fit your needs. Contact us today to learn more about how we can meet your storage needs.",
  cta: { label: "Book Now", href: "/inquire-today" },
};

/**
 * The /inquire-today "Request a Quote" page — a step-by-step questionnaire.
 * Every word here (heading, each step's question/help/options, button labels,
 * success message) is editable in the CMS under the "Request a Quote Form"
 * section. Step `id`s `name`, `email`, `phone`, `boxSize`, `service` and
 * `message` map to the matching submission columns; any other step is folded
 * into the submission message (and the full set is always saved in `raw`).
 * Step `type` is one of: choice | text | email | tel | textarea.
 */
export type QuoteStep = {
  id: string;
  question: string;
  help: string;
  type: "choice" | "text" | "email" | "tel" | "textarea";
  required: boolean;
  options?: string[];
  placeholder?: string;
};

export type QuoteFormContent = {
  heading: string;
  subheading: string;
  backLabel: string;
  nextLabel: string;
  submitLabel: string;
  successHeading: string;
  successBody: string;
  steps: QuoteStep[];
};

export const QUOTE_FORM: QuoteFormContent = {
  heading: "Get A Quote",
  subheading:
    "Reach out to us today to explore your storage options. Discover the ideal solution with our Rent a Box service.",
  backLabel: "Back",
  nextLabel: "Next",
  submitLabel: "Submit request",
  successHeading: "Thanks — we got your request!",
  successBody:
    "A member of our team will be in touch shortly to finalize your quote. For anything urgent, call 1-877-226-9488.",
  steps: [
    {
      id: "boxSize",
      question: "What size are you looking for?",
      help: "Pick the box that best fits your needs — we can help you decide if you're unsure.",
      type: "choice",
      required: true,
      options: ["8 Ft or 10 Ft", "20 Ft", "20 Ft Stackable", "40 Ft", "Not sure yet"],
    },
    {
      id: "service",
      question: "How would you like to access your storage?",
      help: "Daily access at our facility, affordable monthly-access stackable storage, or delivery to your door.",
      type: "choice",
      required: true,
      options: ["Daily Access", "Stackable Monthly Access", "Delivery To Door"],
    },
    {
      id: "duration",
      question: "How long do you expect to need storage?",
      help: "",
      type: "choice",
      required: false,
      options: ["Less than a month", "1–3 months", "3–6 months", "6+ months", "Not sure"],
    },
    {
      id: "name",
      question: "What's your name?",
      help: "",
      type: "text",
      required: true,
      placeholder: "Full name",
    },
    {
      id: "email",
      question: "What's the best email to reach you?",
      help: "We'll send your quote and any follow-up here.",
      type: "email",
      required: true,
      placeholder: "you@example.com",
    },
    {
      id: "phone",
      question: "What's the best phone number to reach you?",
      help: "Optional — handy if you'd prefer a quick call.",
      type: "tel",
      required: false,
      placeholder: "(604) 555-1234",
    },
    {
      id: "message",
      question: "Anything else we should know?",
      help: "Tell us what you're storing, your timing, or any questions you have.",
      type: "textarea",
      required: false,
      placeholder: "Optional message…",
    },
  ],
};
