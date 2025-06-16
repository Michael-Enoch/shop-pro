const theme = {
  fonts: {
    primary: "'Playwrite DE Grund', cursive",
    secondary: "'Lato', sans-serif",
    alt: "'Open Sans', sans-serif"
  },
  colors: {
    primary: "text-[#D97706]",         // Elegant burnt sienna (warm and professional)
    accent: "bg-[#C0402F]",         // Deep desaturated green (trustworthy and earthy)
    background: "bg-[#F5F3EF]",        // Soft off-white beige background
    surface: "bg-[#2E2E2E]",           // Dark charcoal for nav/cards for contrast and elegance
    textDark: "text-[#2D2A26]",        // Rich dark brown-gray for primary text
    textNav: "text-[#FAF8F6]",          // For text on dark nav backgrounds
    textBody: "text-[#2D2A26]",     // For general text on light backgrounds
    textLight: "text-[#7D7264]",       // Warm muted taupe for subtext
    hover: "hover:text-[#D97706]",     // Darker burnt tone for hover state
    border: "border-[#D9CFC3]",        // Light tan border for subtle framing
    altBg: "bg-[#B8B0A1]",
  },
  styles: {
    subtext: "text-[#7D7264] italic text-sm sm:text-lg md:text-lg mb-6",
    headings: "text-[#2E2E2E] text-2xl sm:text-3xl md:text-5xl font-semibold mb-3",
    subheadings: "text-[#4C463D] text-2xl sm:text-3xl md:text-5xl font-semibold mb-6",
    paragraphs: "text-[#2D2A26] text-sm sm:text-lg md:text-lg mb-6",
    button: "bg-[#B85C38] text-white px-6 py-3 rounded-lg hover:bg-[#A94438] text-sm sm:text-base md:text-lg",
    card: "bg-white shadow-md rounded-xl p-6",
  },
};

export default theme;
