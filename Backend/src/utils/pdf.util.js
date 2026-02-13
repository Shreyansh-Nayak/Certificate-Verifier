import PDFDocument from "pdfkit";
import { generateQRCode } from "./qr.util.js";

export const generateCertificatePDF = async (certificate, res) => {
  // Create a document in Landscape mode
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
    margin: 0 // We'll manage margins manually for borders
  });

  // Pipe the PDF into the response
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${certificate.certificateId}.pdf`
  );

  doc.pipe(res);

  // --- Colors & Fonts ---
  const PRIMARY_COLOR = "#1a237e"; // Deep Blue
  const SECONDARY_COLOR = "#424242"; // Dark Grey
  const BORDER_COLOR = "#DAA520"; // Golden Rod

  // Standard PDF Fonts: Helvetica, Times-Roman, Courier
  const FONT_REGULAR = "Helvetica";
  const FONT_BOLD = "Helvetica-Bold";
  const FONT_SERIF = "Times-Roman";
  const FONT_SERIF_BOLD = "Times-Bold";


  // --- Helper to Center Text ---
  // A4 Landscape width is ~841.89 points
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // --- 1. Ornamental Border ---
  const borderPadding = 20;
  const borderThickness = 3;

  // Outer Border (Gold)
  doc
    .rect(borderPadding, borderPadding, pageWidth - (borderPadding * 2), pageHeight - (borderPadding * 2))
    .lineWidth(borderThickness)
    .stroke(BORDER_COLOR);

  // Inner Border (Thin Line)
  const innerPadding = borderPadding + 5;
  doc
    .rect(innerPadding, innerPadding, pageWidth - (innerPadding * 2), pageHeight - (innerPadding * 2))
    .lineWidth(1)
    .stroke(PRIMARY_COLOR);

  // --- 2. Header Section ---
  doc.moveDown(3); // Add some top spacing inside the border

  // Main Title
  doc
    .font(FONT_SERIF_BOLD)
    .fontSize(36)
    .fillColor(PRIMARY_COLOR)
    .text("CERTIFICATE OF INTERNSHIP", {
      align: "center",
      characterSpacing: 1
    });

  doc.moveDown(0.5);

  // Subtitle
  doc
    .font(FONT_REGULAR)
    .fontSize(14)
    .fillColor(SECONDARY_COLOR)
    .text("PROUDLY PRESENTED TO", {
      align: "center",
      characterSpacing: 2
    });

  doc.moveDown(1.5);

  // --- 3. Recipient Name ---
  doc
    .font(FONT_SERIF_BOLD) // Using Serif for a classy name look
    .fontSize(32)
    .fillColor("black")
    .text(certificate.studentName, {
      align: "center",
      underline: false // We will draw a line manually if needed, or leave it cleaner
    });

  // Draw a decorative line under the name
  const nameWidth = doc.widthOfString(certificate.studentName);
  const centerX = pageWidth / 2;
  doc
    .moveTo(centerX - (nameWidth / 2) - 20, doc.y)
    .lineTo(centerX + (nameWidth / 2) + 20, doc.y)
    .lineWidth(1)
    .stroke(BORDER_COLOR);

  doc.moveDown(1.5);

  // --- 4. Body / Description ---
  const bodyText = `For successfully completing the internship program in`;

  doc
    .font(FONT_REGULAR)
    .fontSize(14)
    .fillColor(SECONDARY_COLOR)
    .text(bodyText, {
      align: "center"
    });

  doc.moveDown(0.5);

  // Domain Name
  doc
    .font(FONT_BOLD)
    .fontSize(18)
    .fillColor(PRIMARY_COLOR)
    .text(certificate.domain, {
      align: "center"
    });

  doc.moveDown(1);

  // Duration
  const startDate = new Date(certificate.startDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  const endDate = new Date(certificate.endDate).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  doc
    .font(FONT_REGULAR)
    .fontSize(12)
    .fillColor(SECONDARY_COLOR)
    .text(`From  ${startDate}  to  ${endDate}`, {
      align: "center"
    });

  // --- 5. Footer Section (Signatures & QR) ---

  // Move to the bottom part of the page
  const footerY = pageHeight - 130;

  // Date of Issue (Left)
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  doc.fontSize(10).fillColor(SECONDARY_COLOR);

  // Left Side: Date & Certificate ID
  doc.text(`Date of Issue: ${today}`, 60, footerY);
  doc.moveDown(0.5);
  doc.text(`Certificate ID: ${certificate.certificateId}`, 60, doc.y);

  // Right Side: Signature
  doc.text("Authorized Signatory", pageWidth - 200, footerY + 20, {
    width: 140,
    align: "center"
  });

  // Signature Line
  doc
    .moveTo(pageWidth - 200, footerY + 15)
    .lineTo(pageWidth - 60, footerY + 15)
    .stroke(SECONDARY_COLOR);


  // --- 6. Verification QR Code (Center Bottom) ---
  // Generate QR Code
  // Note: Ensure the URL points to your actual deployed frontend or domain if possible
  // For local dev, localhost is fine.
  const verifyURL = `http://localhost:5173/verify?certificateId=${certificate.certificateId}`;

  try {
    const qrImage = await generateQRCode(verifyURL);

    // Position QR Code in the center bottom
    doc.image(qrImage, (pageWidth / 2) - 30, footerY - 10, {
      fit: [60, 60],
      align: "center"
    });

    doc.moveDown(5); // Just to ensure cursor moves past image
    doc
      .fontSize(8)
      .fillColor(SECONDARY_COLOR)
      .text("Scan to Verify", (pageWidth / 2) - 30, footerY + 55, {
        width: 60,
        align: "center"
      });

  } catch (error) {
    console.error("Error generating QR code for PDF:", error);
    doc
      .fontSize(8)
      .text("Verification Code Loading Error", { align: "center" });
  }

  // Finalize PDF
  doc.end();
};
