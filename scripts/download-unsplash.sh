#!/usr/bin/env bash
# Scarica le 16 foto Unsplash in public/images/unsplash-raw/
# Usa il CDN diretto Unsplash con quality 90 width 2400

set +e
OUT="public/images/unsplash-raw"
mkdir -p "$OUT"

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"

# Map: slug → photo ID
declare -A photos=(
  ["ristoranti-hero"]="1517248135467-4c7edcad34c4"
  ["ristoranti-card"]="1579926545913-448d525562db"
  ["hotel-hero"]="1625244724120-1fd1d34d00f6"
  ["hotel-card"]="1702814160779-4a88cfb330c7"
  ["hardware-hero"]="1556742521-9713bf272865"
  ["hardware-card"]="1778791830167-1f7f210b976a"
  ["my-self-order-hero"]="1600147131759-880e94a6185f"
  ["my-self-order-card"]="1556742205-e10c9486e506"
  ["chi-siamo-hero"]="1542744173-8e7e53415bb0"
  ["chi-siamo-card"]="1517048676732-d65bc937f952"
  ["prenota-demo-hero"]="1661754876215-247b4db12e83"
  ["prenota-demo-card"]="1606770347238-77fcfd29906c"
  ["contatti-hero"]="1666299884107-2c2cf920ee59"
  ["contatti-card"]="1553775282-20af80779df7"
  ["blog-hero"]="1676998930828-cabd06cb61c5"
  ["blog-card"]="1484788984921-03950022c9ef"
)

OK=0
ERR=0

for name in "${!photos[@]}"; do
  id="${photos[$name]}"
  url="https://images.unsplash.com/photo-${id}?w=2400&q=85&auto=format&fit=crop"
  out="$OUT/${name}.jpg"
  if curl -fsSL -A "$UA" --max-time 60 "$url" -o "$out" 2>/dev/null; then
    size=$(stat -c%s "$out" 2>/dev/null || stat -f%z "$out")
    printf "  ✓ %-26s %sKB\n" "$name" "$((size / 1024))"
    OK=$((OK + 1))
  else
    printf "  ✗ %-26s FAILED\n" "$name"
    ERR=$((ERR + 1))
  fi
done

echo ""
echo "═══ Download: $OK ok, $ERR err. Output: $OUT/ ═══"
