// Brand color - used in JS files where CSS variables aren't available
export const BRAND_COLOR = '#212a3b'; // Dark blue-gray
export const BRAND_COLOR_HOVER = '#3d485e'; // Medium blue-gray

// Sample books for the homepage (using Open Library covers)
export const sampleBooks = [
    {
        _id: "1",
        title: "The Immortals of Meluha",
        author: "Amish Tripathi",
        slug: "the-immortals-of-meluha",
        coverURL: "https://covers.openlibrary.org/b/isbn/9789380658742-L.jpg",
        coverColor: "#f6e6c2",
    },
    {
        _id: "2",
        title: "The Secret of the Nagas",
        author: "Amish Tripathi",
        slug: "the-secret-of-the-nagas",
        coverURL: "https://covers.openlibrary.org/b/isbn/9789381626344-L.jpg",
        coverColor: "#f6e6c2",
    },
    {
        _id: "3",
        title: "The Oath of the Vayuputras",
        author: "Amish Tripathi",
        slug: "the-oath-of-the-vayuputras",
        coverURL: "https://covers.openlibrary.org/b/isbn/9789382618348-L.jpg",
        coverColor: "#f6e6c2",
    },
    {
        _id: "4",
        title: "Sita: Warrior of Mithila",
        author: "Amish Tripathi",
        slug: "sita-warrior-of-mithila",
        coverURL: "https://covers.openlibrary.org/b/isbn/9789386224583-L.jpg",
        coverColor: "#f6e6c2",
    },
    {
        _id: "5",
        title: "Scion of Ikshvaku",
        author: "Amish Tripathi",
        slug: "scion-of-ikshvaku",
        coverURL: "https://covers.openlibrary.org/b/isbn/9789385152146-L.jpg",
        coverColor: "#f6e6c2",
    },
    {
        _id: "6",
        title: "Jaya: An Illustrated Retelling of the Mahabharata",
        author: "Devdutt Pattanaik",
        slug: "jaya-mahabharata",
        coverURL: "https://covers.openlibrary.org/b/isbn/9780143104254-L.jpg",
        coverColor: "#f6e6c2",
    },
    {
        _id: "7",
        title: "Playing It My Way",
        author: "Sachin Tendulkar",
        slug: "playing-it-my-way",
        coverURL: "https://covers.openlibrary.org/b/isbn/9781447248148-L.jpg",
        coverColor: "#e8f2ff",
    },
    {
        _id: "8",
        title: "A Century Is Not Enough",
        author: "Sourav Ganguly",
        slug: "a-century-is-not-enough",
        coverURL: "https://covers.openlibrary.org/b/isbn/9780670088034-L.jpg",
        coverColor: "#e8f2ff",
    },
    {
        _id: "9",
        title: "Test of My Life",
        author: "Yuvraj Singh",
        slug: "test-of-my-life",
        coverURL: "https://covers.openlibrary.org/b/isbn/9780143419495-L.jpg",
        coverColor: "#e8f2ff",
    },
    {
        _id: "10",
        title: "The Brave: Param Vir Chakra Stories",
        author: "Rachna Bisht Rawat",
        slug: "the-brave-param-vir-chakra",
        coverURL: "https://covers.openlibrary.org/b/isbn/9780143424680-L.jpg",
        coverColor: "#ffe8e8",
    },
    {
        _id: "11",
        title: "India's Most Fearless",
        author: "Shiv Aroor & Rahul Singh",
        slug: "indias-most-fearless",
        coverURL: "https://covers.openlibrary.org/b/isbn/9780143442318-L.jpg",
        coverColor: "#ffe8e8",
    },
    {
        _id: "12",
        title: "Kargil: From Surprise to Victory",
        author: "V. P. Malik",
        slug: "kargil-from-surprise-to-victory",
        coverURL: "https://covers.openlibrary.org/b/isbn/9789350293133-L.jpg",
        coverColor: "#ffe8e8",
    },
];

