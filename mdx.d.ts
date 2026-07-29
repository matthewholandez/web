declare module "*.md" {
  import type { MDXProps } from "mdx/types";
  import type { ComponentType } from "react";

  const MDXContent: ComponentType<MDXProps>;
  export default MDXContent;
}

declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { ComponentType } from "react";

  const MDXContent: ComponentType<MDXProps>;
  export default MDXContent;
}
