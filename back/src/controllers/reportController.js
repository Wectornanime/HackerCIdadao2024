const Report = require('../models/Report');
const validator = require('validator');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('image');

exports.createReport = (req, res) => {
  console.log(req.body);
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading image' });
    }

    try {
      const { name, message, longitude, latitude, } = req.body;

      // validação dos dados
      if (!name) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // criar um report novo
      const report = new Report({
        name,
        message,
        longitude,
        latitude,
        imageUrl: req.file ? req.file.path : null,
      });
      await report.save();

      res.status(201).json({ message: 'Ocorrencia registrada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Um erro foi encontrado ao registrar a ocorrencia' });
      console.log(error);
    }
  });
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().select('-__v'); // Excluir o campo __v do resultado

    // Mapear cada relatório para adicionar a URL completa da imagem, se existir
    const reportsWithImageUrls = reports.map(report => {
      return {
        _id: report._id,
        name: report.name,
        message: report.message,
        email: report.email,
        longitude: report.longitude,
        latitude: report.latitude,
        status: report.status,
        imageUrl: report.imageUrl ? `${req.protocol}://${req.get('host')}/${report.imageUrl}` : null,
        createdAt: report.createdAt,
      };
    });

    res.status(200).json(reportsWithImageUrls);
  } catch (error) {
    res.status(500).json({ error: 'Um erro ocorreu ao buscar os relatórios' });
    console.log(error);
  }
};

exports.updateReport = async (req, res) => {
  const { id } = req.params;
  const { name, message, email, longitude, latitude, status } = req.body;

  // Validação dos dados
  if (!name || !email) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Formato de email inválido' });
  }

  try {
    const report = await Report.findByIdAndUpdate(
      id,
      { name, message, email, longitude, latitude, status },
      { new: true } // Retornar o documento atualizado
    );

    if (!report) {
      return res.status(404).json({ error: 'Relatório não encontrado' });
    }

    res.status(200).json({ message: 'Relatório atualizado com sucesso', report });
  } catch (error) {
    res.status(500).json({ error: 'Um erro ocorreu ao atualizar o relatório' });
    console.log(error);
  }
};

exports.deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ error: 'Relatório não encontrado' });
    }

    res.status(200).json({ message: 'Relatório deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Um erro ocorreu ao deletar o relatório' });
    console.log(error);
  }
};
