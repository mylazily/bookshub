export type Locale = 'en' | 'zh' | 'ja' | 'ko' | 'es';

const defaultLocale: Locale = 'zh';

export function getLocale(url: URL): Locale {
  const pathLang = url.pathname.split('/')[1];
  if (['en', 'zh', 'ja', 'ko', 'es'].includes(pathLang)) return pathLang as Locale;
  
  const queryLang = url.searchParams.get('lang');
  if (queryLang && ['en', 'zh', 'ja', 'ko', 'es'].includes(queryLang)) return queryLang as Locale;
  
  return defaultLocale;
}

export function t(locale: Locale, key: string): string {
  const messages = getMessages(locale);
  const keys = key.split('.');
  let value: any = messages;
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return key;
  }
  return typeof value === 'string' ? value : key;
}

export function getMessages(locale: Locale): Record<string, any> {
  try {
    const messages: Record<Locale, any> = {
      en: {
        site: { name: 'BooksHub', description: 'AI-powered novel writing assistant' },
        nav: { write: 'Write', history: 'History', settings: 'Settings' },
        write: {
          title: 'AI Novel Writer',
          summary: 'Previous Summary (Optional)',
          summaryPlaceholder: 'What happened before...',
          background: 'Background / Characters (Optional)',
          backgroundPlaceholder: 'Character relationships, world setting...',
          plot: 'Plot (Required)',
          plotPlaceholder: 'What happens in this chapter...',
          requirements: 'Requirements (Optional)',
          requirementsPlaceholder: 'Writing style, tone, word count...',
          mode: 'Writing Mode',
          modeNormal: 'Normal',
          modeCreative: 'Creative',
          modeDetailed: 'Detailed',
          length: 'Length',
          lengthShort: 'Short',
          lengthMedium: 'Medium',
          lengthLong: 'Long',
          generate: 'Generate',
          generating: 'Generating...',
          output: 'Output',
          copy: 'Copy',
          download: 'Download',
          polish: 'Polish',
          continue: 'Continue',
          empty: 'Your generated content will appear here',
          history: 'History',
          clear: 'Clear',
        },
        errors: {
          plotRequired: 'Please enter the plot',
          generateFailed: 'Generation failed, please try again',
        }
      },
      zh: {
        site: { name: 'BooksHub', description: 'AI小说写作助手' },
        nav: { write: '写作', history: '历史', settings: '设置' },
        write: {
          title: 'AI小说生成器',
          summary: '前情概要（选填）',
          summaryPlaceholder: '之前发生了什么...',
          background: '背景/人物关系（选填）',
          backgroundPlaceholder: '人物关系、世界观设定...',
          plot: '剧情（必填）',
          plotPlaceholder: '这一章发生了什么...',
          requirements: '要求（选填）',
          requirementsPlaceholder: '写作风格、语气、字数要求...',
          mode: '创作模式',
          modeNormal: '标准',
          modeCreative: '创意',
          modeDetailed: '详细',
          length: '篇幅',
          lengthShort: '短篇',
          lengthMedium: '中篇',
          lengthLong: '长篇',
          generate: '生成',
          generating: '生成中...',
          output: '系统输出',
          copy: '复制',
          download: '下载',
          polish: '润色',
          continue: '续写',
          empty: '生成的内容将显示在这里',
          history: '历史记录',
          clear: '清空',
        },
        errors: {
          plotRequired: '请输入剧情',
          generateFailed: '生成失败，请重试',
        }
      },
      ja: {
        site: { name: 'BooksHub', description: 'AI小説執筆アシスタント' },
        nav: { write: '執筆', history: '履歴', settings: '設定' },
        write: {
          title: 'AI小説生成器',
          summary: '前回のあらすじ（任意）',
          summaryPlaceholder: '以前に何が起こったか...',
          background: '背景/人物関係（任意）',
          backgroundPlaceholder: '人物関係、世界観の設定...',
          plot: 'プロット（必須）',
          plotPlaceholder: 'この章で何が起こるか...',
          requirements: '要件（任意）',
          requirementsPlaceholder: '文体、トーン、文字数...',
          mode: '作成モード',
          modeNormal: '標準',
          modeCreative: 'クリエイティブ',
          modeDetailed: '詳細',
          length: '長さ',
          lengthShort: '短編',
          lengthMedium: '中編',
          lengthLong: '長編',
          generate: '生成',
          generating: '生成中...',
          output: '出力',
          copy: 'コピー',
          download: 'ダウンロード',
          polish: '磨き上げ',
          continue: '続きを書く',
          empty: '生成されたコンテンツがここに表示されます',
          history: '履歴',
          clear: 'クリア',
        },
        errors: {
          plotRequired: 'プロットを入力してください',
          generateFailed: '生成に失敗しました。もう一度お試しください',
        }
      },
      ko: {
        site: { name: 'BooksHub', description: 'AI 소설 작성 도우미' },
        nav: { write: '작성', history: '기록', settings: '설정' },
        write: {
          title: 'AI 소설 생성기',
          summary: '이전 내용 요약 (선택)',
          summaryPlaceholder: '이전에 무슨 일이 있었는지...',
          background: '배경/인물 관계 (선택)',
          backgroundPlaceholder: '인물 관계, 세계관 설정...',
          plot: '플롯 (필수)',
          plotPlaceholder: '이 장에서 무슨 일이 일어나는지...',
          requirements: '요구사항 (선택)',
          requirementsPlaceholder: '문체, 어조, 글자 수...',
          mode: '창작 모드',
          modeNormal: '표준',
          modeCreative: '창의적',
          modeDetailed: '상세',
          length: '길이',
          lengthShort: '단편',
          lengthMedium: '중편',
          lengthLong: '장편',
          generate: '생성',
          generating: '생성 중...',
          output: '출력',
          copy: '복사',
          download: '다운로드',
          polish: '다듬기',
          continue: '계속 쓰기',
          empty: '생성된 내용이 여기에 표시됩니다',
          history: '기록',
          clear: '비우기',
        },
        errors: {
          plotRequired: '플롯을 입력하세요',
          generateFailed: '생성에 실패했습니다. 다시 시도해주세요',
        }
      },
      es: {
        site: { name: 'BooksHub', description: 'Asistente de escritura de novelas con IA' },
        nav: { write: 'Escribir', history: 'Historial', settings: 'Ajustes' },
        write: {
          title: 'Generador de Novelas con IA',
          summary: 'Resumen anterior (Opcional)',
          summaryPlaceholder: 'Lo que sucedió antes...',
          background: 'Fondo / Personajes (Opcional)',
          backgroundPlaceholder: 'Relaciones de personajes, configuración del mundo...',
          plot: 'Trama (Requerido)',
          plotPlaceholder: 'Lo que sucede en este capítulo...',
          requirements: 'Requisitos (Opcional)',
          requirementsPlaceholder: 'Estilo de escritura, tono, recuento de palabras...',
          mode: 'Modo de escritura',
          modeNormal: 'Normal',
          modeCreative: 'Creativo',
          modeDetailed: 'Detallado',
          length: 'Longitud',
          lengthShort: 'Corto',
          lengthMedium: 'Medio',
          lengthLong: 'Largo',
          generate: 'Generar',
          generating: 'Generando...',
          output: 'Salida',
          copy: 'Copiar',
          download: 'Descargar',
          polish: 'Pulir',
          continue: 'Continuar',
          empty: 'El contenido generado aparecerá aquí',
          history: 'Historial',
          clear: 'Limpiar',
        },
        errors: {
          plotRequired: 'Por favor ingresa la trama',
          generateFailed: 'Error al generar. Inténtalo de nuevo',
        }
      }
    };
    return messages[locale] || messages[defaultLocale];
  } catch {
    return {};
  }
}
