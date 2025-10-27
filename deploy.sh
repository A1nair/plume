#!/bin/bash

# Build and deploy script for GitHub Pages

echo "🔨 Building blog..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📝 Next steps:"
    echo "1. git add ."
    echo "2. git commit -m \"Update blog\""
    echo "3. git push"
    echo ""
    echo "Your blog will be live at:"
    echo "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/"
else
    echo "❌ Build failed!"
    exit 1
fi
