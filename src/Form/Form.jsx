import { useState } from "react";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./form.css";
import ptBR from "date-fns/locale/pt-BR";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const Formulario = () => {
  const [dataSelecionadaSolic, setDataSelecionadaSolic] = useState(null);
  const [nomePO, setNomePO] = useState("");
  const [membros, setMembros] = useState("");
  const [dataSelecionadaEntrega, setDataSelecionadaEntrega] = useState(null);
  const [tecnologias, setTecnologias] = useState([]);
  const [outraTec, setOutraTec] = useState("");
  const [contextoUso, setContextoUso] = useState("");
  const [acessoUsuarios, setAcessoUsuarios] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const dataSolic = (data) => {
    setDataSelecionadaSolic(data);
  };

  const dataEntrega = (data) => {
    setDataSelecionadaEntrega(data);
  };

  const handleTecnologiasChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setTecnologias([...tecnologias, value]);
    } else {
      setTecnologias(tecnologias.filter((tec) => tec !== value));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!dataSelecionadaSolic) {
      errors.dataSelecionadaSolic = "Este campo é obrigatório.";
    }
    if (!nomePO.trim()) {
      errors.nomePO = "Este campo é obrigatório.";
    }
    if (!membros.trim()) {
      errors.membros = "Este campo é obrigatório.";
    }
    if (!dataSelecionadaEntrega) {
      errors.dataSelecionadaEntrega = "Este campo é obrigatório.";
    }

    if (tecnologias.length === 0 && !outraTec.trim()) {
      return false;
    }

    if (tecnologias.includes("Outra") && !outraTec.trim()) {
      return false;
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      const formData = {
        dataSelecionadaSolic,
        nomePO,
        membros,
        dataSelecionadaEntrega,
        tecnologias,
        outraTec,
        contextoUso,
        acessoUsuarios,
      };
      try {
        const response = await axios.post("http://localhost:5173/", formData);
        console.log("Resposta do servidor:", response.data);
        setShowModal(true);
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        Formulário de solicitação Adequação de Projeto ao Processo DevSecOps
      </h1>
      <br />
      <Form onSubmit={handleSubmit}>
        <div>
          <p>
            Oi! Você poderia preencher este formulário? Leva somente 4 minutos.
            Seria ótimo se você pudesse enviar sua resposta até ?? de ????? de
            ????. Obrigado!
          </p>
        </div>
        <br />
        <div className="form_block col-md-6 col-sm-12">
          <h6>
            1. Data de solicitação (Hoje){" "}
            <span className="caractere-especial">*</span>
          </h6>
          <div className="react-datepicker-wrapper">
            <DatePicker
              className="picker_bar"
              id="dataSolicitação"
              name="dataSolicitação"
              type="date"
              selected={dataSelecionadaSolic}
              onChange={dataSolic}
              locale={ptBR}
              dateFormat={"dd/MM/yyyy"}
              placeholderText="Insira a data (dd/MM/yyyy)"
              required
            />
          </div>
          <div className="error-message">
            {errors.dataSelecionadaSolic && (
              <span>{errors.dataSelecionadaSolic}</span>
            )}
          </div>
          <hr></hr>
          <br />
        </div>
        <div className="form_block col-md-6 col-sm-12">
          <h6>
            2. Nome Solicitante/PO (responsável pelo projeto)?{" "}
            <span className="caractere-especial">*</span>
          </h6>
          <div>
            <Form.Control
              type="text"
              id="nomePO"
              value={nomePO}
              onChange={(e) => setNomePO(e.target.value)}
              name="nomePO"
              placeholder="Insira sua resposta"
              required
            />
          </div>
          <div className="error-message">
            {errors.nomePO && <span>{errors.nomePO}</span>}
          </div>
          <hr></hr>
          <br />
        </div>
        <div className="form_block col-md-12">
          <h6>
            3. Quem são os membros do Time de projeto (Informar nome, papel no
            projeto e e-mail)? <span className="caractere-especial">*</span>
          </h6>
          <div>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Insira sua resposta"
              id="membros"
              value={membros}
              onChange={(e) => setMembros(e.target.value)}
              name="membros"
              required
            />
          </div>
          <div className="error-message">
            {errors.membros && <span>{errors.membros}</span>}
          </div>
        </div>
        <hr></hr>
        <br />
        <div className="form_block col-md-6 col-sm-12">
          <h6>
            4. Data de entrega da solicitação (necessária){" "}
            <span className="caractere-especial">*</span>
          </h6>
          <div>
            <DatePicker
              className="picker_bar"
              id="dataEntrega"
              name="dataEntrega"
              type="date"
              selected={dataSelecionadaEntrega}
              onChange={dataEntrega}
              locale={ptBR}
              dateFormat={"dd/MM/yyyy"}
              placeholderText="Insira a data (dd/MM/yyyy)"
              required
            />
          </div>
          <div className="error-message">
            {errors.dataSelecionadaEntrega && (
              <span>{errors.dataSelecionadaEntrega}</span>
            )}
          </div>
          <hr></hr>
          <br />
        </div>
        <div className="form_block col-md-6 col-sm-12">
          <h6>
            5. Quais Tecnologias são usadas no projeto?{" "}
            <span className="caractere-especial">*</span>
          </h6>

          <div>
            <Form.Check
              type="checkbox"
              id="storageAccount"
              label="Storage Account"
              value="Storage Account"
              onChange={handleTecnologiasChange}
            />
            <Form.Check
              type="checkbox"
              id="AppService(FunctionsApp)"
              label="App Service (Functions App)"
              value="App Service (Functions App)"
              onChange={handleTecnologiasChange}
            />
            <Form.Check
              type="checkbox"
              id="FunctionsApp"
              label="Functions App"
              value="Functions App"
              onChange={handleTecnologiasChange}
            />
            <Form.Check
              type="checkbox"
              id="WebAppWindows"
              label="App Service (WebApp for Windows)"
              value="WebApp Windows"
              onChange={handleTecnologiasChange}
            />
            <Form.Check
              type="checkbox"
              id="WebAppLinux"
              label="App Service (WebApp for Linux)"
              value="WebApp Linux"
              onChange={handleTecnologiasChange}
            />
            <Form.Check
              type="checkbox"
              id="VMs"
              label="Virtual Machines (VM's Linux e Windows)"
              value="VMs"
              onChange={handleTecnologiasChange}
            />
            <Form.Check
              type="checkbox"
              id="ServiceBus"
              label="Service Bus"
              value="Service Bus"
              onChange={handleTecnologiasChange}
            />
            <Form.Check
              type="checkbox"
              id="EventHub"
              label="Event Hub"
              value="EventHub"
              onChange={handleTecnologiasChange}
            />
            <Form.Check
              type="checkbox"
              id="BancoNaoRelacional"
              label="Banco de Dados Não Relacional (NoSQL - Cosmos, Elasticsearch, Redis, etc)"
              value="Banco Não Relacional"
              onChange={handleTecnologiasChange}
            />
            <Form.Check
              type="checkbox"
              id="BancoRelacional"
              label="Bancos de Dados Relacional - SQL"
              value="Banco Relacional"
              onChange={handleTecnologiasChange}
            />
            <div className="inputcheck">
              <Form.Check
                type="checkbox"
                id="Outra"
                value="Outra"
                onChange={(e) => {
                  if (e.target.checked) {
                    setTecnologias([...tecnologias, e.target.value]);
                  } else {
                    setTecnologias(
                      tecnologias.filter((tec) => tec !== e.target.value)
                    );
                  }
                }}
              />
              <Form.Control
                type="text"
                placeholder="Outra"
                id="OutraTec"
                value={outraTec}
                className="text-input-check"
                onChange={(e) => setOutraTec(e.target.value)}
              />
            </div>
          </div>
          <hr></hr>
          <br />
        </div>
        <div className="form_block col-md-12">
          <h6>
            6. Para App Service(opção 2-5 do formulário acima), descreva o
            contexto de uso da aplicação (Dependências Storage Account, BD, etc)
          </h6>
          <div>
            <Form.Control
              as="textarea"
              id="contextoUso"
              value={contextoUso}
              onChange={(e) => setContextoUso(e.target.value)}
              rows={3}
              placeholder="Insira sua resposta"
            />
          </div>
          <hr></hr>
          <br />
        </div>
        <div className="form_block col-md-12">
          <h6>
            7. Ainda sobre App Service, aplicação será acessado por usuário? Se
            sim, usuários internos e/ou externos?
          </h6>
          <div>
            <Form.Control
              as="textarea"
              id="acessoUsuario"
              value={acessoUsuarios}
              onChange={(e) => setAcessoUsuarios(e.target.value)}
              rows={3}
              placeholder="Insira sua resposta"
            />
          </div>
          <hr></hr>
          <br />
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="error-message alert alert-danger">
            Por favor, preencha todos os campos obrigatórios.
          </div>
        )}
        <button className="butSubmit" type="submit" onClick={handleSubmit}>
          Enviar
        </button>
      </Form>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obrigado por responder!</Modal.Title>
        </Modal.Header>
        <Modal.Body>O formulário foi enviado com sucesso!</Modal.Body>
      </Modal>
    </div>
  );
};

export default Formulario;
