# datav3-monorepo

## 传统多仓库（Polyrepo）模式在管理多个关联项目时，容易导致以下痛点

* 依赖管理混乱：各仓库依赖版本不统一，升级困难，易引发“依赖地狱”。
* 代码复用成本高：共享代码需发布为独立包，流程繁琐，跨项目修改难同步。
* 协作效率低：跨仓库改动需多次提交/PR，代码审查和追溯复杂。
* 工具链重复：每个仓库单独配置构建、测试、CI/CD，维护成本高。
* 一致性难保障：代码规范、构建流程等难以统一，易出现技术债务。

## Monorepo 项目的优缺点

优点：

* 统一依赖管理：所有项目共享同 node_modules，依赖版本锁定。
* 原子级提交：跨项目修改可一次性提交，确保代码全局一致性。
* 高效代码共享：直接引用本地代码，无需发布包。
* 标准化工具链：统一构建、测试、部署流程，减少配置冗余。
* 简化协作：全量代码可见，便于跨团队协作和知识共享。

缺点：

* 仓库体积膨胀：历史记录和代码量庞大，影响克隆和操作速度。
* 权限管理复杂：需精细控制模块访问权限（如 Git 子目录权限）。
* 构建性能挑战：全量构建耗时，需依赖增量构建工具（如 Turborepo）。
* 学习曲线陡峭：需掌握特定工具链（Lerna、Nx 等）和最佳实践。
* 耦合风险：不当设计可能导致模块间隐性依赖，降低灵活性。

## 传统项目升级 Monorepo 的步骤与考虑因素

1. 评估与规划

* 可行性分析：确认项目间是否存在强关联性，是否值得迁移。
* 工具选型：根据场景选择工具：
  * 基础管理：Lerna + Yarn/NPM Workspaces
  * 高性能构建：Turborepo、Nx
  * 企业级：Google Bazel、Microsoft Rush
  * 代码拆分策略：按业务域或功能划分模块，明确边界。

2. 迁移准备

   * 依赖标准化：统一各项目依赖版本，解决冲突。
   * 代码结构调整：
     * 将原仓库作为子目录迁移（如 packages/project-a）。
     * 抽离共享代码到 shared/ 或 libs/ 目录。
   * 保留 Git 历史：使用 git filter-repo 工具迁移子目录历史。

3. 工具链适配

* 配置 Workspace：通过 package.json workspaces 定义模块。
* 增量构建优化：利用 Turborepo 缓存、任务管道加速 CI/CD。
* 权限控制：使用 Git 子模块或工具（如 Git Subtree）限制模块访问。

4. 渐进式迁移

   * 分阶段迁移：优先迁移高关联项目，逐步纳入其他模块。
   * 并行运行期：保留部分 Polyrepo 仓库，逐步过渡，降低风险。

5. 团队协作调整

* 规范制定：明确代码提交、依赖管理、版本发布规则。

* CI/CD 改造：优化流水线，仅构建受影响模块（如通过 git diff 检测变更）。

* 培训与文档：提供工具使用指南和 Monorepo 最佳实践。

## 关键注意事项

性能监控：关注仓库克隆、构建耗时，及时优化。
版本策略选择：
锁定版本：所有模块统一版本（适合强关联项目）。
独立版本：各模块独立发布（需工具支持，如 Changesets）。
避免过度耦合：模块间通过接口通信，减少直接依赖。
备份与回滚：确保迁移过程中可快速回退到旧架构。

## 环境准备

```bash
# 确保已安装：
# 1. Node.js 18+
# 2. pnpm 8+
npm install -g pnpm
```

基础目录

```bash
├── apps
│   ├── playground       # 演示项目
│   └── business         # 业务项目
├── packages
│   └── ui               # 组件库
│   └── utils            # 工具类
├── package.json
├── pnpm-workspace.yaml # 工作区域关联文件
└── turbo.json
```

配置工作区 `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

根目录 `package.json:`

```json
{
  "name": "code-monorepo",
  "version": "1.0.0",
  "description": "monorepo 工程搭建",
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "preview": "turbo preview",
    "lint": "turbo lint",
    "init": "turbo init",
    "playground": "pnpm -F playground run dev"
  },
  "workspaces": ["apps/*", "packages/*"],
  "packageManager": "pnpm@10.6.1",
  "devDependencies": {
    "conventional-changelog-cli": "^5.0.0",
    "turbo": "^2.4.4"
  }
}
```

根目录配置 `turbo.json` 重要重要重要

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "**/dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "preview": {
      "dependsOn": ["build"]
    }
  }
}
```

## 初始化项目结构

```bash
mkdir datav-monorepo && cd datav-monorepo
npm init -y

pnpm add -D turbo

```

## 组件项目配置 `packages/ul`

```bash
npm init -y
pnpm add vue@3
pnpm add -D vite @vitejs/plugin-vue typescript vite-plugin-dts

```

配置组件库的 `vite.config.ts`

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: "dist/types",
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "@dva3-ui",
      formats: ["es"],
      fileName: (format) => `[name].[format].js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].[format].js",
        chunkFileNames: "[name]-[hash].[format].js",
        manualChunks: undefined,
      },
    },
  },
});
```

配置完成后，根目录执行 `pnpm dev` 这个时候控制台应该可以看到组件的打包成功信息了

## 组件 `playground` 演示项目 `apps/playground`

```bash
cd apps
pnpm create vite@latest playground -- --template vue-ts

# 完成后添加组件库
pnpm add -D @dva3-ui
```

* 基本的配置到这里就结束了

## 以上过程需要注意的点

* `packages ui` 中添加`vue-shim.d.ts` 让`ts`识别`.vue`单文件组件

```ts
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

* `packages ui` 中`package.json` 配置`sideEffects:false`

声明所有模块无副作用，触发彻底 Tree Shaking

* `packages ui` 中`package.json` 配置`exports`、`publishConfig` 需要关注和了解

* `packages ui` 中`vite.config` 配置打包组件需要关注，怎么实现组件的按需加载和全量加载的实现
