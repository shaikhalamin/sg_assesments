import { readFileSync } from 'node:fs'

const app = readFileSync('src/App.tsx', 'utf8')
const css = readFileSync('src/App.css', 'utf8')

const checks = [
  {
    name: 'profile feature uses the profile/video art from the reference',
    pass: app.includes("profileSrc from '../supporting_files/Group 136-1.png'"),
  },
  {
    name: 'feature art is not duplicated with extra manual logo orbs',
    pass: !app.includes('brand-orb') && !css.includes('.brand-orb'),
  },
  {
    name: 'desktop hero is calibrated to the 1440px reference height',
    pass: css.includes('min-height: 560px;'),
  },
  {
    name: 'help band uses the reference lavender-blue background',
    pass: css.includes('background: #e8edff;'),
  },
  {
    name: 'footer starts with the dark blue wave behind pricing cards',
    pass:
      css.includes('.pricing-section::after') &&
      css.includes('clip-path: ellipse(84% 52% at 50% 100%);') &&
      css.includes('background: #244f90;'),
  },
]

const failures = checks.filter((check) => !check.pass)

if (failures.length) {
  console.error('Visual contract failed:')
  for (const failure of failures) {
    console.error(`- ${failure.name}`)
  }
  process.exit(1)
}

console.log(`Visual contract passed (${checks.length} checks).`)
