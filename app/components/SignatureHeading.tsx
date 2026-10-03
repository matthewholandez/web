"use client";

import Image from "next/image";
import { useState } from "react";

export function SignatureHeading() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <h1 className="signatureHeading" aria-label="Matthew Holandez">
      {imageFailed ? (
        <span>Matthew</span>
      ) : (
        <Image
          className="signatureHeading__image"
          src="/signature.png"
          alt="Matthew"
          width={2400}
          height={400}
          onError={() => setImageFailed(true)}
        />
      )}
    </h1>
  );
}
