import sitemap from '../sitemap';

describe('Sitemap', () => {
  let sitemapData: ReturnType<typeof sitemap>;

  beforeEach(() => {
    sitemapData = sitemap();
  });

  it('returns an array of sitemap entries', () => {
    expect(Array.isArray(sitemapData)).toBe(true);
    expect(sitemapData.length).toBeGreaterThan(0);
  });

  it('includes all expected pages', () => {
    const urls = sitemapData.map((entry) => entry.url);

    expect(urls).toContain('https://fourloop.digital');
    expect(urls).toContain('https://fourloop.digital/about');
    expect(urls).toContain('https://fourloop.digital/work');
    expect(urls).toContain('https://fourloop.digital/contact');
    expect(urls).toContain('https://fourloop.digital/faq');
  });

  it('includes exactly 5 sitemap entries', () => {
    expect(sitemapData).toHaveLength(5);
  });

  it('has proper structure for each sitemap entry', () => {
    sitemapData.forEach((entry) => {
      expect(entry).toHaveProperty('url');
      expect(entry).toHaveProperty('lastModified');
      expect(entry).toHaveProperty('changeFrequency');
      expect(entry).toHaveProperty('priority');

      expect(typeof entry.url).toBe('string');
      expect(entry.lastModified instanceof Date).toBe(true);
      expect(typeof entry.changeFrequency).toBe('string');
      expect(typeof entry.priority).toBe('number');
    });
  });

  it('has correct URLs for all pages', () => {
    const expectedUrls = [
      'https://fourloop.digital',
      'https://fourloop.digital/about',
      'https://fourloop.digital/work',
      'https://fourloop.digital/contact',
      'https://fourloop.digital/faq',
    ];

    const actualUrls = sitemapData.map((entry) => entry.url);
    expectedUrls.forEach((url) => {
      expect(actualUrls).toContain(url);
    });
  });

  it('has valid change frequencies', () => {
    const validFrequencies = [
      'always',
      'hourly',
      'daily',
      'weekly',
      'monthly',
      'yearly',
      'never',
    ];

    sitemapData.forEach((entry) => {
      expect(validFrequencies).toContain(entry.changeFrequency);
    });
  });

  it('has valid priority values', () => {
    sitemapData.forEach((entry) => {
      expect(entry.priority).toBeGreaterThanOrEqual(0);
      expect(entry.priority).toBeLessThanOrEqual(1);
    });
  });

  it('sets correct priorities for different page types', () => {
    const homeEntry = sitemapData.find(
      (entry) => entry.url === 'https://fourloop.digital'
    );
    const workEntry = sitemapData.find(
      (entry) => entry.url === 'https://fourloop.digital/work'
    );
    const aboutEntry = sitemapData.find(
      (entry) => entry.url === 'https://fourloop.digital/about'
    );
    const contactEntry = sitemapData.find(
      (entry) => entry.url === 'https://fourloop.digital/contact'
    );
    const faqEntry = sitemapData.find(
      (entry) => entry.url === 'https://fourloop.digital/faq'
    );

    expect(homeEntry?.priority).toBe(1); // Highest priority for home page
    expect(workEntry?.priority).toBe(0.9); // High priority for work showcase
    expect(aboutEntry?.priority).toBe(0.8); // Medium-high priority for about
    expect(contactEntry?.priority).toBe(0.7); // Medium priority for contact
    expect(faqEntry?.priority).toBe(0.6); // Lower priority for FAQ
  });

  it('sets appropriate change frequencies', () => {
    const homeEntry = sitemapData.find(
      (entry) => entry.url === 'https://fourloop.digital'
    );
    const workEntry = sitemapData.find(
      (entry) => entry.url === 'https://fourloop.digital/work'
    );
    const aboutEntry = sitemapData.find(
      (entry) => entry.url === 'https://fourloop.digital/about'
    );
    const contactEntry = sitemapData.find(
      (entry) => entry.url === 'https://fourloop.digital/contact'
    );
    const faqEntry = sitemapData.find(
      (entry) => entry.url === 'https://fourloop.digital/faq'
    );

    expect(homeEntry?.changeFrequency).toBe('monthly');
    expect(workEntry?.changeFrequency).toBe('weekly'); // Work portfolio updates more frequently
    expect(aboutEntry?.changeFrequency).toBe('monthly');
    expect(contactEntry?.changeFrequency).toBe('monthly');
    expect(faqEntry?.changeFrequency).toBe('monthly');
  });

  it('uses recent lastModified dates', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    sitemapData.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
      if (entry.lastModified instanceof Date) {
        expect(entry.lastModified.getTime()).toBeGreaterThan(
          oneHourAgo.getTime()
        );
        expect(entry.lastModified.getTime()).toBeLessThanOrEqual(now.getTime());
      }
    });
  });

  it('uses the correct base URL', () => {
    sitemapData.forEach((entry) => {
      expect(entry.url).toMatch(/^https:\/\/fourloop\.digital/);
    });
  });

  it('does not have duplicate URLs', () => {
    const urls = sitemapData.map((entry) => entry.url);
    const uniqueUrls = [...new Set(urls)];

    expect(urls).toHaveLength(uniqueUrls.length);
  });

  it('has well-formed URLs', () => {
    sitemapData.forEach((entry) => {
      expect(() => new URL(entry.url)).not.toThrow();
    });
  });

  it('generates consistent data across multiple calls', () => {
    const firstCall = sitemap();
    const secondCall = sitemap();

    expect(firstCall).toHaveLength(secondCall.length);

    firstCall.forEach((entry, index) => {
      expect(entry.url).toBe(secondCall[index].url);
      expect(entry.changeFrequency).toBe(secondCall[index].changeFrequency);
      expect(entry.priority).toBe(secondCall[index].priority);
    });
  });
});
