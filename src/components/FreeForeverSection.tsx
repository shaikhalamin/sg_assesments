import { cn } from '@/lib/utils'
import remoteRecruitMarkSrc from '../assets/optimized/logo_base.webp'
import { membershipFeatures } from './landingData'
import { SectionReveal, StatusIcon } from './shared'
import { blueLabel, cardSurface, figmaFrame, figmaSection, rrFont } from './styles'

const membershipFeaturePositions = ['top-[27.6%]', 'top-[35.6%]', 'top-[43.6%]', 'top-[51.6%]', 'top-[60%]', 'top-[68.6%]']

function PaypalMark() {
  return (
    <svg
      className="block h-7 w-6 max-[980px]:h-[21px] max-[980px]:w-[18px] max-[720px]:h-[26px] max-[720px]:w-[22px]"
      viewBox="132 1443 71 84"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M152.227 1524.14L153.697 1514.9H150.421H134.965L145.717 1446.61C145.746 1446.4 145.85 1446.21 146.011 1446.07C146.18 1445.94 146.386 1445.86 146.599 1445.86H172.681C181.375 1445.86 187.339 1447.66 190.489 1451.23C191.883 1452.73 192.854 1454.57 193.303 1456.57C193.793 1458.99 193.793 1461.49 193.303 1463.92V1466.02L194.773 1466.86C195.892 1467.41 196.902 1468.17 197.755 1469.08C199.039 1470.63 199.868 1472.51 200.149 1474.5C200.464 1477.1 200.35 1479.74 199.813 1482.31C199.259 1485.43 198.165 1488.43 196.579 1491.17C195.298 1493.37 193.566 1495.28 191.497 1496.76C189.415 1498.18 187.097 1499.22 184.651 1499.83C181.905 1500.52 179.083 1500.86 176.251 1500.83H174.193C172.751 1500.83 171.354 1501.34 170.245 1502.26C169.131 1503.2 168.398 1504.52 168.187 1505.96V1506.8L165.625 1523.09V1523.72C165.655 1523.83 165.655 1523.95 165.625 1524.06H165.373L152.227 1524.14Z" fill="#253D80" />
      <path d="M196.159 1464.34L195.907 1465.89C192.463 1483.53 180.661 1489.66 165.625 1489.66H157.981C156.142 1489.66 154.574 1491 154.285 1492.81L150.379 1517.68L149.245 1524.73C149.16 1525.3 149.324 1525.87 149.694 1526.31C150.065 1526.74 150.606 1526.99 151.177 1527H164.785C166.399 1527 167.771 1525.82 168.019 1524.23V1523.56L170.581 1507.3V1506.42C170.81 1504.83 172.169 1503.65 173.773 1503.65H175.999C189.145 1503.65 199.477 1498.31 202.459 1482.65C204.073 1477.29 203.077 1471.49 199.771 1466.98C198.722 1465.91 197.501 1465.01 196.159 1464.34Z" fill="#189BD7" />
      <path d="M192.547 1462.91L190.951 1462.49L189.187 1462.15C186.963 1461.82 184.716 1461.66 182.467 1461.69H161.971C161.492 1461.68 161.017 1461.78 160.585 1461.98C159.611 1462.44 158.932 1463.36 158.779 1464.42L154.579 1492.01V1492.81C154.868 1491 156.436 1489.66 158.275 1489.66H165.919C180.955 1489.66 192.757 1483.53 196.201 1465.89L196.453 1464.34C195.548 1463.87 194.607 1463.48 193.639 1463.16L192.547 1462.91Z" fill="#242E65" />
      <path d="M158.779 1464.42C158.932 1463.36 159.611 1462.44 160.585 1461.98C161.017 1461.78 161.492 1461.68 161.971 1461.69H182.467C184.716 1461.66 186.963 1461.82 189.187 1462.15L190.951 1462.49L192.547 1462.91L193.345 1463.16C194.313 1463.48 195.254 1463.87 196.159 1464.34C197.524 1459.09 196.273 1453.5 192.799 1449.34C188.599 1444.89 181.711 1443 172.723 1443H146.599C144.76 1443 143.192 1444.33 142.903 1446.15L132.025 1515.07C131.928 1515.72 132.117 1516.38 132.544 1516.88C132.971 1517.38 133.594 1517.67 134.251 1517.68H150.379L154.579 1492.01L158.779 1464.42Z" fill="#253D80" />
    </svg>
  )
}

