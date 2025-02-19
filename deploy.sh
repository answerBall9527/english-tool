#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 构建
npm run build

# 进入构建输出目录
cd dist

# 删除旧的 git 仓库（如果存在）
rm -rf .git

# 初始化新的 git 仓库
git init
git add -A
git commit -m 'deploy'

# 替换下面的 USERNAME 和 REPO 为你的 GitHub 用户名和仓库名
git push -f git@github.com:answerBai1995/english-tool.git main:gh-pages

cd -