#!/bin/bash

output="favicons.txt"
echo "const favicons = [" > "$output"

for i in $(seq 1 18); do
  input="fav${i}.ico"

  if [ -f "$input" ]; then
    base64data=$(base64 -w 0 "$input")
    echo "  \"data:image/x-icon;base64,$base64data\"," >> "$output"
    echo "✅ $input を追加しました。"
  else
    echo "⚠️  $input が見つかりません。スキップします。"
  fi
done

echo "];" >> "$output"

echo "🎉 全てのfaviconを $output にまとめました。"

