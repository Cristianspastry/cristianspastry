"use client"

import React, { useEffect } from 'react';


const TikTokEmbed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote
      className="tiktok-embed"
      cite="https://www.tiktok.com/@cristianspastry"
      data-unique-id="cristianspastry"
      data-embed-from="embed_page"
      data-embed-type="creator"
      style={{ maxWidth: '780px', minWidth: '288px' }}
    >
      <section>
        <a target="_blank" href="https://www.tiktok.com/@cristianspastry?refer=creator_embed">
          @cristianspastry
        </a>
      </section>
    </blockquote>
  );
};

export default TikTokEmbed;
