declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { ComponentType } from "react";

  export const meta: {
    date: string;
  };

  const MDXContent: ComponentType<MDXProps>;
  export default MDXContent;
}
