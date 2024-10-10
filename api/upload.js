import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    // Set the upload directory
    form.uploadDir = './uploads'; // This won't persist on Vercel, but for testing
    fs.mkdirSync(form.uploadDir, { recursive: true }); // Create uploads folder if it doesn't exist

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing the files:', err);
        return res.status(500).json({ error: 'Error parsing the files' });
      }

      const file = files.file; // Access the uploaded file
      const newFilePath = `${form.uploadDir}/${file.originalFilename}`;

      // Move the file to the new location
      fs.rename(file.filepath, newFilePath, (err) => {
        if (err) {
          console.error('Error moving the file:', err);
          return res.status(500).json({ error: 'Error moving file' });
        }

        // Respond with the file URL
        const fileUrl = `https://${req.headers.host}/api/uploads/${file.originalFilename}`;
        res.status(200).json({ url: fileUrl });
      });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
