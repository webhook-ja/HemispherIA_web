#!/bin/bash

# Script para verificar el estado del dominio hemispher-ia.org
# Ejecutar con: bash check_dominio_status.sh

echo "=========================================="
echo "Verificación de hemispher-ia.org"
echo "=========================================="
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

TARGET_IP="82.29.173.205"
DOMAIN="hemispher-ia.org"

# 1. Verificar DNS
echo "1. Verificando DNS..."
CURRENT_IP=$(nslookup $DOMAIN 2>/dev/null | grep -A1 "Name:" | grep "Address:" | tail -1 | awk '{print $2}')

if [ -z "$CURRENT_IP" ]; then
    CURRENT_IP=$(nslookup $DOMAIN 2>/dev/null | grep "Address:" | tail -1 | awk '{print $2}')
fi

echo "   IP actual: $CURRENT_IP"
echo "   IP destino: $TARGET_IP"

if [ "$CURRENT_IP" == "$TARGET_IP" ]; then
    echo -e "   ${GREEN}✅ DNS correcto - apunta a tu VPS${NC}"
    DNS_OK=true
else
    echo -e "   ${RED}❌ DNS incorrecto - todavía apunta a Hostinger${NC}"
    echo -e "   ${YELLOW}⏳ Espera más tiempo para propagación DNS${NC}"
    DNS_OK=false
fi
echo ""

# 2. Verificar servicio Docker en VPS
echo "2. Verificando servicio en VPS..."
SERVICE_STATUS=$(ssh -i "C:/Users/TRENDING PC/srv750816.key" -o StrictHostKeyChecking=no root@82.29.173.205 "docker service ps n8n_hemiph --format '{{.CurrentState}}'" 2>/dev/null | head -1)

if [[ $SERVICE_STATUS == *"Running"* ]]; then
    echo -e "   ${GREEN}✅ Servicio Docker corriendo${NC}"
    SERVICE_OK=true
else
    echo -e "   ${RED}❌ Servicio Docker no está corriendo${NC}"
    SERVICE_OK=false
fi
echo ""

# 3. Verificar acceso HTTP al sitio
echo "3. Verificando acceso HTTP..."
if [ "$DNS_OK" = true ]; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 https://$DOMAIN 2>/dev/null)

    if [ "$HTTP_CODE" == "200" ]; then
        echo -e "   ${GREEN}✅ Sitio accesible (HTTP $HTTP_CODE)${NC}"
        HTTP_OK=true
    else
        echo -e "   ${RED}❌ Sitio no accesible (HTTP $HTTP_CODE)${NC}"
        HTTP_OK=false
    fi
else
    echo -e "   ${YELLOW}⏭️  Saltando (DNS no apunta al VPS todavía)${NC}"
    HTTP_OK=false
fi
echo ""

# 4. Verificar certificado SSL
echo "4. Verificando SSL..."
if [ "$DNS_OK" = true ] && [ "$HTTP_OK" = true ]; then
    SSL_INFO=$(curl -vI --max-time 10 https://$DOMAIN 2>&1 | grep -i "SSL certificate verify")

    if [[ $SSL_INFO == *"ok"* ]] || [ -z "$SSL_INFO" ]; then
        echo -e "   ${GREEN}✅ Certificado SSL válido${NC}"
        SSL_OK=true
    else
        echo -e "   ${YELLOW}⚠️  Certificado SSL pendiente o inválido${NC}"
        SSL_OK=false
    fi
else
    echo -e "   ${YELLOW}⏭️  Saltando (sitio no accesible todavía)${NC}"
    SSL_OK=false
fi
echo ""

# Resumen final
echo "=========================================="
echo "RESUMEN"
echo "=========================================="

if [ "$DNS_OK" = true ] && [ "$SERVICE_OK" = true ] && [ "$HTTP_OK" = true ] && [ "$SSL_OK" = true ]; then
    echo -e "${GREEN}🎉 ¡Todo funcionando correctamente!${NC}"
    echo ""
    echo "Tu sitio está disponible en:"
    echo "🌐 https://hemispher-ia.org"
    echo ""
    echo "Próximos pasos:"
    echo "- Probar todas las páginas del sitio"
    echo "- Configurar Google Analytics (opcional)"
    echo "- Actualizar redes sociales con nueva URL"
elif [ "$DNS_OK" = false ]; then
    echo -e "${YELLOW}⏳ DNS todavía no propagó${NC}"
    echo ""
    echo "Qué hacer:"
    echo "1. Verifica que cambiaste los DNS en Hostinger a: $TARGET_IP"
    echo "2. Limpia tu cache DNS: ipconfig /flushdns"
    echo "3. Espera 15-30 minutos más y ejecuta este script nuevamente"
    echo ""
    echo "Verificar propagación en línea:"
    echo "https://dnschecker.org/#A/hemispher-ia.org"
elif [ "$SERVICE_OK" = false ]; then
    echo -e "${RED}⚠️  Servicio Docker no está corriendo${NC}"
    echo ""
    echo "Reiniciar servicio:"
    echo "ssh -i \"C:/Users/TRENDING PC/srv750816.key\" root@82.29.173.205 \"docker service update --force n8n_hemiph\""
elif [ "$HTTP_OK" = false ]; then
    echo -e "${YELLOW}⚠️  Sitio no accesible todavía${NC}"
    echo ""
    echo "Espera 5-10 minutos para que EasyPanel configure el dominio"
elif [ "$SSL_OK" = false ]; then
    echo -e "${YELLOW}⚠️  SSL pendiente de generación${NC}"
    echo ""
    echo "Espera 2-5 minutos para que Let's Encrypt genere el certificado"
    echo "Si tarda más de 10 minutos, regenera el certificado en EasyPanel"
fi

echo "=========================================="
echo ""
echo "Ejecuta este script nuevamente en 15 minutos:"
echo "bash check_dominio_status.sh"
echo ""
