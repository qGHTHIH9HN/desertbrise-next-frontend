# DesertBrise Next.js Frontend

Modern frontend design layer for the existing DesertBrise PHP/MySQL CMS.

## Run locally

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Required backend

The PHP API endpoints from this kit must be copied into the existing PHP project:

```text
public/api/home.php
public/api/services.php
public/api/service.php
public/api/blog.php
public/api/post.php
```
