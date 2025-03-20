import path from 'node:path';
import type { Config } from "tailwindcss";
// 用于获取 monorepo 项目中所有子包信息的工具
import { getPackagesSync } from '@manypkg/get-packages';

const { packages } = getPackagesSync(process.cwd());

const tailwindPackages: string[] = [];

// pnpm-workspace.yaml 中的 packages 里面所有的包
packages.forEach((pkg) => {
  tailwindPackages.push(pkg.dir);
});

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  content: [
    './index.html',
    ...tailwindPackages.map((item) =>
      path.join(item, 'src/**/*.{vue,js,ts,jsx,tsx,svelte,astro,html}'),
    ),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
    },
  },
  plugins: [],
};
export default config;