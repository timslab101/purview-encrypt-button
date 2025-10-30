import * as React from "react";
import type { FluentIconsProps } from "./FluentIconsProps.types";
import type { CreateFluentIconOptions } from "./createFluentIcon";
declare const wrapIcon: (Icon: (iconProps: FluentIconsProps) => React.ReactElement, displayName?: string | undefined, options?: CreateFluentIconOptions | undefined) => React.FC<FluentIconsProps<React.SVGAttributes<SVGElement>, SVGSVGElement>>;
export default wrapIcon;
