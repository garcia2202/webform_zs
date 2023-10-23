import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  dataSolic: {
    type: Date,
    required: true
  },
  nomePO: {
    type: String,
    required: true
  },
  membros: {
    type: String,
    required: true
  },
  dataEntrega: {
    type: Date,
    required: true
  },
  tecnologias: {
    type: Array,
    required: true
  },
  outraTec: {
    type: String,
    required: false
  },
  contextoUso: {
    type: String,
    required: false
  },
  acessoUsuario: {
    type: String,
    required: false
  },
});

export default mongoose.model('formModel', formSchema)