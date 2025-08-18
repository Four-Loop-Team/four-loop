interface SpamCheckData {
  email: string;
  message: string;
  userAgent: string;
  referer: string;
  origin: string;
  ip: string;
}

interface SpamCheckResult {
  isSpam: boolean;
  reasons: string[];
  score: number; // 0-100, higher = more likely spam
}

// Common spam keywords and patterns
const SPAM_KEYWORDS = [
  'viagra',
  'cialis',
  'pharmacy',
  'casino',
  'lottery',
  'winner',
  'congratulations',
  'bitcoin',
  'cryptocurrency',
  'investment',
  'profit',
  'guaranteed',
  'income',
  'work from home',
  'make money',
  'free money',
  'click here',
  'limited time',
  'act now',
  'urgent',
  'immediate',
  'discount',
  'offer expires',
  'amazing deal',
  'seo service',
  'backlink',
  'increase traffic',
  'website promotion',
  'loan approval',
  'credit score',
  'debt relief',
  'financial freedom',
];

const SUSPICIOUS_DOMAINS = [
  'tempmail',
  '10minutemail',
  'guerrillamail',
  'mailinator',
  'throwawaymails',
];

export function detectSpam(data: SpamCheckData): SpamCheckResult {
  const reasons: string[] = [];
  let score = 0;

  // Check for spam keywords in message and subject
  // Check message content for spam patterns
  const textContent = data.message.toLowerCase();
  const foundKeywords = SPAM_KEYWORDS.filter((keyword) =>
    textContent.includes(keyword.toLowerCase())
  );

  if (foundKeywords.length > 0) {
    score += foundKeywords.length * 15;
    reasons.push(`Contains spam keywords: ${foundKeywords.join(', ')}`);
  }

  // Check for excessive links
  const linkCount = (data.message.match(/https?:\/\/|www\./g) || []).length;
  if (linkCount > 3) {
    score += linkCount * 10;
    reasons.push(`Too many links: ${linkCount}`);
  }

  // Check for suspicious email domains
  const emailDomain = data.email.split('@')[1]?.toLowerCase();
  if (
    emailDomain &&
    SUSPICIOUS_DOMAINS.some((domain) => emailDomain.includes(domain))
  ) {
    score += 30;
    reasons.push(`Suspicious email domain: ${emailDomain}`);
  }

  // Check for repeated characters (common in spam)
  if (/(.)\1{4,}/.test(data.message)) {
    score += 20;
    reasons.push('Contains repeated characters');
  }

  // Check for all caps (aggressive content)
  const capsRatio =
    (data.message.match(/[A-Z]/g) || []).length / data.message.length;
  if (capsRatio > 0.5 && data.message.length > 20) {
    score += 25;
    reasons.push('Excessive uppercase text');
  }

  // Check message length extremes
  if (data.message.length < 10) {
    score += 15;
    reasons.push('Message too short');
  } else if (data.message.length > 2000) {
    score += 10;
    reasons.push('Message extremely long');
  }

  // Check for missing or suspicious user agent
  if (!data.userAgent || data.userAgent.length < 10) {
    score += 15;
    reasons.push('Missing or suspicious user agent');
  }

  // Check for bot-like user agents
  if (isBotUserAgent(data.userAgent)) {
    score += 25;
    reasons.push('Bot-like user agent');
  }

  // Check referer
  if (data.referer && !data.referer.includes('fourloopdigital.com')) {
    score += 10;
    reasons.push('External referer');
  }

  // Check for form field stuffing (common in automated submissions)
  if (isFormStuffed(data)) {
    score += 30;
    reasons.push('Form field stuffing detected');
  }

  return {
    isSpam: score >= 50, // Threshold for spam detection
    reasons,
    score,
  };
}

function _containsExcessiveLinks(text: string): boolean {
  const linkPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  const links = text.match(linkPattern) || [];
  return links.length > 3; // More than 3 links is suspicious
}

function isBotUserAgent(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /python/i,
    /curl/i,
    /wget/i,
    /java/i,
    /postman/i,
    /insomnia/i,
    /httpie/i,
  ];

  return botPatterns.some((pattern) => pattern.test(userAgent));
}

function isFormStuffed(data: SpamCheckData): boolean {
  // Since we only have email and message now, we can't detect form stuffing
  // Return false for now, or we could check if email and message are identical
  return data.email.toLowerCase().trim() === data.message.toLowerCase().trim();
}

// Additional utility for checking if IP is from a known bad range
export function isIPSuspicious(ip: string): boolean {
  // This is a simplified version - in production, use a proper IP reputation service
  const suspiciousRanges = [
    '127.0.0.1', // Localhost (shouldn't reach production)
    '::1', // IPv6 localhost
  ];

  return suspiciousRanges.includes(ip) || ip === 'unknown';
}
