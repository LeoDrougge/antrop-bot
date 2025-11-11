'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';

import { FramedBlock } from '@/components/exempel/FramedBlock';
import { useBorderAnimation } from '@/hooks/useBorderAnimation';

const services = [
  {
    id: '1',
    title: 'Inventering och audit',
    description: 'Kartlägg och analysera befintliga mönster och avvikelser.',
    iconType: 'number' as const,
    iconLabel: '1',
  },
  {
    id: '2',
    title: 'Definiera designprinciper och tokens',
    description: 'Kartlägg och analysera befintliga mönster och avvikelser.',
    iconType: 'number' as const,
    iconLabel: '2',
  },
  {
    id: '3',
    title: 'Bygga och dokumentera komponenter',
    description: 'Kartlägg och analysera befintliga mönster och avvikelser.',
    iconType: 'number' as const,
    iconLabel: '3',
  },
  {
    id: 'note',
    title: 'Obs! Detta är bara några ödmjuka förslag',
    description: 'Exakt hur vi tar oss an projektet beslutar vi tillsammans.',
    iconType: 'illustration' as const,
    iconLabel: 'smiley',
  },
];

const caseStudies = [
  {
    id: 'sj',
    title: 'Designsystem för SJ',
    description:
      'Vi kartlade hela kundresan för SJ och skapade ett designsystem som förbättrade upplevelsen över alla digitala kanaler.',
  },
  {
    id: 'apotea',
    title: 'Designsystem för Apotea',
    description:
      'Vi skapade beteendepersonas och kundresor för Idre Fjäll som hjälpte dem förstå sina besökare bättre och prioritera utvecklingsinsatser.',
  },
];

export default function Exempel() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useBorderAnimation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setError('Vänligen fyll i din e-postadress.');
      setStatus('idle');
      return;
    }

    setStatus('loading');
    setError(null);

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          workplace: 'Menigo',
          need: 'bygga ett designsystem',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Kunde inte skicka meddelandet.');
      }

      setStatus('success');
      setEmail('');
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : 'Kunde inte skicka meddelandet.';
      setError(message);
      setStatus('error');
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--app_background)' }} className="min-h-screen">
      <div className="mx-auto flex max-w-[944px] flex-col gap-16 px-6 py-20">
        <div className="flex items-center justify-between">
          <p className="header-sm" style={{ color: 'var(--text-muted)' }}>
            Antrop Bot
          </p>
          <p className="header-sm" style={{ color: 'var(--text-muted)' }}>
            v 0.2
          </p>
        </div>

        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-6">
            <h1 className="header-antrop-lg" style={{ color: 'var(--text-regular)' }}>
              Hej Menigo! Så här kan vi hjälpa er göra ett designsystem
            </h1>
            <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
              Att skapa ett designsystem kan kännas stort och komplext. På Antrop har vi erfarenhet av B2B-kunder inom
              livsmedelsbranschen och kan hjälpa dig strukturera och förtydliga digitala lösningar.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm md:mx-0 md:w-auto">
            <div style={{ backgroundColor: 'var(--app_background)', padding: '1.25rem' }}>
              <Image
                src="/Assets/digital-design-01.png"
                alt="Illustration av digital design"
                width={499}
                height={353}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>

        <section className="space-y-6">
          <p className="header-sm" style={{ color: 'var(--text-regular)' }}>
            Saker vi brukar göra
          </p>

          <div className="space-y-6">
            {services.map((service) => (
              <FramedBlock
                key={service.id}
                left={
                  service.iconType === 'number' ? (
                    <span className="header-antrop-lg" style={{ color: 'var(--text-regular)' }}>
                      {service.iconLabel}
                    </span>
                  ) : (
                    <Image src="/Assets/smiley.svg" alt="Smile" width={44} height={44} />
                  )
                }
                className="flex-col gap-6 md:flex-row md:gap-0"
              >
                <div className="space-y-2">
                  <h3 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                    {service.title}
                  </h3>
                  <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
                    {service.description}
                  </p>
                </div>
              </FramedBlock>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <p className="header-sm" style={{ color: 'var(--text-regular)' }}>
            Saker vi gjort innan
          </p>

          <div>
            {caseStudies.map((item) => (
              <FramedBlock
                key={item.id}
                left={<Image src="/Assets/arrow-right.svg" alt="Pil" width={44} height={44} />}
                className="flex-col gap-6 md:flex-row md:gap-0"
              >
                <div className="space-y-2">
                  <h3 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                    {item.title}
                  </h3>
                  <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
                    {item.description}
                  </p>
                </div>
              </FramedBlock>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <p className="header-sm" style={{ color: 'var(--text-regular)' }}>
            Låt oss prata vidare!
          </p>

          <FramedBlock
            left={<Image src="/Assets/mail.svg" alt="E-post" width={44} height={44} />}
            className="flex-col gap-6 md:flex-row md:gap-0"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                  Fyll i din epostadress så kontaktar vi dig inom kort
                </h3>
                <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
                  Vi diskuterar era utmaningar, målgrupper och affärsmål för att skräddarsy uppdraget efter era behov.
                </p>
              </div>

              <form className="flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="email">
                  E-postadress
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="namn@epost.com"
                  className="text-antrop-regular w-full bg-[var(--text-muted)] px-5 py-3 tracking-[-0.64px] outline-none"
                  style={{ color: 'var(--app_background)' }}
                  onFocus={(event) => {
                    event.target.style.backgroundColor = 'var(--text-regular)';
                    event.target.style.color = 'var(--app_background)';
                  }}
                  onBlur={(event) => {
                    event.target.style.backgroundColor = 'var(--text-muted)';
                    event.target.style.color = 'var(--app_background)';
                  }}
                />
                <button
                  type="submit"
                  className="header-sm flex items-center gap-3 whitespace-nowrap bg-transparent px-2 py-3"
                  style={{ color: 'var(--text-regular)' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Skickar…' : 'Skicka'}
                  <Image src="/Assets/arrow-right.svg" alt="Skicka" width={29} height={23} />
                </button>
              </form>

              {status === 'success' && (
                <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                  Tack! Vi hör av oss snart.
                </p>
              )}
              {error && (
                <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>
                  {error}
                </p>
              )}
            </div>
          </FramedBlock>

          <FramedBlock
            left={
              <Image src="/Assets/sara.png" alt="Sara Nero" width={80} height={80} className="rounded-full" />
            }
            className="flex-col gap-4 sm:flex-row sm:gap-0"
          >
            <div className="space-y-2">
              <h3 className="header-sm" style={{ color: 'var(--text-regular)' }}>
                Kontakta mig direkt
              </h3>
              <div className="text-antrop-regular space-y-1" style={{ color: 'var(--text-muted)' }}>
                <p>
                  <a href="mailto:sara.nero@antrop.se" className="hover:underline" style={{ color: 'var(--text-regular)' }}>
                    sara.nero@antrop.se
                  </a>
                </p>
                <p>
                  <a href="tel:+46730662036" className="hover:underline" style={{ color: 'var(--text-regular)' }}>
                    073-066 20 36
                  </a>
                </p>
              </div>
            </div>
          </FramedBlock>
        </section>
      </div>
    </main>
  );
}

