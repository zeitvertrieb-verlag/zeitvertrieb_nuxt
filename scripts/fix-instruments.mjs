import fs from 'fs';

const inputFile = './data/k-lang-works.json';
const json = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

const replacements = [
  { pattern: /\bFl\.?\b/g, replacement: 'Flute' },
  { pattern: /\bPiccoloflöte\b/gi, replacement: 'Piccolo' },
  { pattern: /\bPiccolo\b/g, replacement: 'Piccolo' },
  { pattern: /\bOb\.?\b/g, replacement: 'Oboe' },
  { pattern: /\bEnglish horn\b/gi, replacement: 'English Horn' },
  { pattern: /\bKl in Bb\b/gi, replacement: 'Clarinet in Bb' },
  { pattern: /\bKl in B\b/gi, replacement: 'Clarinet in B' },
  { pattern: /\bKl\b(?!\w)/g, replacement: 'Clarinet' },
  { pattern: /\bclar in Bb\b/gi, replacement: 'Clarinet in Bb' },
  { pattern: /\bclar\b(?!\w)/gi, replacement: 'Clarinet' },
  { pattern: /\bbassclar\b/gi, replacement: 'Bass Clarinet' },
  { pattern: /\bFg\.?\b/g, replacement: 'Bassoon' },
  { pattern: /\bbas\.?\b/gi, replacement: 'Bassoon' },
  { pattern: /\bHrn\.?\b/g, replacement: 'Horn' },
  { pattern: /\bHr\.?\b/g, replacement: 'Horn' },
  { pattern: /\bFlhr\b/gi, replacement: 'Flugelhorn' },
  { pattern: /\bhorn in F\b/gi, replacement: 'Horn in F' },
  { pattern: /\bTrp\.?\b/g, replacement: 'Trumpet' },
  { pattern: /\bTr\.?\b/g, replacement: 'Trumpet' },
  { pattern: /\btrumpet in Bb\b/gi, replacement: 'Trumpet in Bb' },
  { pattern: /\bPos\.?\b/g, replacement: 'Trombone' },
  { pattern: /\bTrb\.?\b/g, replacement: 'Trombone' },
  { pattern: /\bTromb\.?\b/g, replacement: 'Trombone' },
  { pattern: /\bTb\.?\b/g, replacement: 'Tuba' },
  { pattern: /\bPerk\.?\b/g, replacement: 'Percussion' },
  { pattern: /\bPerc\.?\b/g, replacement: 'Percussion' },
  { pattern: /\bSchlagzeug\b/gi, replacement: 'Percussion' },
  { pattern: /\btimpani\b/gi, replacement: 'Timpani' },
  { pattern: /\btimpano\b/gi, replacement: 'Timpani' },
  { pattern: /\bVl\.?\b/gi, replacement: 'Violin' },
  { pattern: /\bVl\b/gi, replacement: 'Violin' },
  { pattern: /\bvla\.?\b/gi, replacement: 'Viola' },
  { pattern: /\bVa\.?\b/gi, replacement: 'Viola' },
  { pattern: /\bva\b(?!\w)/gi, replacement: 'Viola' },
  { pattern: /\bvcl\.?\b/gi, replacement: 'Cello' },
  { pattern: /\bVc\.?\b/gi, replacement: 'Cello' },
  { pattern: /\bvc\b(?!\w)/gi, replacement: 'Cello' },
  { pattern: /\bvl\b(?!\w)/gi, replacement: 'Violin' },
  { pattern: /\bKb\.?\b/g, replacement: 'Double bass' },
  { pattern: /\bdb\b/gi, replacement: 'Double bass' },
  { pattern: /\bcb\b/gi, replacement: 'Double bass' },
  { pattern: /\bklar\b/gi, replacement: 'Clarinet' },
  { pattern: /\btrb\b/gi, replacement: 'Trombone' },
  { pattern: /\btrp\b/gi, replacement: 'Trumpet' },
  { pattern: /\bperc\b/gi, replacement: 'Percussion' },
  { pattern: /\bhr\b(?!\w)/gi, replacement: 'Horn' },
  { pattern: /\bhorn\b(?!\w)/gi, replacement: 'Horn' },
  { pattern: /\bsoprano\b/gi, replacement: 'Soprano' },
  { pattern: /\balt\b/gi, replacement: 'Alto' },
  { pattern: /\btenor\b/gi, replacement: 'Tenor' },
  { pattern: /\bbass(?!\w)/gi, replacement: 'Bass' },
  { pattern: /\bBa[sS][sS]\b/gi, replacement: 'Bass' },
  { pattern: /\bchoir\b/gi, replacement: 'Choir' },
  { pattern: /\borgan\b/gi, replacement: 'Organ' },
  { pattern: /\bharp\b/gi, replacement: 'Harp' },
  { pattern: /\bpiano\b/gi, replacement: 'Piano' },
  { pattern: /\bkeyb\b/gi, replacement: 'Keyboard' },
  { pattern: /\bkeyboard\b/gi, replacement: 'Keyboard' },
  { pattern: /\baccordion\b/gi, replacement: 'Accordion' },
  { pattern: /\bsaxophone\b/gi, replacement: 'Saxophone' },
  { pattern: /\bguitar\b/gi, replacement: 'Guitar' },
  { pattern: /\beuphonium\b/gi, replacement: 'Euphonium' },
  { pattern: /\bvibraphone\b/gi, replacement: 'Vibraphone' },
  { pattern: /\bglockenspiel\b/gi, replacement: 'Glockenspiel' },
  { pattern: /\bcrotales\b/gi, replacement: 'Crotales' },
  { pattern: /\btam-?tam\b/gi, replacement: 'Tam-tam' },
  { pattern: /\bgran cassa\b/gi, replacement: 'Gran Cassa' },
  { pattern: /\bcampana\b/gi, replacement: 'Campana' },
  { pattern: /\bharpsichord\b/gi, replacement: 'Harpsichord' },
  { pattern: /\bharmonium\b/gi, replacement: 'Harmonium' },
  { pattern: /\belectric guitar\b/gi, replacement: 'Electric Guitar' },
  { pattern: /\bcelesta\b/gi, replacement: 'Celesta' },
  { pattern: /\bflute\b/gi, replacement: 'Flute' },
  { pattern: /\boboe\b/gi, replacement: 'Oboe' },
  { pattern: /\bbassoon\b/gi, replacement: 'Bassoon' },
  { pattern: /\btrumpet\b/gi, replacement: 'Trumpet' },
  { pattern: /\btrombone\b/gi, replacement: 'Trombone' },
  { pattern: /\btuba\b/gi, replacement: 'Tuba' },
  { pattern: /\bviolin\b/gi, replacement: 'Violin' },
  { pattern: /\bviola\b/gi, replacement: 'Viola' },
  { pattern: /\bcello\b/gi, replacement: 'Cello' },
  { pattern: /\bdouble bass\b/gi, replacement: 'Double bass' },
  { pattern: /\bsop\b/gi, replacement: 'Soprano' },
  { pattern: /\bmarimba\b/gi, replacement: 'Marimba' },
  { pattern: /\btriangle\b/gi, replacement: 'Triangle' },
  { pattern: /\bStreichquartett\b/gi, replacement: 'String quartet' },
  { pattern: /\bStreichquintett\b/gi, replacement: 'String quintet' },
  { pattern: /\bKlavier\b/gi, replacement: 'Piano' },
  { pattern: /\bCembalo\b/gi, replacement: 'Harpsichord' },
  { pattern: /\bBandoneon\b/gi, replacement: 'Bandoneon' },
  { pattern: /\bLauten\b/gi, replacement: 'Lute' },
  { pattern: /\bFagott\b/gi, replacement: 'Bassoon' },
  { pattern: /\bPosaune\b/gi, replacement: 'Trombone' },
  { pattern: /\bTrompeten\b/gi, replacement: 'Trumpet' },
  { pattern: /\bFlöte\b/gi, replacement: 'Flute' },
  { pattern: /\bFluteöte\b/gi, replacement: 'Flute' },
  { pattern: /\bOrgel\b/gi, replacement: 'Organ' },
];

function processInstrumentation(text) {
  if (!text || typeof text !== 'string') return text;
  
  let result = text;
  result = result.replace(/ß/g, 'ss');
  for (const { pattern, replacement } of replacements) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

for (const category of Object.keys(json)) {
  const works = json[category];
  if (Array.isArray(works)) {
    for (const work of works) {
      if (work.instrumentation) {
        work.instrumentation = processInstrumentation(work.instrumentation);
      }
    }
  }
}

fs.writeFileSync(inputFile, JSON.stringify(json, null, 2));
console.log('Done!');
