import * as React from "react";
import { SVGProps } from "react";

const EZLogoWhite = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} {...props}>
    <rect width={98} height={98} x={1} y={1} fill="#f0f0f0" rx={10} />
    <path
      fill="none"
      stroke="#333"
      strokeLinecap="round"
      strokeWidth={5}
      d="M30 50a20 20 0 0 1 40 0"
    />
    <rect width={12} height={24} x={22} y={50} fill="#333" rx={6} />
    <rect width={12} height={24} x={66} y={50} fill="#333" rx={6} />
    <path stroke="#333" strokeWidth={3} d="M34 50v10M66 50v10" />
    <path fill="none" stroke="#333" strokeWidth={2} d="M70 72q8 8-10 14" />
    <circle cx={60} cy={86} r={3} fill="#333" />
  </svg>
);
export default EZLogoWhite;
