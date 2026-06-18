import candidateAvatarSrc from '../assets/candidate-avatar-gru.png'

export const socialLinks = [
  { label: 'Facebook', icon: 'facebook', href: '#page-top', className: 'footer-social-hit footer-social-hit--facebook' },
  { label: 'Instagram', icon: 'instagram', href: '#page-top', className: 'footer-social-hit footer-social-hit--instagram' },
  { label: 'X', icon: 'x', href: '#page-top', className: 'footer-social-hit footer-social-hit--x' },
  { label: 'Twitter', icon: 'twitter', href: '#page-top', className: 'footer-social-hit footer-social-hit--twitter' },
  { label: 'LinkedIn', icon: 'linkedin', href: '#page-top', className: 'footer-social-hit footer-social-hit--linkedin' },
  { label: 'Snapchat', icon: 'snapchat', href: '#page-top', className: 'footer-social-hit footer-social-hit--snapchat' },
] as const

export type SocialIconName = (typeof socialLinks)[number]['icon']

export const globalReachCards = [
  {
    className: 'global-reach-card--python',
    role: 'Python Developer',
    name: 'Felonious Gru',
    avatarSrc: candidateAvatarSrc,
  },
  {
    className: 'global-reach-card--frontend',
    role: 'Front End Wizard',
    name: 'Mel Muselphiem',
    avatarSrc: candidateAvatarSrc,
  },
]

export const membershipFeatures = [
  'Up to 25 active job posts',
  'Premium Placement & Visibility',
  'Messaging anyone, unlimited',
  'Unlimited invites',
  'View all applicants',
  'Unlimited invites to jobseekers',
]

export const customProfileSkills = ['Python Dev', 'Javascript', 'Front End', 'Back End', 'IOS Development', '+12']
export const customProfileFeedback = {
  eyebrow: 'Past Client Feedback',
  title: 'Best Developer Ever!',
}

export const commonQuestions = [
  {
    question: 'Do I have to sign a long-term contract?',
    answer:
      "Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson. Art party.",
  },
  {
    question: 'Can I pay for a whole year?',
    answer: "Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui.",
  },
  {
    question: 'What if I need help?',
    answer:
      "Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson. Art party.",
  },
]

export type PricingFeature = {
  label: string
  unavailable?: boolean
}

export type PricingPlan = {
  id: 'free' | 'premium'
  name: string
  subtitle?: string
  price?: string
  cadence?: string
  ariaLabel: string
  features: PricingFeature[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    subtitle: 'Basic',
    ariaLabel: 'Get started with the Free basic plan',
    features: [
      { label: '1 Active Job' },
      { label: 'Basic List Placement' },
      { label: 'Unlimited Job Applicants', unavailable: true },
      { label: 'Invite Anyone to Apply to Your Jobs', unavailable: true },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$79.99',
    cadence: 'Per Month',
    ariaLabel: 'Get started with the Premium plan',
    features: [
      { label: 'Unlimited Job Posts' },
      { label: 'Instant Job Post Approval' },
      { label: 'Premium List Placement' },
      { label: 'Unlimited Job Applicants' },
    ],
  },
]
