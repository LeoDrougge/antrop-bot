declare module 'gsap/SplitText' {
  import type { GSAPPlugin } from 'gsap';

  interface SplitTextOptions {
    type?: string;
    charsClass?: string;
    wordsClass?: string;
    linesClass?: string;
    reduceWhiteSpace?: boolean;
  }

  export default class SplitText implements GSAPPlugin {
    static register(gsap: unknown): void;

    constructor(
      target: Element | Element[] | string,
      vars?: SplitTextOptions
    );

    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
  }
}

