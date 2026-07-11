#!/bin/bash
# Download all required images for Saffron & Steam cafe website
set -uo pipefail
BASE="/home/z/my-project/public/images"
LOG="/home/z/my-project/scripts/download-log.txt"

> "$LOG"

log() { echo "[$(date +%H:%M:%S)] $1" | tee -a "$LOG"; }

search_and_download() {
  local query="$1"
  local output_path="$2"
  local description="$3"
  local target_w="$4"
  local quality="${5:-82}"

  if [[ -f "$output_path" ]]; then
    log "SKIP (exists): $(basename "$output_path")"
    return 0
  fi

  log "SEARCH: $description"

  # z-ai outputs to stdout with init messages; capture and parse JSON
  z-ai image-search -q "$query" -c 3 --gl us --no-rank 2>/dev/null | python3 -c "
import sys, json
raw = sys.stdin.read()
start = raw.find('{')
if start >= 0:
    try:
        data = json.loads(raw[start:])
        results = data.get('results', [])
        if results:
            print(results[0]['original_url'])
            sys.exit(0)
    except:
        pass
print('')
" > /tmp/zai_url.txt 2>/dev/null || true

  local url
  url=$(cat /tmp/zai_url.txt)

  if [[ -z "$url" ]]; then
    log "FAIL: No results for: $description"
    return 1
  fi

  log "  -> $url"
  local tmpimg
  tmpimg=$(mktemp /tmp/img_XXXXXX)

  if ! curl -sL --max-time 30 -o "$tmpimg" "$url" 2>>"$LOG"; then
    log "FAIL: Download failed for $description"
    rm -f "$tmpimg"
    return 1
  fi

  # Check if image
  local ftype
  ftype=$(file -b --mime-type "$tmpimg" 2>/dev/null || echo "")
  if [[ ! "$ftype" =~ ^image/ ]]; then
    log "FAIL: Not an image ($ftype) for $description"
    rm -f "$tmpimg"
    return 1
  fi

  local fsize
  fsize=$(stat -c%s "$tmpimg" 2>/dev/null || echo "0")
  if [[ "$fsize" -lt 5000 ]]; then
    log "FAIL: Too small ($fsize bytes) for $description"
    rm -f "$tmpimg"
    return 1
  fi

  mkdir -p "$(dirname "$output_path")"

  # Try cwebp conversion, fallback to keeping original
  if command -v cwebp &>/dev/null; then
    if cwebp -q "$quality" -resize "$target_w" 0 "$tmpimg" -o "$output_path" 2>/dev/null; then
      rm -f "$tmpimg"
    elif cwebp -q "$quality" "$tmpimg" -o "$output_path" 2>/dev/null; then
      rm -f "$tmpimg"
    else
      # Save as whatever format it is
      local ext="${url##*.}"
      [[ "$ext" =~ ^[a-zA-Z0-9]+$ ]] || ext="jpg"
      mv "$tmpimg" "${output_path%.webp}.$ext"
      log "WARN: cwebp failed, saved as $ext"
      return 0
    fi
  else
    local ext="${url##*.}"
    [[ "$ext" =~ ^[a-zA-Z0-9]+$ ]] || ext="jpg"
    mv "$tmpimg" "${output_path%.webp}.$ext"
    log "WARN: No cwebp, saved as $ext"
    return 0
  fi

  local outsize
  outsize=$(stat -c%s "$output_path" 2>/dev/null || echo "0")
  log "OK: $(basename "$output_path") (${outsize} bytes)"
  return 0
}

# Remove old incorrect images first
rm -f "$BASE/interiors/"*.webp
rm -f "$BASE/about/about-team-placeholder.webp"
rm -f "$BASE/menu/saffron-pancakes.webp"
rm -f "$BASE/menu/french-toast.webp"

# ==================================================================
# HERO (3)
# ==================================================================
search_and_download \
  "warm cafe brunch table with coffee eggs pastries hands visible natural daylight editorial" \
  "$BASE/hero/cafe-hero-brunch-table.webp" "Hero: Brunch table" 2200 82

search_and_download \
  "close-up ceramic cappuccino cup with latte art warm light" \
  "$BASE/hero/hero-coffee-cup-detail.webp" "Hero: Coffee cup" 1200 82

search_and_download \
  "close-up flaky croissant pastry golden brown on plate" \
  "$BASE/hero/hero-pastry-close.webp" "Hero: Pastry close" 1200 82

# ==================================================================
# HOME (6)
# ==================================================================
search_and_download \
  "warm cafe interior wooden furniture natural light plants service counter neighbourhood" \
  "$BASE/home/home-interior-wide.webp" "Home: Wide interior" 2000 82

search_and_download \
  "quiet corner table window seat ceramics natural cafe detail warm" \
  "$BASE/home/home-story-detail.webp" "Home: Story detail" 1200 82

search_and_download \
  "barista pulling espresso tamping coffee pouring shot professional" \
  "$BASE/home/morning-barista.webp" "Home: Morning barista" 1600 82

search_and_download \
  "colorful brunch spread toast eggs pancakes bowls coffee wooden table" \
  "$BASE/home/midday-brunch.webp" "Home: Midday brunch" 1600 82

search_and_download \
  "candlelit cafe table small plates warm evening atmosphere intimate" \
  "$BASE/home/evening-table.webp" "Home: Evening table" 1600 82

search_and_download \
  "beautiful cafe interior full room wooden tables warm lighting design" \
  "$BASE/home/home-room-wide.webp" "Home: Room wide" 2200 80

