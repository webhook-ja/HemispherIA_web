/**
 * Email Service for Hemispher-IA
 * Sends contact form notifications via Hostinger SMTP
 */

import nodemailer from 'nodemailer';

// SMTP Configuration for Hostinger
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: 'info@hemispher-ia.org',
    pass: '&UALOi7d'
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Send email notifications when contact form is submitted
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Contact name
 * @param {string} contactData.email - Contact email
 * @param {string} contactData.organization - Organization (optional)
 * @param {string} contactData.message - Message
 */
export async function sendContactEmails(contactData) {
  const { name, email, organization, message } = contactData;

  try {
    // Email to admin/team
    const adminEmail = {
      from: '"Hemispher-IA Website" <info@hemispher-ia.org>',
      to: 'info@hemispher-ia.org', // Change this to the admin email if different
      replyTo: email,
      subject: `[Hemispher-IA] Nuevo mensaje de contacto de ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border: 1px solid #e5e7eb;
              border-top: none;
            }
            .field {
              margin-bottom: 20px;
              background: white;
              padding: 15px;
              border-radius: 5px;
              border-left: 4px solid #3b82f6;
            }
            .field-label {
              font-weight: bold;
              color: #1e3a8a;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .field-value {
              color: #374151;
              font-size: 16px;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 5px;
              border-left: 4px solid #3b82f6;
              margin-top: 20px;
            }
            .footer {
              background: #1f2937;
              color: #9ca3af;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              border-radius: 0 0 10px 10px;
            }
            .cta-button {
              display: inline-block;
              background: #3b82f6;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📬 Nuevo Mensaje de Contacto</h1>
          </div>

          <div class="content">
            <div class="field">
              <div class="field-label">Nombre</div>
              <div class="field-value">${name}</div>
            </div>

            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
              </div>
            </div>

            ${organization ? `
            <div class="field">
              <div class="field-label">Organización</div>
              <div class="field-value">${organization}</div>
            </div>
            ` : ''}

            <div class="message-box">
              <div class="field-label">Mensaje</div>
              <div class="field-value" style="white-space: pre-wrap; margin-top: 10px;">
                ${message}
              </div>
            </div>

            <div style="text-align: center;">
              <a href="mailto:${email}" class="cta-button">
                Responder a ${name}
              </a>
            </div>
          </div>

          <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de Hemispher-IA</p>
            <p>🌐 <a href="https://hemispher-ia.org" style="color: #60a5fa; text-decoration: none;">hemispher-ia.org</a></p>
            <p style="margin-top: 15px; color: #6b7280;">
              Fecha: ${new Date().toLocaleString('es-ES', {
                dateStyle: 'full',
                timeStyle: 'short',
                timeZone: 'America/Panama'
              })}
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
Nuevo mensaje de contacto recibido

Nombre: ${name}
Email: ${email}
${organization ? `Organización: ${organization}` : ''}

Mensaje:
${message}

---
Enviado desde: https://hemispher-ia.org/contact
Fecha: ${new Date().toLocaleString('es-ES')}
      `
    };

    // Send to admin
    const adminInfo = await transporter.sendMail(adminEmail);
    console.log('✅ Email enviado al equipo:', adminInfo.messageId);

    // Auto-reply to the contact
    const autoReply = {
      from: '"Hemispher-IA" <info@hemispher-ia.org>',
      to: email,
      subject: 'Hemos recibido tu mensaje - Hemispher-IA',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border: 1px solid #e5e7eb;
              border-top: none;
            }
            .footer {
              background: #1f2937;
              color: #9ca3af;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              border-radius: 0 0 10px 10px;
            }
            .highlight {
              background: white;
              padding: 20px;
              border-radius: 5px;
              border-left: 4px solid #3b82f6;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✅ ¡Mensaje Recibido!</h1>
          </div>

          <div class="content">
            <p>Hola <strong>${name}</strong>,</p>

            <p>Gracias por contactarnos. Hemos recibido tu mensaje y nuestro equipo lo revisará pronto.</p>

            <div class="highlight">
              <p><strong>Tu mensaje:</strong></p>
              <p style="white-space: pre-wrap; color: #6b7280;">
${message}
              </p>
            </div>

            <p>Nos pondremos en contacto contigo a la brevedad posible en <strong>${email}</strong>.</p>

            <p>Mientras tanto, te invitamos a conocer más sobre nuestros proyectos en nuestra web:</p>
            <p style="text-align: center;">
              <a href="https://hemispher-ia.org" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Visitar Hemispher-IA
              </a>
            </p>
          </div>

          <div class="footer">
            <p><strong>Hemispher-IA</strong></p>
            <p>Conectando conocimiento, talento y tecnología</p>
            <p>🌐 <a href="https://hemispher-ia.org" style="color: #60a5fa; text-decoration: none;">hemispher-ia.org</a></p>
            <p>📧 <a href="mailto:info@hemispher-ia.org" style="color: #60a5fa; text-decoration: none;">info@hemispher-ia.org</a></p>
          </div>
        </body>
        </html>
      `,
      text: `
Hola ${name},

Gracias por contactarnos. Hemos recibido tu mensaje y nuestro equipo lo revisará pronto.

Tu mensaje:
${message}

Nos pondremos en contacto contigo a la brevedad posible en ${email}.

Saludos,
El equipo de Hemispher-IA

---
Hemispher-IA
Conectando conocimiento, talento y tecnología
🌐 hemispher-ia.org
📧 info@hemispher-ia.org
      `
    };

    // Send auto-reply
    const replyInfo = await transporter.sendMail(autoReply);
    console.log('✅ Auto-respuesta enviada a:', email, replyInfo.messageId);

    return {
      success: true,
      adminMessageId: adminInfo.messageId,
      autoReplyMessageId: replyInfo.messageId
    };

  } catch (error) {
    console.error('❌ Error enviando emails:', error);
    // Don't throw error to prevent contact form from failing
    // Just log it and continue
    return {
      success: false,
      error: error.message
    };
  }
}

// Test connection on module load
transporter.verify(function(error, success) {
  if (error) {
    console.error('❌ SMTP Connection Error:', error);
  } else {
    console.log('✅ SMTP Server ready to send emails');
  }
});

export default { sendContactEmails };
