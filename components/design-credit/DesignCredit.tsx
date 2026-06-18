import Image from 'next/image';

type DesignCreditProps = {
  /** URL waar de credit naartoe linkt. Default: https://snippt.nl/ */
  href?: string;
  /** Pad naar het logo (relatief aan /public). Default: /design-credit/logo.png */
  logoSrc?: string;
  /** Tekst voor de credit. Default: 'Design by' */
  label?: string;
  /** Open de link in een nieuw tabblad. Default: true */
  newTab?: boolean;
};

export function DesignCredit({
  href = 'https://snippt.nl/',
  logoSrc = '/design-credit/logo.png',
  label = 'Design by',
  newTab = true,
}: DesignCreditProps) {
  return (
    <div
      style={{
        paddingTop: 16,
        paddingBottom: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <a
        href={href}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          textDecoration: 'none',
        }}
      >
        <span
          style={{
            fontSize: 13,
            color: 'rgba(225,226,231,0.22)',
            letterSpacing: '0.12em',
          }}
        >
          {label}
        </span>
        <Image
          src={logoSrc}
          alt={label}
          width={72}
          height={22}
          style={{
            height: 'auto',
            opacity: 0.7,
            transition: 'opacity 0.2s',
            filter: 'brightness(0) saturate(100%) invert(83%) sepia(14%) saturate(648%) hue-rotate(200deg) brightness(103%) contrast(98%)',
          }}
          unoptimized
        />
      </a>
    </div>
  );
}