# ==================================================================
# MENU (3)
# ==================================================================
search_and_download \
  "rich mocha coffee drink chocolate espresso warm tones in cup" \
  "$BASE/menu/sea-salt-mocha.webp" "Menu: Mocha" 1200 82

search_and_download \
  "pancake stack with honey berries cream golden warm" \
  "$BASE/menu/saffron-honey-pancakes.webp" "Menu: Pancakes" 1200 82

search_and_download \
  "thick brioche french toast berries pistachio garnish breakfast" \
  "$BASE/menu/rose-pistachio-french-toast.webp" "Menu: French toast" 1200 82

# ==================================================================
# ABOUT (5)
# ==================================================================
search_and_download \
  "warm design-led neighbourhood cafe interior cinematic wide" \
  "$BASE/about/about-hero-interior.webp" "About: Hero interior" 2200 82

search_and_download \
  "quiet cafe corner lived-in intimate feeling warm natural light" \
  "$BASE/about/about-cafe-story.webp" "About: Cafe story" 1600 82

search_and_download \
  "espresso machine cup being filled early morning barista" \
  "$BASE/about/morning-espresso.webp" "About: Morning espresso" 1200 82

search_and_download \
  "genuine brunch table people partially visible warm cafe" \
  "$BASE/about/afternoon-brunch.webp" "About: Afternoon brunch" 1600 82

search_and_download \
  "warm cafe evening candlelight small plates intimate atmosphere" \
  "$BASE/about/evening-candle-table.webp" "About: Evening candle" 1600 82

# ==================================================================
# GALLERY (18)
# ==================================================================
search_and_download \
  "barista actively preparing pouring espresso shot professional cafe" \
  "$BASE/gallery/barista-pouring-espresso.webp" "G: Barista" 1200 82

search_and_download \
  "detailed latte art close-up cappuccino heart pattern" \
  "$BASE/gallery/latte-art-detail.webp" "G: Latte art" 1200 82

search_and_download \
  "golden pancake plate honey berries breakfast editorial food" \
  "$BASE/gallery/saffron-pancakes-plate.webp" "G: Pancakes" 1400 82

search_and_download \
  "wide brunch table multiple plates food spread wooden cafe" \
  "$BASE/gallery/brunch-spread-table.webp" "G: Brunch spread" 1600 82

search_and_download \
  "avocado toast with visible avocado on sourdough bread" \
  "$BASE/gallery/avocado-toast-detail.webp" "G: Avocado toast" 1200 82

search_and_download \
  "warm full cafe interior wooden tables natural light plants" \
  "$BASE/gallery/warm-cafe-interior.webp" "G: Warm interior" 1600 82

search_and_download \
  "cafe window seat with sunlight streaming in cozy" \
  "$BASE/gallery/cafe-window-seat.webp" "G: Window seat" 1200 82

search_and_download \
  "coffee bar counter espresso machine ceramic cups" \
  "$BASE/gallery/coffee-bar-counter.webp" "G: Coffee counter" 1600 82

search_and_download \
  "two friends sharing coffee conversation at cafe table" \
  "$BASE/gallery/friends-at-table.webp" "G: Friends" 1400 82

search_and_download \
  "several people eating brunch together friends group cafe happy" \
  "$BASE/gallery/group-brunch.webp" "G: Group brunch" 1600 82

search_and_download \
  "close-up roasted coffee beans macro detail ceramic bowl" \
  "$BASE/gallery/coffee-beans-detail.webp" "G: Coffee beans" 1200 82

search_and_download \
  "pastry display case tray counter multiple pastries assorted" \
  "$BASE/gallery/pastry-display.webp" "G: Pastry display" 1200 82

search_and_download \
  "intimate candlelit cafe table warm evening light" \
  "$BASE/gallery/evening-candle-table.webp" "G: Evening candle" 1400 82

search_and_download \
  "warm evening cafe interior customers ambient lighting cozy" \
  "$BASE/gallery/evening-cafe-atmosphere.webp" "G: Evening atmosphere" 1600 82

search_and_download \
  "herbs growing in pots on cafe window sill green basil" \
  "$BASE/gallery/herb-garden-window.webp" "G: Herb garden" 1200 82

search_and_download \
  "genuine street-facing cafe exterior doorway windows plants outdoor seating" \
  "$BASE/gallery/cafe-exterior-street.webp" "G: Exterior" 1600 82

search_and_download \
  "eggs on toast with chilli butter herbs pickled onion brunch" \
  "$BASE/gallery/chilli-butter-eggs.webp" "G: Chilli eggs" 1200 82

search_and_download \
  "hands physically holding warm ceramic coffee cup close" \
  "$BASE/gallery/ceramic-cup-hands.webp" "G: Cup hands" 1200 82

# ==================================================================
# CONTACT (reuse gallery exterior)
# ==================================================================
mkdir -p "$BASE/contact"
if [[ -f "$BASE/gallery/cafe-exterior-street.webp" ]]; then
  cp "$BASE/gallery/cafe-exterior-street.webp" "$BASE/contact/cafe-exterior-hero.webp"
  log "COPY: gallery exterior -> contact hero"
fi

log "=== COMPLETE ==="
echo ""
echo "Summary:"
find "$BASE" -type f \( -name "*.webp" -o -name "*.jpg" -o -name "*.png" \) | sort | while read f; do
  sz=$(stat -c%s "$f" 2>/dev/null || echo "0")
  echo "  $f ($sz bytes)"
done