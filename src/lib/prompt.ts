export interface NovelParams {
  summary?: string;
  background?: string;
  plot: string;
  requirements?: string;
  mode?: string;
  length?: string;
  outputLang?: string;
}

export function buildPrompt(params: NovelParams): string {
  const { summary, background, plot, requirements, mode, length, outputLang } = params;
  
  const langMap: Record<string, string> = {
    en: 'English',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
    es: 'Spanish',
  };
  
  const targetLang = langMap[outputLang || 'zh'] || 'Chinese';
  
  const modeDesc: Record<string, string> = {
    normal: 'standard narrative style',
    creative: 'highly creative and imaginative style with vivid descriptions',
    detailed: 'very detailed and elaborate style with rich world-building',
  };
  
  const lengthMap: Record<string, string> = {
    short: 'around 500 words',
    medium: 'around 1000 words',
    long: 'around 2000 words',
  };
  
  let prompt = `Write a novel chapter in ${targetLang}.\n\n`;
  
  if (summary) {
    prompt += `Previous summary:\n${summary}\n\n`;
  }
  
  if (background) {
    prompt += `Background / Character relationships:\n${background}\n\n`;
  }
  
  prompt += `Plot for this chapter:\n${plot}\n\n`;
  
  prompt += `Writing style: ${modeDesc[mode || 'normal']}\n`;
  prompt += `Length: ${lengthMap[length || 'medium']}\n`;
  
  if (requirements) {
    prompt += `\nAdditional requirements:\n${requirements}\n`;
  }
  
  prompt += `\nPlease write the chapter now. Make it engaging with natural dialogue and vivid descriptions.`;
  
  return prompt;
}

export function buildPolishPrompt(text: string, style: string, outputLang: string = 'zh'): string {
  const langMap: Record<string, string> = {
    en: 'English',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
    es: 'Spanish',
  };
  
  const targetLang = langMap[outputLang] || 'Chinese';
  
  return `Please polish and improve the following text in ${targetLang}. Make it more engaging, fix any grammar issues, and enhance the descriptions while keeping the original meaning:\n\n${text}`;
}

export function buildContinuePrompt(previousText: string, plot: string, outputLang: string = 'zh'): string {
  const langMap: Record<string, string> = {
    en: 'English',
    zh: 'Chinese',
    ja: 'Japanese',
    ko: 'Korean',
    es: 'Spanish',
  };
  
  const targetLang = langMap[outputLang] || 'Chinese';
  
  return `Continue the following story in ${targetLang}. The previous text ends here:\n\n${previousText}\n\nContinue the story based on this plot direction:\n${plot}\n\nWrite the next part naturally, maintaining the same style and tone.`;
}
