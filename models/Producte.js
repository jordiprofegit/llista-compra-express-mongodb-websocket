const mongoose = require('mongoose');

// Definir l'esquema del producte
const producteSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'El nom del producte és obligatori'],
    trim: true,
    minlength: [2, 'El nom ha de tenir com a mínim 2 caràcters'],
    maxlength: [100, 'El nom no pot tenir més de 100 caràcters']
  },
  quantitat: {
    type: Number,
    default: 1,
    min: [1, 'La quantitat ha de ser com a mínim 1']
  },
  unitat: {
    type: String,
    enum: ['unitats', 'kg', 'g', 'l', 'ml', 'paquet'],
    default: 'unitats'
  },
  categoria: {
    type: String,
    enum: ['fruites i verdures', 'carn i peix', 'làctics', 'begudes', 'asseo', 'altres'],
    default: 'altres'
  },
  comprat: {
    type: Boolean,
    default: false
  },
  dataCreacio: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Afegeix createdAt i updatedAt automàticament
});

// Mètode d'instància per marcar com comprat
producteSchema.methods.marcarComprat = function() {
  this.comprat = true;
  return this.save();
};

// Mètode estàtic per obtenir productes no comprats
producteSchema.statics.obtenirNoComprats = function() {
  return this.find({ comprat: false }).sort({ dataCreacio: -1 });
};

// Mètode estàtic per obtenir productes per categoria
producteSchema.statics.obtenirPerCategoria = function(categoria) {
  return this.find({ categoria, comprat: false });
};

// Crear el model a partir de l'esquema
const Producte = mongoose.model('Producte', producteSchema);

module.exports = Producte;