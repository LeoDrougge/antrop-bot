'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [workplace, setWorkplace] = useState('');
  const [need, setNeed] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadingTexts = [
    'Kollar våra tjänster',
    'Snokar bland case',
    'Funderar på lösningar',
    'Analyserar ditt behov',
    'Brainstormar idéer',
    'Granskar portfolio',
    'Tar fram exempel',
    'Kikar på strategier',
    'Utforskar metoder',
    'Kollar designsystem',
    'Gräver i arkivet',
    'Letar i verktygslådan',
    'Studerar användardata',
    'Skannar projekthistorik',
    'Analyserar möjligheter',
    'Kollar best practice',
    'Utvärderar approach',
    'Söker inspiration',
    'Kartlägger lösningar',
    'Studerar liknande case',
    'Granskar frameworks',
    'Kollar UX-mönster',
    'Tänker designsystem',
    'Utforskar koncept',
    'Analyserar målgrupp',
    'Kikar på tekniker',
    'Jämför alternativ',
    'Väger olika vägar',
    'Kollar komponenter',
    'Snokar i playbooken',
    'Studerar patterns',
    'Letar smarta lösningar',
    'Analyserar kontext',
    'Kollar referencias',
    'Tänker storytelling',
    'Utvärderar verktyg',
    'Söker paralleller',
    'Granskar processer',
    'Kollar metodik',
    'Studerar användarbehov',
    'Analyserar värdeflöden',
    'Kikar på interfaces',
    'Utforskar interaktioner',
    'Kollar tillgänglighet',
    'Tänker användarresor',
    'Granskar touchpoints',
    'Studerar ekosystem',
    'Analyserar insights',
    'Kollar designprinciper',
    'Letar i casestudies',
    'Utvärderar koncept',
    'Söker synergier',
    'Tänker helhetsgrepp',
    'Kollar kompetensteam',
    'Analyserar scope',
  ];

  const workplaceRef = useRef<HTMLSpanElement>(null);
  const needRef = useRef<HTMLSpanElement>(null);


  const handleSubmit = async () => {
    if (!workplace || !need) return;

    // Save inputs to localStorage and navigate to loading page
    localStorage.setItem('antropWorkplace', workplace);
    localStorage.setItem('antropNeed', need);
    localStorage.removeItem('antropResponse'); // Clear old response

    // Navigate to loading page - it will handle the API call
    router.push('/loading');
  };


  useEffect(() => {
    if (loading) {
      // Start with a random index
      setLoadingTextIndex(Math.floor(Math.random() * loadingTexts.length));

      const interval = setInterval(() => {
        setLoadingTextIndex(Math.floor(Math.random() * loadingTexts.length));
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [loading, loadingTexts.length]);

  return (
    <main 
      className="min-h-screen flex flex-col gap-1 px-20 pb-16"
      style={{ backgroundColor: 'var(--app_background)' }}
    >
      {/* Header */}
      <div className="h-[72px] w-full max-w-[1268px] mx-auto flex">
        <div 
          className="flex-1 flex items-center border-b border-dashed"
          style={{ borderColor: 'var(--outline_muted)' }}
        >
          <a href="/" className="header-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
            Antrop bot
          </a>
        </div>
        <div 
          className="flex-1 flex items-center justify-end border-b border-dashed"
          style={{ borderColor: 'var(--outline_muted)' }}
        >
          <p className="header-sm" style={{ color: 'var(--text-muted)' }}>
            v 0.2
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-[1268px] mx-auto mt-8 flex gap-6 items-start justify-between">
        {/* Left Column */}
        <div className="flex flex-col gap-12 flex-1">
          {/* Text */}
          <div className="header-antrop-lg line-height-relaxed flex flex-wrap gap-x-[0.5em]" style={{ color: 'var(--text-regular)' }}>
            <span className="whitespace-nowrap">JAG KOMMER FRÅN</span>
            <span
              ref={workplaceRef}
              contentEditable={!loading}
              suppressContentEditableWarning
              onInput={(e) => setWorkplace(e.currentTarget.textContent || '')}
              data-placeholder="MIN ARBETSPLATS"
              className={`${
                workplace
                  ? ''
                  : 'empty:before:content-[attr(data-placeholder)]'
              } cursor-pen underline decoration-[var(--text-regular)] outline-none whitespace-nowrap inline-block`}
              style={{ 
                color: workplace ? 'var(--text-regular)' : 'var(--text-muted)',
                textDecorationSkipInk: 'none',
                textUnderlineOffset: '0.2em',
                caretColor: '#08F9F9',
                caretShape: 'block'
              }}
              onFocus={(e) => {
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(e.currentTarget);
                sel?.removeAllRanges();
                sel?.addRange(range);
              }}
            >
            </span>
            <span className="whitespace-nowrap">OCH BEHÖVER HJÄLP MED</span>
            <span
              ref={needRef}
              contentEditable={!loading}
              suppressContentEditableWarning
              onInput={(e) => setNeed(e.currentTarget.textContent || '')}
              data-placeholder="MIN UTMANING"
              className={`${
                need
                  ? ''
                  : 'empty:before:content-[attr(data-placeholder)]'
              } cursor-pen underline decoration-[var(--text-regular)] outline-none whitespace-nowrap inline-block`}
              style={{ 
                color: need ? 'var(--text-regular)' : 'var(--text-muted)',
                textDecorationSkipInk: 'none',
                textUnderlineOffset: '0.2em',
                caretColor: '#08F9F9',
                caretShape: 'block'
              }}
              onFocus={(e) => {
                const range = document.createRange();
                const sel = window.getSelection();
                range.selectNodeContents(e.currentTarget);
                sel?.removeAllRanges();
                sel?.addRange(range);
              }}
            >
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={!workplace || !need || loading}
            className="header-sm flex items-center justify-center gap-7 px-12 py-4 rounded-full min-w-[308px] w-fit transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: 'var(--text-regular)',
              color: 'var(--app_background)',
              border: '1.283px solid #0f3951'
            }}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="inline-block min-w-[180px] text-left animate-pulse">
                  {loadingTexts[loadingTextIndex]}
                </span>
              </>
            ) : (
              <>
                <span>Se hur vi kan hjälpa dig</span>
                <Image src="/Assets/arrow-free.svg" alt="Arrow" width={27} height={22} />
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4" style={{ backgroundColor: 'var(--surface_mid)' }}>
              <p className="text-antrop-regular" style={{ color: 'var(--text-regular)' }}>{error}</p>
            </div>
          )}
        </div>

        {/* Right Column - Image */}
        <div className="flex items-center justify-center flex-shrink-0">
          <Image 
            src="/Assets/start-illu.png" 
            alt="Start illustration"
            width={218}
            height={196}
            className="w-[218px] h-[196px] object-contain"
          />
        </div>
      </div>
    </main>
  );
}
