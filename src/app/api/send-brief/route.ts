import { NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Validate required AWS credentials at startup
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  console.error(
    "Missing AWS credentials: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables must be set."
  );
}

const ses = new SESClient({
  region: process.env.AWS_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

interface BriefFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string[];
  description: string;
  goals: string;
  targetAudience: string;
  hasLogo: string;
  designStyle: string;
  competitors: string;
  inspirationSites: string;
  features: string[];
  otherFeatures: string;
  deadline: string;
  additionalInfo: string;
}

// Sanitize text for email headers (remove newlines and control characters)
function sanitizeForHeader(text: string): string {
  return text.replace(/[\r\n\t]/g, " ").trim();
}

// Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Validate AWS credentials are available
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error("AWS credentials not configured");
      return NextResponse.json(
        { error: "E-posttjänsten är inte konfigurerad. Kontakta oss direkt." },
        { status: 500 }
      );
    }

    const formData: BriefFormData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.description) {
      return NextResponse.json(
        { error: "Namn, e-post och projektbeskrivning är obligatoriska" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      return NextResponse.json(
        { error: "Ange en giltig e-postadress" },
        { status: 400 }
      );
    }

    // Sanitize inputs for email headers
    const safeName = sanitizeForHeader(formData.name);
    const safeCompany = sanitizeForHeader(formData.company || "Privat");

    // Escape HTML for confirmation email
    const htmlName = escapeHtml(formData.name);
    const htmlCompany = escapeHtml(formData.company || "Privat");
    const htmlProjectType = escapeHtml(formData.projectType?.join(", ") || "Ej angivet");
    const htmlDeadline = escapeHtml(formData.deadline || "Ej angivet");

    // Build email content
    const emailBody = `
PROJEKTFORMULÄR - PIXELPIONEER
============================

KONTAKTUPPGIFTER
----------------
Namn: ${formData.name}
Företag: ${formData.company || "-"}
E-post: ${formData.email}
Telefon: ${formData.phone || "-"}

OM PROJEKTET
------------
Projekttyp: ${formData.projectType?.join(", ") || "-"}
Beskrivning: ${formData.description}
Mål med hemsidan: ${formData.goals || "-"}
Målgrupp: ${formData.targetAudience || "-"}

DESIGN & INNEHÅLL
-----------------
Har logotyp: ${formData.hasLogo || "-"}
Önskad stil: ${formData.designStyle || "-"}
Konkurrenter/liknande: ${formData.competitors || "-"}
Inspirationssidor: ${formData.inspirationSites || "-"}

FUNKTIONER
----------
Önskade funktioner: ${formData.features?.join(", ") || "-"}
Övriga funktioner: ${formData.otherFeatures || "-"}

TIDPLAN
-------
Önskad deadline: ${formData.deadline || "-"}

ÖVRIGT
------
${formData.additionalInfo || "-"}

---
Skickat via pixelpioneer.se/brief
    `.trim();

    // Send internal notification email
    const internalCommand = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL || "hej@pixelpioneer.se",
      Destination: {
        ToAddresses: [process.env.SES_TO_EMAIL || "anton@pixelpioneer.se"],
      },
      Message: {
        Subject: {
          Data: `Projektförfrågan från ${safeName} - ${safeCompany}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: emailBody,
            Charset: "UTF-8",
          },
        },
      },
      ReplyToAddresses: [formData.email],
    });

    await ses.send(internalCommand);

    // Send confirmation email to customer
    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'VT323', 'Courier New', monospace;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <h1 style="font-family: 'Press Start 2P', 'Courier New', monospace; color: #32CD32; font-size: 20px; margin: 0; letter-spacing: 2px;">PIXELPIONEER</h1>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 40px; border: 1px solid #32CD32;">
              
              <!-- Greeting -->
              <h2 style="font-family: 'VT323', 'Courier New', monospace; color: #ffffff; font-size: 32px; margin: 0 0 20px 0;">
                Tack för din förfrågan, ${htmlName}!
              </h2>
              
              <p style="font-family: 'VT323', 'Courier New', monospace; color: #b0b0b0; font-size: 22px; line-height: 1.4; margin: 0 0 25px 0;">
                Jag har tagit emot din förfrågan och är taggad på att höra mer om ditt projekt!
              </p>
              
              <!-- Summary Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: rgba(50, 205, 50, 0.1); border-radius: 12px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="font-family: 'Press Start 2P', 'Courier New', monospace; color: #32CD32; font-size: 10px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px;">
                      Din förfrågan
                    </h3>
                    <p style="font-family: 'VT323', 'Courier New', monospace; color: #ffffff; font-size: 20px; margin: 0 0 8px 0;">
                      <strong>Projekttyp:</strong> ${htmlProjectType}
                    </p>
                    <p style="font-family: 'VT323', 'Courier New', monospace; color: #ffffff; font-size: 20px; margin: 0 0 8px 0;">
                      <strong>Önskad deadline:</strong> ${htmlDeadline}
                    </p>
                    <p style="font-family: 'VT323', 'Courier New', monospace; color: #ffffff; font-size: 20px; margin: 0;">
                      <strong>Företag:</strong> ${htmlCompany}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- What happens next -->
              <h3 style="font-family: 'Press Start 2P', 'Courier New', monospace; color: #32CD32; font-size: 12px; margin: 0 0 15px 0;">
                Vad händer nu?
              </h3>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 10px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: #32CD32; color: #0a0a0a; width: 28px; height: 28px; text-align: center; border-radius: 50%; font-weight: bold; font-size: 14px; vertical-align: middle;">1</td>
                        <td style="font-family: 'VT323', 'Courier New', monospace; padding-left: 15px; color: #b0b0b0; font-size: 20px;">Jag går igenom din förfrågan inom 48 timmar</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: #32CD32; color: #0a0a0a; width: 28px; height: 28px; text-align: center; border-radius: 50%; font-weight: bold; font-size: 14px; vertical-align: middle;">2</td>
                        <td style="font-family: 'VT323', 'Courier New', monospace; padding-left: 15px; color: #b0b0b0; font-size: 20px;">Jag hör av mig för ett första samtal</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: #32CD32; color: #0a0a0a; width: 28px; height: 28px; text-align: center; border-radius: 50%; font-weight: bold; font-size: 14px; vertical-align: middle;">3</td>
                        <td style="font-family: 'VT323', 'Courier New', monospace; padding-left: 15px; color: #b0b0b0; font-size: 20px;">Du får ett skräddarsytt förslag</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="font-family: 'VT323', 'Courier New', monospace; color: #b0b0b0; font-size: 18px; line-height: 1.4; margin: 25px 0 0 0; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.1);">
                Har du frågor under tiden? Svara direkt på detta mail eller kontakta mig på 
                <a href="mailto:hej@pixelpioneer.se" style="color: #32CD32; text-decoration: none;">hej@pixelpioneer.se</a>
              </p>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="text-align: center; padding-top: 30px;">
              <p style="font-family: 'VT323', 'Courier New', monospace; color: #666666; font-size: 18px; margin: 0;">
                © ${new Date().getFullYear()} PixelPioneer • Webbsidor som gör skillnad
              </p>
              <p style="font-family: 'VT323', 'Courier New', monospace; color: #666666; font-size: 16px; margin: 10px 0 0 0;">
                <a href="https://pixelpioneer.se" style="color: #32CD32; text-decoration: none;">pixelpioneer.se</a>
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const confirmationCommand = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL || "hej@pixelpioneer.se",
      Destination: {
        ToAddresses: [formData.email],
      },
      Message: {
        Subject: {
          Data: "Tack för din projektförfrågan! 🚀 - PixelPioneer",
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: confirmationHtml,
            Charset: "UTF-8",
          },
          Text: {
            Data: `Hej ${safeName}!\n\nTack för din projektförfrågan! Jag har tagit emot din förfrågan och är taggad på att höra mer om ditt projekt.\n\nVad händer nu?\n1. Jag går igenom din förfrågan inom 48 timmar\n2. Jag hör av mig för ett första samtal\n3. Du får ett skräddarsytt förslag\n\nHar du frågor? Svara på detta mail eller kontakta mig på hej@pixelpioneer.se\n\n--\nPixelPioneer\npixelpioneer.se`,
            Charset: "UTF-8",
          },
        },
      },
      ReplyToAddresses: [process.env.SES_FROM_EMAIL || "hej@pixelpioneer.se"],
    });

    await ses.send(confirmationCommand);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Kunde inte skicka e-post. Försök igen senare." },
      { status: 500 }
    );
  }
}
