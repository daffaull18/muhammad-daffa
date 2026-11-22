#!/data/data/com.termux/files/usr/bin/bash
# =====================================================
# deploy.sh — deploy portofolio ke Netlify (1 perintah)
# Pakai:  ./deploy.sh
# =====================================================
set -e

# --- konfigurasi ---
TOKEN_FILE="/data/data/com.termux/files/usr/tmp/opencode/nl_token.txt"
SITE_ID="548e2036-1809-4770-9d55-3821898addd9"
SITE_URL="https://muhammad-daffa.netlify.app"
API="https://api.netlify.com/api/v1"
DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -f "$TOKEN_FILE" ]; then
    echo "❌ Token Netlify tidak ada di $TOKEN_FILE"
    echo "   Jalankan dulu: netlify login"
    exit 1
fi

TOKEN=$(cat "$TOKEN_FILE")

echo "📦 Membuat zip dari $DIR ..."
ZIP="/data/data/com.termux/files/usr/tmp/opencode/deploy-$(date +%s).zip"
python - "$DIR" "$ZIP" <<'PY'
import zipfile, os, sys
src, out = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(src):
        dirs[:] = [d for d in dirs if d != ".git"]
        for f in files:
            if f.endswith(".zip") or f == "deploy.sh":
                continue
            p = os.path.join(root, f)
            z.write(p, os.path.relpath(p, src))
print("   ukuran:", os.path.getsize(out), "byte")
PY

echo "🚀 Mengupload ke Netlify ..."
RESP=$(curl -s -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/zip" \
    --data-binary "@$ZIP" \
    "$API/sites/$SITE_ID/deploys")

STATE=$(printf '%s' "$RESP" | python -c "import sys,json;print(json.load(sys.stdin).get('state','?'))" 2>/dev/null || echo "?")
DEPLOY_ID=$(printf '%s' "$RESP" | python -c "import sys,json;print(json.load(sys.stdin).get('id','?'))" 2>/dev/null || echo "?")
ERR=$(printf '%s' "$RESP" | python -c "import sys,json;d=json.load(sys.stdin);print(d.get('error_message') or '')" 2>/dev/null || echo "")

rm -f "$ZIP"

if [ -n "$ERR" ]; then
    echo "❌ Gagal: $ERR"
    exit 1
fi

echo "   deploy id : $DEPLOY_ID"
echo "   state     : $STATE"

# tunggu sampai siap
for i in 1 2 3 4 5 6 7 8 9 10; do
    S=$(curl -s -H "Authorization: Bearer $TOKEN" \
        "$API/sites/$SITE_ID/deploys/$DEPLOY_ID" \
        | python -c "import sys,json;print(json.load(sys.stdin).get('state','?'))" 2>/dev/null || echo "?")
    echo "   menunggu  : $S"
    case "$S" in ready|current) break;; esac
    sleep 4
done

# pastikan proteksi akses & badge "Powered by Netlify" tetap mati
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    "$API/sites/$SITE_ID" -d '{"sso_login":false,"built_with_badge_enabled":false}' > /dev/null 2>&1

echo ""
echo "✅ SELESAI — situs live di:"
echo "   $SITE_URL"
echo ""
