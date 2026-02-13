import fs from 'fs';
import { generateCertificatePDF } from './src/utils/pdf.util.js';

const mockRes = fs.createWriteStream('test_certificate.pdf');
mockRes.setHeader = () => { };

const mockCertificate = {
    certificateId: 'CERT123456789',
    studentName: 'Jane Smith',
    domain: 'Full Stack Development',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-06-30'),
};

console.log('Generating certificate...');
generateCertificatePDF(mockCertificate, mockRes).then(() => {
    console.log('Certificate generated: test_certificate.pdf');
}).catch(err => {
    console.error('Error generating certificate:', err);
});
