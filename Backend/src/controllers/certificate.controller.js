import XLSX from "xlsx";
import Certificate from "../models/Certificate.js";
import { generateCertificatePDF } from "../utils/pdf.util.js";
const convertExcelDate = (excelDate) => {
  if (!excelDate) return null;

  // If already JS date
  if (excelDate instanceof Date) return excelDate;

  // If Excel serial number
  if (typeof excelDate === "number") {
    return new Date(Math.round((excelDate - 25569) * 86400 * 1000));
  }

  // If string
  return new Date(excelDate);
};


export const downloadCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({
        message: "Certificate not found"
      });
    }

    await generateCertificatePDF(certificate, res);


  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate certificate"
    });
  }
};


export const uploadCertificates = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Excel file required" });
    }

    // 1. Parse Excel
    const workbook = XLSX.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    if (sheetData.length === 0) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // 2. Validate & Transform
    const certificates = sheetData.map((row, index) => {
      if (
        !row.certificateId ||
        !row.studentName ||
        !row.domain ||
        !row.startDate ||
        !row.endDate
      ) {
        throw new Error(`Missing fields at row ${index + 2}`);
      }

      const startDate = convertExcelDate(row.startDate);
      const endDate = convertExcelDate(row.endDate);

      if (isNaN(startDate) || isNaN(endDate)) {
        throw new Error(`Invalid date format at row ${index + 2}`);
      }

      return {
        certificateId: String(row.certificateId).trim(),
        studentName: row.studentName,
        domain: row.domain,
        startDate: startDate,
        endDate: endDate
      };
    });

    // 3. Insert into MongoDB
    await Certificate.insertMany(certificates, { ordered: true });

    return res.status(201).json({
      message: "Certificates uploaded successfully",
      count: certificates.length
    });

  } catch (error) {
    // Duplicate certificateId error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate Certificate ID detected or Certificate already exists."
      });
    }

    if (error.message.includes("Missing fields") || error.message.includes("Invalid date")) {
      return res.status(400).json({
        message: error.message
      });
    }

    return res.status(500).json({
      message: error.message || "Upload failed"
    });
  }
};
export const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({
        valid: false,
        message: "Certificate not found"
      });
    }

    return res.status(200).json({
      valid: true,
      data: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        domain: certificate.domain,
        startDate: certificate.startDate,
        endDate: certificate.endDate
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Verification failed"
    });
  }
};

