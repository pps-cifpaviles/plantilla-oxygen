#!/usr/bin/env bash
# Despliega Oxygen en la VM del entorno y comprueba que responde.
# Uso (desde el pipeline):  deploy/deploy.sh <host>
# Necesita: ALUMNO, MONGODB_PASS, JWT_SECRET_KEY en el entorno.
set -euo pipefail

HOST=${1:?Uso: deploy.sh <host>}
: "${ALUMNO:?Falta la variable ALUMNO del repositorio}"
: "${MONGODB_PASS:?Falta el secreto MONGODB_PASS del entorno}"
: "${JWT_SECRET_KEY:?Falta el secreto JWT_SECRET_KEY del entorno}"

BASE=$((20000 + 10#$ALUMNO * 100))
export WEB_PORT=$((BASE + 10))
export API_PORT=$((BASE + 11))
export REACT_APP_API_ENDPOINT="http://${HOST}:${API_PORT}/api"
PROYECTO="a${ALUMNO}-oxygen"

cd "$(dirname "$0")"
docker compose -p "$PROYECTO" -f compose.yml up -d --build --remove-orphans

echo "Comprobando la aplicación…"
for _ in $(seq 1 30); do
  if curl -fs "http://localhost:${WEB_PORT}/" >/dev/null &&
     curl -fs "http://localhost:${API_PORT}/api/transportTypes/getAll" >/dev/null; then
    echo "OK · web http://${HOST}:${WEB_PORT} · api ${REACT_APP_API_ENDPOINT}"
    if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
      echo "Desplegado en http://${HOST}:${WEB_PORT} (API: ${REACT_APP_API_ENDPOINT})" >> "$GITHUB_STEP_SUMMARY"
    fi
    exit 0
  fi
  sleep 5
done

echo "La aplicación no responde. Últimos logs:" >&2
docker compose -p "$PROYECTO" -f compose.yml logs --tail 50 >&2
exit 1