function FreeForeverVisual() {
  return (
    <div
      className="absolute inset-0 min-h-0 select-text max-[720px]:relative max-[720px]:inset-auto max-[720px]:order-2 max-[720px]:mx-auto max-[720px]:min-h-[410px] max-[720px]:w-[min(100%,360px)]"
      aria-label="Premium membership tier"
    >
      <span
        className="absolute block size-[22px] rounded-full bg-[linear-gradient(135deg,#52b4da_0%,#1e3e85_100%)] shadow-[0_12px_24px_rgba(30,62,133,0.16)] top-[8%] left-[4.41989%] max-[720px]:top-[18px] max-[720px]:left-0 max-[720px]:size-4"
        aria-hidden="true"
      />
      <article
        className={cn(
          cardSurface,
          'absolute top-[8.42857%] left-[7.91897%] z-[1] box-border w-[32.68877%] min-h-[71.42857%] rounded-[34px] p-0 shadow-[14px_41px_100px_rgba(49,89,211,0.12)] max-[720px]:top-5 max-[720px]:left-1/2 max-[720px]:min-h-[360px] max-[720px]:w-[min(300px,calc(100%_-_34px))] max-[720px]:-translate-x-1/2 max-[720px]:px-[30px] max-[720px]:pt-7 max-[720px]:pb-[42px]',
        )}
      >
        <p className="absolute left-[9.01408%] top-[6.6%] m-0 text-xs font-bold leading-[1.2] tracking-[1.35px] text-[#808191] max-[980px]:text-[clamp(9px,1vw,12px)] max-[980px]:tracking-[1px]">
          Your Membership Tier
        </p>
        <h3 className="absolute left-[9.01408%] top-[11.8%] m-0 bg-[linear-gradient(135deg,#52b4da_0%,#1e3e85_100%)] bg-clip-text text-2xl font-bold leading-[1.25] tracking-normal text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] max-[980px]:text-[clamp(18px,2.1vw,24px)] max-[720px]:text-[22px]">
          Premium
        </h3>
        <p className="absolute left-[9.01408%] top-[21.8%] m-0 text-[10px] font-bold leading-[1.2] tracking-[0.75px] text-[rgba(17,20,45,0.507871)] max-[980px]:text-[8px] max-[980px]:tracking-[0.6px]">
          FEATURES
        </p>
        <ul className="absolute inset-0 m-0 list-none p-0">
          {membershipFeatures.map((feature, index) => (
            <li
              className={cn(
                'absolute left-[9.01408%] grid min-h-[18px] w-[calc(100%_-_18.02816%)] grid-cols-[16px_minmax(0,1fr)] items-center gap-x-[17px] text-sm font-normal leading-[1.3] tracking-normal text-[rgba(50,52,69,0.900189)] max-[980px]:min-h-[14px] max-[980px]:grid-cols-[12px_minmax(0,1fr)] max-[980px]:gap-x-3 max-[980px]:text-[clamp(10px,1.2vw,14px)] max-[720px]:text-[11px]',
                membershipFeaturePositions[index],
              )}
              key={feature}
            >
              <StatusIcon className="size-4 shadow-none max-[980px]:size-3" glyphClassName="stroke-[1.65] max-[980px]:stroke-[1.8]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </article>
      <aside
        className={cn(
          cardSurface,
          'absolute top-[65.42857%] left-[1.74954%] z-[2] grid box-border w-[32.41252%] min-h-[10.42857%] grid-cols-[61px_minmax(0,1fr)] items-center gap-x-3 rounded-[36.5px] py-1.5 pr-6 pl-1.5 shadow-[14px_13px_20px_rgba(135,129,245,0.11),14px_10px_30px_rgba(49,89,211,0.12)] max-[980px]:w-[min(300px,44%)] max-[980px]:grid-cols-[46px_minmax(0,1fr)] max-[980px]:gap-x-[9px] max-[980px]:py-[5px] max-[980px]:pr-[18px] max-[980px]:pl-[5px] max-[720px]:top-auto max-[720px]:bottom-[14px] max-[720px]:left-1/2 max-[720px]:min-h-[66px] max-[720px]:w-[min(300px,calc(100%_-_18px))] max-[720px]:grid-cols-[52px_minmax(0,1fr)] max-[720px]:-translate-x-1/2 max-[720px]:pr-[18px]',
        )}
        aria-label="Upcoming payment"
      >
        <span
          className="grid size-[61px] place-items-center rounded-full bg-[linear-gradient(135deg,rgba(235,237,255,0.48)_0%,rgba(173,184,255,0.48)_100%)] text-2xl font-black text-[#17469b] shadow-[14px_10px_30px_rgba(49,89,211,0.12)] select-none max-[980px]:size-[46px] max-[720px]:size-[52px]"
          aria-hidden="true"
        >
          <PaypalMark />
        </span>
        <p className="relative m-0 min-h-[45px] w-full min-w-36 overflow-visible">
          <span className="absolute top-0 left-0 block h-[21px] w-36 whitespace-nowrap text-xs font-semibold leading-[21px] tracking-normal text-[#1E3E85]">
            Upcoming Payment In...
          </span>
          <strong className="absolute top-[21px] left-0 block h-6 w-[140px] whitespace-nowrap text-[17px] font-medium leading-6 tracking-normal text-[#11142D]">
            14 Days - $79.99
          </strong>
        </p>
      </aside>
      <span
        className="absolute top-[23.57143%] left-[34.89871%] z-[3] grid aspect-square w-[8.37937%] place-items-center rounded-full bg-[linear-gradient(135deg,#52b4da_0%,#1e3e85_100%)] text-[34px] font-black text-white shadow-[14px_41px_50px_rgba(49,89,211,0.07)] select-none max-[720px]:top-40 max-[720px]:right-0 max-[720px]:left-auto max-[720px]:size-[62px] max-[720px]:rounded-[20px] max-[720px]:text-[28px]"
        aria-hidden="true"
      >
        <img
          className="h-auto w-[52.75%] max-[720px]:w-[34px]"
          src={remoteRecruitMarkSrc}
          width="144"
          height="120"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </span>
    </div>
  )
}

export default function FreeForeverSection() {
  return (
    <section
      className={cn(figmaSection, 'mt-7 overflow-visible [--section-width:1086px] [--section-ratio:1086/700] max-[720px]:mt-[74px]')}
      aria-labelledby="free-forever-title"
    >
      <SectionReveal
        className={cn(
          figmaFrame,
          rrFont,
          'w-[min(1086px,100%)] select-text text-[#11142d] max-[980px]:w-[min(900px,calc(100%_-_36px))] max-[980px]:min-h-0 max-[720px]:w-[min(500px,calc(100%_-_24px))] max-[720px]:min-h-0 max-[720px]:aspect-auto',
        )}
      >
        <div className="absolute inset-0 select-text text-[#11142d] max-[720px]:relative max-[720px]:inset-auto max-[720px]:grid max-[720px]:grid-cols-1 max-[720px]:gap-7">
          <FreeForeverVisual />
          <article className="absolute top-[22.7143%] left-[53.9595%] min-h-[400px] w-[40.7919%] max-w-[444px] select-text max-[1025px]:flex max-[1025px]:flex-col max-[720px]:relative max-[720px]:top-auto max-[720px]:left-auto max-[720px]:order-1 max-[720px]:mx-auto max-[720px]:min-h-0 max-[720px]:w-full max-[720px]:max-w-[310px]">
            <span className={cn(blueLabel, 'min-h-9 min-w-36 rounded-full px-5 py-0 text-xs font-semibold leading-[15px] tracking-normal max-[980px]:min-h-[30px] max-[980px]:min-w-[120px] max-[720px]:min-h-[34px] max-[720px]:px-4')}>
              Actually Fee Free
            </span>
            <h2
              id="free-forever-title"
              className="absolute top-[24%] right-0 bottom-[57.33%] left-0 m-0 text-[40px] font-medium leading-[52px] tracking-normal text-[#11142D] max-[1025px]:static max-[1025px]:mt-5 max-[1025px]:mb-4 max-[1025px]:text-[32px] max-[1025px]:leading-10 max-[1025px]:[overflow-wrap:break-word] max-[1025px]:[text-wrap:balance] max-[720px]:inset-auto max-[720px]:mt-[22px] max-[720px]:mb-[18px]"
            >
              Fee-Free Forever
            </h2>
            <p className="absolute top-[calc(50%_-_140px_/_2_+_64px)] right-0 left-0 m-0 h-[140px] max-w-[444px] text-[19px] font-normal leading-[35px] tracking-normal text-[rgba(17,20,45,0.637229)] max-[1025px]:static max-[1025px]:h-auto max-[1025px]:max-w-full max-[1025px]:text-base max-[1025px]:leading-7 max-[1025px]:[overflow-wrap:break-word]">
              We don&apos;t charge you fees and we don&apos;t put up paywalls. We&apos;re the bridge
              that connects job opportunities with the best candidates, with no middleman involved.
            </p>
          </article>
        </div>
      </SectionReveal>
    </section>
  )
}