// File validation helpers
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ACCEPTED_PDF_TYPES = ['application/pdf'];
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// Pre-configured VAPI assistant ID (hardcoded for this app)
export const ASSISTANT_ID = process.env.NEXT_PUBLIC_ASSISTANT_ID!;

// 11Labs Voice IDs - Optimized for conversational AI
// Voices selected for natural, engaging book conversations
export const voiceOptions = {
    Kanika: { id: 'H6QPv2pQZDcGqLwDTIJQ', name: 'Kanika' },

    // Indian voices
    Devi: { id: 'MF4J4IDTRo0AxOO4dpFR', name: 'Devi', description: 'Indian female voice' },
    Monika: { id: '1qEiC6qsybMkmnNdVMbK', name: 'Monika', description: 'Indian female voice' },
    Vihan: { id: 'bUTE2M5LdnqaUCd5tJB3', name: 'Vihan', description: 'Indian male voice' },
    Raju: { id: 'zT03pEAEi0VHKciJODfn', name: 'Raju', description: 'Indian male voice' },
    Niraj: {id: 'zgqefOY5FPQ3bB7OZTVR', name: 'Niraj', description: 'Indian male voice' },

};

// Voice categories for the selector UI
export const voiceCategories = {
    male: ['Vihan', 'Raju', 'Niraj'],
    female: ['Devi', 'Monika', 'Kanika'],
};

// Default voice
export const DEFAULT_VOICE = 'Kanika';

// ElevenLabs voice settings optimized for conversational AI
export const VOICE_SETTINGS = {
    stability: 0.45, // Lower for more emotional, dynamic delivery (0.30-0.50 is natural)
    similarityBoost: 0.75, // Enhances clarity without distortion
    style: 0, // Keep at 0 for conversational AI (higher = more latency, less stable)
    useSpeakerBoost: true, // Improves voice quality
    speed: 1.0, // Natural conversation speed
};

// VAPI configuration for natural conversation
// NOTE: These settings should be configured in the VAPI Dashboard for the assistant
// They are kept here for reference and documentation purposes
export const VAPI_DASHBOARD_CONFIG = {
    // Turn-taking settings
    startSpeakingPlan: {
        smartEndpointingEnabled: true,
        waitSeconds: 0.4,
    },
    stopSpeakingPlan: {
        numWords: 2,
        voiceSeconds: 0.2,
        backoffSeconds: 1.0,
    },
    // Timing settings
    silenceTimeoutSeconds: 30,
    responseDelaySeconds: 0.4,
    llmRequestDelaySeconds: 0.1,
    // Conversation features
    backgroundDenoisingEnabled: true,
    backchannelingEnabled: true,
    fillerInjectionEnabled: false,
};

// Clerk appearance overrides - Warm Literary Style
// Note: Tailwind requires static class names at build time, so we hardcode color values here
export const CLERK_AUTH_APPEARANCE_OVERRIDE = {
    rootBox: 'mx-auto',
    card: 'shadow-none border-none rounded-xl bg-transparent',
    headerTitle: '!text-2xl font-bold text-[#212a3b]',
    headerSubtitle: '!mt-3 !text-sm text-[#3d485e]',
    socialButtonsBlockButton:
        '!border border-[rgba(33,42,59,0.12)] hover:bg-[#212a3b]/10 transition-all h-12 text-lg !rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)]',
    socialButtonsBlockButtonText: 'font-medium !text-[#212a3b] !text-lg',
    formButtonPrimary:
        'bg-[#212a3b] hover:bg-[#3d485e] text-white font-medium !border-0 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08)] normal-case !h-12 !text-lg !rounded-xl',
    formFieldInput:
        '!border !border-[rgba(33,42,59,0.12)] !rounded-xl focus:ring-[#212a3b] focus:border-[#212a3b] !h-12 !min-h-12 !text-lg !bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.06)]',
    formFieldLabel: 'text-[#212a3b] font-medium text-lg',
    footerActionLink: 'text-[#212a3b] hover:text-[#3d485e] text-base font-medium',
};

