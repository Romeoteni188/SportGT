#!/bin/bash

# Variables
USER_NAME="$USER"
HOME_DIR="/home/$USER_NAME"
PROJECT_DIR="$HOME_DIR/SportGT"
SERVICE_NAME="sportgt-dev"
PNPM_PATH="$HOME_DIR/.local/share/pnpm/pnpm"

# Verifica que el directorio del proyecto existe
if [ ! -d "$PROJECT_DIR" ]; then
  echo "❌ El directorio del proyecto no existe: $PROJECT_DIR"
  exit 1
fi

# Verifica que pnpm exista
if [ ! -x "$PNPM_PATH" ]; then
  echo "❌ No se encontró pnpm en: $PNPM_PATH"
  echo "Asegúrate de que esté instalado con: corepack enable && corepack prepare pnpm@latest --activate"
  exit 1
fi

# Crea el archivo de servicio
SERVICE_PATH="/etc/systemd/system/$SERVICE_NAME.service"
sudo bash -c "cat > $SERVICE_PATH" <<EOF
[Unit]
Description=Astro dev server for SportGT
After=network.target

[Service]
Type=simple
User=$USER_NAME
WorkingDirectory=$PROJECT_DIR
ExecStart=$PNPM_PATH dev
Restart=on-failure
Environment=PATH=$HOME_DIR/.local/share/pnpm:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

[Install]
WantedBy=default.target
EOF

# Recarga systemd y habilita el servicio
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME.service
sudo systemctl start $SERVICE_NAME.service

echo "✅ Servicio '$SERVICE_NAME' creado y activado para el proyecto SportGT."
