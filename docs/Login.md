# OIDC 登录实现技术文档

本文档详细说明了项目中 OIDC（OpenID Connect）登录功能的实现原理、技术选型、配置细节及文件结构，旨在帮助团队成员快速理解和上手。

## 1. 技术概览

### 1.1 核心库
我们选用了业界成熟的库来实现 OIDC 协议：
- **oidc-client-ts**: 底层核心库，负责处理 OIDC 协议的所有细节（PKCE、Token 管理、静默续期等）。
- **react-oidc-context**: 基于 `oidc-client-ts` 的 React 封装，提供了 `<AuthProvider>` 组件和 `useAuth` Hook，简化了在 React 中的集成。

### 1.2 认证流程 (Authorization Code Flow with PKCE)
本项目采用了最安全的 **Authorization Code Flow with PKCE (Proof Key for Code Exchange)** 模式，无需在前端暴露 Client Secret。

1.  **发起登录**：用户点击登录 -> 应用生成 PKCE 校验码 -> 重定向至 Keycloak 认证中心。
2.  **用户认证**：用户在 Keycloak 完成身份验证（输入账号密码）。
3.  **授权回调**：Keycloak 重定向回应用首页 (`/`)，附带 `code` 和 `state` 参数。
4.  **换取 Token**：应用后端（由 `oidc-client-ts` 自动处理）使用 `code` 和 PKCE 校验码向 Keycloak 换取 `access_token`、`id_token` 和 `refresh_token`。
5.  **Token 存储**：Token 被自动存储在 `localStorage` 中，支持页面刷新保持登录态。
6.  **自动续期**：通过 `refresh_token` 或 iframe 方式（Silent Renew）自动刷新即将过期的 Token。

## 2. 关键配置参数

所有 OIDC 配置集中在 `src/auth/oidc.ts` 文件中。

| 参数名 | 配置值 | 说明 |
| :--- | :--- | :--- |
| **Authority** | `https://iam.validator.dev.pythagoras.obsidian.systems/cloak/realms/canton-validator-1` | 认证中心地址 (Keycloak Realm URL) |
| **Client ID** | `alldefi-portal-ui` | 客户端标识符，在 Keycloak 中注册的应用 ID |
| **Redirect URI** | `window.location.origin` | 登录成功后的回调地址。本地开发时为 `http://localhost:9000`，生产环境为 `https://canton-wallet-test.pages.dev`。**注意：末尾不带斜杠**。 |
| **Response Type** | `code` | 指定使用授权码模式 |
| **Scope** | `openid offline_access` | `openid`: 获取 ID Token；`offline_access`: 获取 Refresh Token 以支持离线/续期访问 |
| **Extra Query Params** | `audience: 'https://canton.network.global'` | 额外参数，用于指定 Token 的受众 |

## 3. 实现细节

### 3.1 目录结构
```text
src/
├── auth/
│   ├── oidc.ts             # OIDC 核心配置文件
│   └── AuthProvider.tsx    # OIDC Provider 包装组件
├── hooks/
│   └── useAccessToken.ts   # 业务 Hook，便捷获取 Access Token
├── layout/
│   └── Layout.tsx          # 全局布局，包含登录/登出按钮逻辑
├── pages/
│   ├── LoginPage.tsx       # 登录引导页
│   └── Home.tsx            # 首页，兼任 OIDC 回调处理页
├── utils/
│   └── http.ts             # HTTP 请求封装，自动注入 Token
└── App.tsx                 # 应用入口，挂载 AuthProvider
```

### 3.2 登录与回调逻辑
我们采用了 **"首页即回调"** 的策略，简化了路由结构。

-   **发起登录** (`src/pages/LoginPage.tsx`):
    ```typescript
    auth.signinRedirect({
      prompt: 'login', // 强制显示登录页
      state: { redirectTo: '/api-test' }, // 登录成功后跳转的目标页面
    })
    ```

-   **处理回调** (`src/pages/Home.tsx`):
    首页组件在加载时会自动检测 URL 中是否包含 OIDC 回调参数。
    ```typescript
    useEffect(() => {
      if (!auth.isLoading && auth.isAuthenticated) {
        // 1. 读取 state 中的重定向目标
        const redirectTo = (auth.user?.state as any)?.redirectTo || '/api-test'
        // 2. 清理 URL 中的 code/state 参数
        window.history.replaceState({}, document.title, window.location.pathname)
        // 3. 跳转到目标页面
        navigate(redirectTo, { replace: true })
      }
    }, ...)
    ```

### 3.3 Token 自动注入
在 `src/utils/http.ts` 中，我们改造了 Token 获取逻辑，优先从 OIDC 存储中读取。

```typescript
// 自动从 localStorage 中查找 oidc-client-ts 存储的 User 对象
const oidcStorage = localStorage.getItem(
  'oidc.user:<Authority>:<Client ID>'
)
// 解析并返回 access_token
```

这意味着所有使用封装好的 `get/post` 方法发起的请求，都会自动携带当前的 OIDC Access Token。

### 3.4 路由守卫
-   **未登录拦截**：在 `src/pages/Home.tsx` 中，如果检测到未登录且非回调状态，会自动跳转至 `/login` 页面。
-   **已登录拦截**：在 `src/pages/LoginPage.tsx` 中，如果检测到已登录，会自动跳转至 `/api-test` 页面。

## 4. 常见问题与排查

### 4.1 "Invalid parameter: redirect_uri"
-   **原因**：前端配置的 `redirect_uri` 与 Keycloak 后台配置的 **Valid Redirect URIs** 不完全匹配。
-   **解决**：检查 `src/auth/oidc.ts` 中的 `redirect_uri` 配置。本项目配置为 `window.location.origin`（不带尾部斜杠）。请确保 Keycloak 后台也配置了对应的 `http://localhost:9000` 和生产域名。

### 4.2 登录后页面无限刷新 (Loop)
-   **原因**：回调处理逻辑判断错误，导致不断重复触发重定向。
-   **解决**：检查 `src/pages/Home.tsx` 中的 `useEffect` 逻辑，确保只在 `auth.isAuthenticated` 状态变化时触发跳转，并且正确清理了 URL 参数。

### 4.3 跨域错误 (CORS)
-   **原因**：Keycloak 未允许前端域名的跨域访问。
-   **解决**：联系 Keycloak 管理员，在 Client 配置的 **Web Origins** 中添加前端域名（或设置为 `+`）。

## 5. 开发指南

### 添加新的受保护页面
1.  在 `src/pages` 下创建组件。
2.  在 `src/router/index.tsx` 中添加路由。
3.  如果需要获取用户信息或 Token，使用 `useAuth()` 或 `useAccessToken()`。

```typescript
import { useAccessToken } from '@/hooks/useAccessToken'

const MyPage = () => {
  const token = useAccessToken()
  // ...
}
```

### 登出
调用 `auth.removeUser()` 即可清除本地 Session 并登出。

```typescript
const { removeUser } = useAuth()
// ...
<button onClick={() => removeUser()}>Log Out</button>
```
