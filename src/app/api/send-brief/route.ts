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
  deadline: string;
  designStyle: string;
  inspirationSites: string;
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
    const htmlDesignStyle = escapeHtml(formData.designStyle || "Ej angivet");

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
Önskad deadline: ${formData.deadline || "-"}

DESIGN
------
Önskad stil: ${formData.designStyle || "-"}
Inspirationssidor: ${formData.inspirationSites || "-"}

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
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="text-align: center; padding-bottom: 30px;">
              <h1 style="font-family: Arial, Helvetica, sans-serif; color: #1a1a2e; font-size: 24px; margin: 0; letter-spacing: 2px; font-weight: bold;">🚀 PIXELPIONEER</h1>
            </td>
          </tr>
          
          <!-- Main Card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 16px; padding: 40px; border: 2px solid #32CD32; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              
              <!-- Greeting -->
              <h2 style="font-family: Arial, Helvetica, sans-serif; color: #1a1a2e; font-size: 28px; margin: 0 0 20px 0; font-weight: bold;">
                Tack för din förfrågan, ${htmlName}!
              </h2>
              
              <p style="font-family: Arial, Helvetica, sans-serif; color: #333333; font-size: 18px; line-height: 1.6; margin: 0 0 25px 0;">
                Jag har tagit emot din förfrågan och är taggad på att höra mer om ditt projekt!
              </p>
              
              <!-- Summary Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f0fff0; border-radius: 12px; margin-bottom: 25px; border: 1px solid #32CD32;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="font-family: Arial, Helvetica, sans-serif; color: #1a1a2e; font-size: 14px; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
                      Din förfrågan
                    </h3>
                    <p style="font-family: Arial, Helvetica, sans-serif; color: #333333; font-size: 16px; margin: 0 0 8px 0;">
                      <strong>Projekttyp:</strong> ${htmlProjectType}
                    </p>
                    <p style="font-family: Arial, Helvetica, sans-serif; color: #333333; font-size: 16px; margin: 0 0 8px 0;">
                      <strong>Önskad stil:</strong> ${htmlDesignStyle}
                    </p>
                    <p style="font-family: Arial, Helvetica, sans-serif; color: #333333; font-size: 16px; margin: 0 0 8px 0;">
                      <strong>Önskad deadline:</strong> ${htmlDeadline}
                    </p>
                    <p style="font-family: Arial, Helvetica, sans-serif; color: #333333; font-size: 16px; margin: 0;">
                      <strong>Företag:</strong> ${htmlCompany}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- What happens next -->
              <h3 style="font-family: Arial, Helvetica, sans-serif; color: #1a1a2e; font-size: 18px; margin: 0 0 15px 0; font-weight: bold;">
                Vad händer nu?
              </h3>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 10px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: #32CD32; color: #ffffff; width: 28px; height: 28px; text-align: center; border-radius: 50%; font-weight: bold; font-size: 14px; vertical-align: middle;">1</td>
                        <td style="font-family: Arial, Helvetica, sans-serif; padding-left: 15px; color: #333333; font-size: 16px;">Jag går igenom din förfrågan inom 48 timmar</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: #32CD32; color: #ffffff; width: 28px; height: 28px; text-align: center; border-radius: 50%; font-weight: bold; font-size: 14px; vertical-align: middle;">2</td>
                        <td style="font-family: Arial, Helvetica, sans-serif; padding-left: 15px; color: #333333; font-size: 16px;">Jag hör av mig för ett första samtal</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background-color: #32CD32; color: #ffffff; width: 28px; height: 28px; text-align: center; border-radius: 50%; font-weight: bold; font-size: 14px; vertical-align: middle;">3</td>
                        <td style="font-family: Arial, Helvetica, sans-serif; padding-left: 15px; color: #333333; font-size: 16px;">Du får ett skräddarsytt förslag</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Think about section -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff5e6; border-radius: 12px; margin-top: 25px; border: 1px solid #ffa500;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="font-family: Arial, Helvetica, sans-serif; color: #1a1a2e; font-size: 16px; margin: 0 0 15px 0; font-weight: bold;">
                      💡 Fundera på inför vårt möte
                    </h3>
                    <p style="font-family: Arial, Helvetica, sans-serif; color: #333333; font-size: 15px; margin: 0 0 15px 0;">
                      För att jag ska kunna ge dig bästa möjliga förslag är det bra om du funderar på:
                    </p>
                    <ul style="font-family: Arial, Helvetica, sans-serif; color: #333333; font-size: 15px; margin: 0; padding-left: 20px; line-height: 1.8;">
                      <li><strong>Mål med hemsidan</strong> – Vad vill du att besökare ska göra?</li>
                      <li><strong>Din målgrupp</strong> – Vilka är dina kunder?</li>
                      <li><strong>Logotyp</strong> – Har du en befintlig logotyp eller behövs en ny?</li>
                      <li><strong>Konkurrenter</strong> – Vilka andra hemsidor i din bransch gillar du?</li>
                      <li><strong>Funktioner</strong> – T.ex. bokningssystem, kontaktformulär, bildgalleri</li>
                    </ul>
                    <p style="font-family: Arial, Helvetica, sans-serif; color: #666666; font-size: 14px; margin: 15px 0 0 0; font-style: italic;">
                      Du behöver inte ha alla svar – vi går igenom allt tillsammans!
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="font-family: Arial, Helvetica, sans-serif; color: #666666; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0; padding-top: 25px; border-top: 1px solid #e0e0e0;">
                Har du frågor under tiden? Svara direkt på detta mail eller kontakta mig på 
                <a href="mailto:hej@pixelpioneer.se" style="color: #32CD32; text-decoration: none; font-weight: bold;">hej@pixelpioneer.se</a>
              </p>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="text-align: center; padding-top: 30px;">
              <p style="font-family: Arial, Helvetica, sans-serif; color: #888888; font-size: 14px; margin: 0;">
                © ${new Date().getFullYear()} PixelPioneer • Webbsidor som gör skillnad
              </p>
              <p style="font-family: Arial, Helvetica, sans-serif; color: #888888; font-size: 14px; margin: 10px 0 0 0;">
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
            Data: `Hej ${safeName}!\n\nTack för din projektförfrågan! Jag har tagit emot din förfrågan och är taggad på att höra mer om ditt projekt.\n\nVad händer nu?\n1. Jag går igenom din förfrågan inom 48 timmar\n2. Jag hör av mig för ett första samtal\n3. Du får ett skräddarsytt förslag\n\n---\n\n💡 FUNDERA PÅ INFÖR VÅRT MÖTE\n\nFör att jag ska kunna ge dig bästa möjliga förslag är det bra om du funderar på:\n\n• Mål med hemsidan – Vad vill du att besökare ska göra?\n• Din målgrupp – Vilka är dina kunder?\n• Logotyp – Har du en befintlig logotyp eller behövs en ny?\n• Konkurrenter – Vilka andra hemsidor i din bransch gillar du?\n• Funktioner – T.ex. bokningssystem, kontaktformulär, bildgalleri\n\nDu behöver inte ha alla svar – vi går igenom allt tillsammans!\n\n---\n\nHar du frågor? Svara på detta mail eller kontakta mig på hej@pixelpioneer.se\n\n--\nPixelPioneer\npixelpioneer.se`,
            Charset: "UTF-8",
          },
        },
      },
      ReplyToAddresses: [process.env.SES_FROM_EMAIL || "hej@pixelpioneer.se"],
    });

    await ses.send(confirmationCommand);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Log detailed error for debugging
    console.error("Failed to send email:", {
      error,
      errorName: error instanceof Error ? error.name : "Unknown",
      errorMessage: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Handle specific AWS SES errors
    if (error instanceof Error) {
      const errorName = error.name;
      
      // Credential/auth errors
      if (errorName === "CredentialsProviderError" || errorName === "InvalidClientTokenId") {
        return NextResponse.json(
          { error: "E-posttjänsten är felkonfigurerad. Kontakta mig direkt på hej@pixelpioneer.se" },
          { status: 500 }
        );
      }
      
      // Email address not verified in SES
      if (errorName === "MessageRejected" && error.message.includes("not verified")) {
        return NextResponse.json(
          { error: "E-postadressen kunde inte verifieras. Kontrollera att du angett rätt adress." },
          { status: 400 }
        );
      }
      
      // Rate limiting
      if (errorName === "Throttling" || errorName === "TooManyRequestsException") {
        return NextResponse.json(
          { error: "För många förfrågningar. Vänta en stund och försök igen." },
          { status: 429 }
        );
      }
      
      // Network/timeout errors
      if (errorName === "TimeoutError" || errorName === "NetworkingError") {
        return NextResponse.json(
          { error: "Anslutningsfel. Kontrollera din internetanslutning och försök igen." },
          { status: 503 }
        );
      }
    }

    // Generic fallback
    return NextResponse.json(
      { error: "Kunde inte skicka e-post. Försök igen senare eller kontakta mig direkt på hej@pixelpioneer.se" },
      { status: 500 }
    );
  }
}
