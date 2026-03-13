"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    FB?: {
      XFBML?: { parse?: (dom?: Element) => void };
    };
  }
}

export default function FacebookSdkLoginButton() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const parse = () => {
      if (!window.FB?.XFBML?.parse || !containerRef.current) return;
      window.FB.XFBML.parse(containerRef.current);
    };

    parse();
    window.addEventListener("fb-sdk-ready", parse);

    return () => {
      window.removeEventListener("fb-sdk-ready", parse);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div
        className="fb-login-button"
        data-scope="public_profile,email"
        data-onlogin="checkLoginState();"
        data-size="large"
        data-button-type="continue_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="true"
      />
    </div>
  );
}
