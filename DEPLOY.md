# GitHub Pages Deployment Guide / GitHub Pages 部署指南

[English](#english) | [中文](#中文)

---

## English

### Quick Deploy

1. **Push to GitHub:**
   ```bash
   cd /Users/alnair/web/simple-blog-release
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/docs**
   - Click **Save**

3. **Wait a few minutes**, then visit:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
   ```

### Update Your Blog

1. Add/edit markdown files in `posts/`
2. Run `npm run build`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update blog posts"
   git push
   ```

### Custom Domain (Optional)

1. Add a file named `CNAME` in the `docs/` folder with your domain:
   ```
   blog.example.com
   ```

2. Configure DNS at your domain provider:
   - Add a CNAME record pointing to `YOUR-USERNAME.github.io`

3. In GitHub Settings → Pages, enter your custom domain

---

## 中文

### 快速部署

1. **推送到 GitHub：**
   ```bash
   cd /Users/alnair/web/simple-blog-release
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

2. **启用 GitHub Pages：**
   - 在 GitHub 上打开你的仓库
   - 点击 **Settings**（设置）→ **Pages**
   - 在 "Source" 下选择：**Deploy from a branch**
   - Branch（分支）：**main**
   - Folder（文件夹）：**/docs**
   - 点击 **Save**（保存）

3. **等待几分钟**，然后访问：
   ```
   https://你的用户名.github.io/你的仓库名/
   ```

### 更新博客

1. 在 `posts/` 中添加/编辑 markdown 文件
2. 运行 `npm run build`
3. 提交并推送：
   ```bash
   git add .
   git commit -m "更新博客文章"
   git push
   ```

### 自定义域名（可选）

1. 在 `docs/` 文件夹中创建名为 `CNAME` 的文件，内容为你的域名：
   ```
   blog.example.com
   ```

2. 在域名提供商处配置 DNS：
   - 添加 CNAME 记录指向 `你的用户名.github.io`

3. 在 GitHub Settings → Pages 中输入自定义域名

---

## Important Notes / 重要说明

### English
- ✅ The `docs/` folder contains your built website
- ✅ Always run `npm run build` before committing changes
- ✅ GitHub Pages may take 1-5 minutes to update
- ✅ Your site will be public (unless you have GitHub Pro)

### 中文
- ✅ `docs/` 文件夹包含构建好的网站
- ✅ 提交更改前务必运行 `npm run build`
- ✅ GitHub Pages 可能需要 1-5 分钟更新
- ✅ 你的网站将是公开的（除非你有 GitHub Pro）

---

## Troubleshooting / 故障排除

### Site not loading?
1. Check that GitHub Pages is enabled in Settings → Pages
2. Verify the branch is `main` and folder is `/docs`
3. Wait a few more minutes
4. Check if `docs/index.html` exists

### 网站无法加载？
1. 检查 Settings → Pages 中是否已启用 GitHub Pages
2. 验证分支是 `main`，文件夹是 `/docs`
3. 再等待几分钟
4. 检查 `docs/index.html` 是否存在
