'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';

export default function Home() {
  const router = useRouter();
  const [workplace, setWorkplace] = useState('');
  const [need, setNeed] = useState('');

  const workplaceRef = useRef<HTMLSpanElement>(null);
  const needRef = useRef<HTMLSpanElement>(null);

  // Function to remove line breaks (but keep spaces)
  const removeLineBreaks = (text: string) => {
    return text.replace(/[\r\n]+/g, ' ');
  };

  // Handle input with line break removal
  const handleWorkplaceInput = (e: React.FormEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.textContent || '';
    const cleaned = removeLineBreaks(text);
    if (text !== cleaned) {
      e.currentTarget.textContent = cleaned;
      // Move cursor to end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(e.currentTarget);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    setWorkplace(cleaned);
  };

  const handleNeedInput = (e: React.FormEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.textContent || '';
    const cleaned = removeLineBreaks(text);
    if (text !== cleaned) {
      e.currentTarget.textContent = cleaned;
      // Move cursor to end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(e.currentTarget);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    setNeed(cleaned);
  };

  // Prevent Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // Handle paste and clean line breaks (but keep spaces)
  const handlePaste = (e: React.ClipboardEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    const cleaned = text.replace(/[\r\n]+/g, ' ');
    document.execCommand('insertText', false, cleaned);
  };

  const handleSubmit = async () => {
    if (!workplace || !need) return;

    // Save inputs to localStorage and navigate to loading page
    localStorage.setItem('antropWorkplace', workplace);
    localStorage.setItem('antropNeed', need);
    localStorage.removeItem('antropResponse'); // Clear old response

    // Navigate to loading page - it will handle the API call
    router.push('/loading');
  };



  return (
    <main 
      className="min-h-screen flex flex-col page-container"
      style={{ backgroundColor: 'var(--app_background)' }}
    >
      <Header />

      {/* Content - vertically centered */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full max-w-[1268px] mx-auto page-container flex flex-col-reverse sm:flex-row gap-8 sm:gap-6 items-start justify-between">
        {/* Left Column */}
        <div className="flex flex-col gap-12 flex-1">
          {/* Text */}
          <div className="header-antrop-lg line-height-relaxed flex flex-wrap gap-x-[0.5em]" style={{ color: 'var(--text-regular)' }}>
            <span className="whitespace-nowrap">JAG KOMMER FRÅN</span>
            <span
              ref={workplaceRef}
              contentEditable
              suppressContentEditableWarning
              onInput={handleWorkplaceInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              data-placeholder="MIN ARBETSPLATS"
              className={`${
                workplace
                  ? ''
                  : 'empty:before:content-[attr(data-placeholder)]'
              } cursor-pen underline decoration-[var(--text-regular)] outline-none sm:whitespace-nowrap inline-block`}
              style={{ 
                color: workplace ? 'var(--text-regular)' : 'var(--text-muted)',
                textDecorationSkipInk: 'none',
                textUnderlineOffset: '0.2em',
                caretColor: '#08F9F9',
                caretShape: 'block',
                whiteSpace: 'nowrap'
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
              contentEditable
              suppressContentEditableWarning
              onInput={handleNeedInput}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              data-placeholder="MIN UTMANING"
              className={`${
                need
                  ? ''
                  : 'empty:before:content-[attr(data-placeholder)]'
              } cursor-pen underline decoration-[var(--text-regular)] outline-none sm:whitespace-nowrap inline-block`}
              style={{ 
                color: need ? 'var(--text-regular)' : 'var(--text-muted)',
                textDecorationSkipInk: 'none',
                textUnderlineOffset: '0.2em',
                caretColor: '#08F9F9',
                caretShape: 'block',
                whiteSpace: 'nowrap'
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

          {/* Button and Disclaimer */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSubmit}
              disabled={!workplace || !need}
              className="header-sm flex items-center justify-center gap-7 px-12 py-4 rounded-full w-full sm:w-fit sm:min-w-[308px] transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: 'var(--text-regular)',
                color: 'var(--app_background)',
                border: '1.283px solid #0f3951'
              }}
            >
              <span>Se hur vi kan hjälpa</span>
              <Image src="/Assets/arrow-free.svg" alt="Arrow" width={27} height={22} />
            </button>

            {/* AI Disclaimer */}
            <p className="text-antrop-regular" style={{ color: 'var(--text-muted)' }}>
              Svaren skapas med hjälp av AI.
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="flex items-center justify-center flex-shrink-0 w-full sm:w-auto">
          <Image 
            src="/Assets/start-illu.png" 
            alt="Start illustration"
            width={218}
            height={196}
            className="w-[218px] h-[196px] object-contain"
          />
        </div>
      </div>
      </div>
    </main>
  );
}
