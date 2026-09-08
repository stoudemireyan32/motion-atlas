# Contributing to Motion Atlas / 投稿指南

Motion Atlas welcomes remarkable interactive websites from anywhere in the world. Every accepted site becomes one Markdown file and is published automatically after review.

Motion Atlas 欢迎来自世界各地的优秀互动网站。每个收录案例对应一个 Markdown 文件，审核合并后会自动发布。

## Submit with a pull request

1. Fork this repository.
2. Copy `sites/TEMPLATE.md` into a new folder named `sites/NNN-your-site/index.md`.
3. Complete every field in English and Chinese.
4. Keep `status: "draft"` for review.
5. Run `npm run validate` and `npm run build`.
6. Open a pull request using the provided template.

## Requirements / 收录要求

- The original experience must be publicly accessible without payment.
- Describe the interaction itself, not marketing claims.
- Only list technologies that can be verified. Remove uncertain tags.
- Do not upload copyrighted screenshots. Motion Atlas generates its own abstract preview.
- No tracking links, referral links, adult content or malicious downloads.
- Both English and Chinese descriptions are required.

## Categories

`3D World`, `Particles`, `Mouse`, `Scroll`, `Game`, `Generative`, `Sound`, `Experimental`

Pull requests are validated automatically. Once a maintainer changes the entry to `published` and merges it, GitHub Pages rebuilds the public index.
