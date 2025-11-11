'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';

interface InlineSelectProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function InlineSelect({
  value,
  onChange,
  suggestions,
  placeholder = '',
  className = '',
  disabled = false,
}: InlineSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0 });
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const cursorPositionRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(value.toLowerCase())
  );

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
    spanRef.current?.blur();
  };

  const updateDropdownPosition = () => {
    if (spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  };

  const handleFocus = () => {
    if (disabled) return;
    setIsOpen(true);
    updateDropdownPosition();

    // Auto-select text on focus
    const range = document.createRange();
    const sel = window.getSelection();
    if (spanRef.current) {
      range.selectNodeContents(spanRef.current);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Only close if clicking outside both span and dropdown
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    // Save cursor position
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      cursorPositionRef.current = range.startOffset;
    }

    onChange(e.currentTarget.textContent || '');
    setIsOpen(true);
    updateDropdownPosition();
  };

  // Restore cursor position after value change
  React.useEffect(() => {
    if (cursorPositionRef.current !== null && spanRef.current && document.activeElement === spanRef.current) {
      const sel = window.getSelection();
      const range = document.createRange();

      try {
        const textNode = spanRef.current.firstChild;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          const offset = Math.min(cursorPositionRef.current, textNode.textContent?.length || 0);
          range.setStart(textNode, offset);
          range.setEnd(textNode, offset);
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      } catch {
        // Ignore errors if cursor position is invalid
      }

      cursorPositionRef.current = null;
    }
  }, [value]);

  return (
    <>
      <span
        ref={spanRef}
        contentEditable={!disabled}
        suppressContentEditableWarning
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
        className={className}
        data-placeholder={placeholder}
      >
        {value || placeholder}
      </span>
      {mounted && isOpen && filteredSuggestions.length > 0 && createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-50 w-max min-w-[200px] bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden"
          style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
          onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center justify-between transition-colors"
            >
              <span className="text-sm">{suggestion}</span>
              {value === suggestion && (
                <Check className="h-4 w-4 text-indigo-600" />
              )}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
