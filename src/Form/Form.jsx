import { useState } from "react";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./form.css";
import ptBR from "date-fns/locale/pt-BR";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Formulario = () => {
  const [showModal, setShowModal] = useState(false);
  const [listaPedidos, setListaPedidos] = useState([]);

  const schema = yup.object({
    startDate: yup.date().required("Campo obrigatório."),
    nomePO: yup.string().required("Campo obrigatório."),
    membros: yup.array().of(yup.string()).required("Campo obrigatório."),
    endDate: yup
      .date()
      .required("Campo obrigatório.")
      .min(
        yup.ref("startDate"),
        "A data de entrega deve ser após a data da solicitação."
      ),
    tecnologias: yup
      .array()
      .of(yup.string())
      .min(1, "Pelo menos uma tecnologia deve ser informada"),
    outraTec: yup.string().when("tecnologias", {
      is: (tecnologias) => tecnologias && tecnologias.includes("outraTecCheck"),
      then: yup
        .string()
        .required('Campo obrigatório caso "Outra" seja selecionado.'),
      otherwise: yup.string(),
      contextoUso: yup.string(),
      acessoUsuario: yup.string(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function inserirPedido(pedido) {
    setListaPedidos([...listaPedidos, pedido]);
  }


  /*
  async function enviarDados(dados) {
    const resposta = await fetch("http://localhost:3001/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });
    const resultado = await resposta.json();
    console.log(resultado);
  }*/

  return (
    <div className="container">
      <h1 className="title">
        Formulário de solicitação Adequação de Projeto ao Processo DevSecOps
      </h1>
      <br />
      <Form onSubmit={handleSubmit(inserirPedido)}>
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
            1. Data de solicitação (Hoje)
            <span className="caractere-especial">*</span>
          </h6>
          <div className="react-datepicker-wrapper">
            <DatePicker
              className="picker_bar"
              {...register("startDate")}
              name="dataSolic"
              id="dataSolic"
              type="date"
              locale={ptBR}
              dateFormat={"dd/MM/yyyy"}
              placeholderText="Insira a data (dd/MM/yyyy)"
            />
          </div>
          <span>{errors.dataSolic?.message}</span>
          <hr></hr>
          <br />
        </div>
        <div className="form_block col-md-6 col-sm-12">
          <h6>
            2. Nome Solicitante/PO (responsável pelo projeto)?
            <span className="caractere-especial">*</span>
          </h6>
          <div>
            <Form.Control
              type="text"
              {...register("nomePO")}
              name="nomePO"
              id="nomePO"
              placeholder="Insira sua resposta"
            />
          </div>
          <span>{errors.nomePO?.message}</span>
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
              {...register("membros")}
              name="membros"
              id="membros"
              rows={3}
              placeholder="Insira sua resposta"
            />
          </div>
          <span>{errors.membros?.message}</span>
        </div>
        <hr></hr>
        <br />
        <div className="form_block col-md-6 col-sm-12">
          <h6>
            4. Data de entrega da solicitação (necessária)
            <span className="caractere-especial">*</span>
          </h6>
          <div>
            <DatePicker
              className="picker_bar"
              {...register("endDate")}
              name="dataEntrega"
              id="dataEntrega"
              type="date"
              locale={ptBR}
              dateFormat={"dd/MM/yyyy"}
              placeholderText="Insira a data (dd/MM/yyyy)"
            />
          </div>
          <span>{errors.dataEntrega?.message}</span>
          <hr></hr>
          <br />
        </div>
        <div className="form_block col-md-6 col-sm-12">
          <h6>
            5. Quais Tecnologias são usadas no projeto?
            <span className="caractere-especial">*</span>
          </h6>

          <div>
            <Form.Check
              type="checkbox"
              id="storageAccount"
              label="Storage Account"
              value="Storage Account"
              {...register("tecnologias")}
            />
            <Form.Check
              type="checkbox"
              id="AppService(FunctionsApp)"
              label="App Service (Functions App)"
              value="App Service (Functions App)"
              {...register("tecnologias")}
            />
            <Form.Check
              type="checkbox"
              id="FunctionsApp"
              label="Functions App"
              value="Functions App"
              {...register("tecnologias")}
            />
            <Form.Check
              type="checkbox"
              id="WebAppWindows"
              label="App Service (WebApp for Windows)"
              value="WebApp Windows"
              {...register("tecnologias")}
            />
            <Form.Check
              type="checkbox"
              id="WebAppLinux"
              label="App Service (WebApp for Linux)"
              value="WebApp Linux"
              {...register("tecnologias")}
            />
            <Form.Check
              type="checkbox"
              id="VMs"
              label="Virtual Machines (VM's Linux e Windows)"
              value="VMs"
              {...register("tecnologias")}
            />
            <Form.Check
              type="checkbox"
              id="ServiceBus"
              label="Service Bus"
              value="Service Bus"
              {...register("tecnologias")}
            />
            <Form.Check
              type="checkbox"
              id="EventHub"
              label="Event Hub"
              value="EventHub"
              {...register("tecnologias")}
            />
            <Form.Check
              type="checkbox"
              id="BancoNaoRelacional"
              label="Banco de Dados Não Relacional (NoSQL - Cosmos, Elasticsearch, Redis, etc)"
              value="Banco Não Relacional"
              {...register("tecnologias")}
            />
            <Form.Check
              type="checkbox"
              id="BancoRelacional"
              label="Bancos de Dados Relacional - SQL"
              value="Banco Relacional"
              {...register("tecnologias")}
            />
            <div className="inputcheck">
              <Form.Check
                type="checkbox"
                id="outraTecCheck"
                value="outraTecCheck"
                {...register("tecnologias")}
              />
              <Form.Control
                type="text"
                placeholder="outraTecText"
                id="outraTecText"
                className="text-input-check"
                {...register("outraTec")}
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
              {...register("contextoUso")}
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
              {...register("acessoUsuario")}
              rows={3}
              placeholder="Insira sua resposta"
            />
          </div>
          <hr></hr>
          <br />
        </div>
        <button className="butSubmit" type="submit">
          Enviar
        </button>
      </Form>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obrigado por responder!</Modal.Title>
        </Modal.Header>
        <Modal.Body>O formulário foi enviado com sucesso!</Modal.Body>
      </Modal>
      <div>
        {listaPedidos.map((ped, i) => (
          <div key={i}>
            <p>dataSolic: {ped.dataSolic}</p>
            <p>nomePO: {ped.nomePO}</p>
            <p>membros: {ped.membros}</p>
            <p>dataEntrega: {ped.dataEntrega}</p>
            <p>tecnologias: {ped.tecnologias}</p>
            <p>outraTec: {ped.outraTec}</p>
            <p>contextoUso: {ped.contextoUso}</p>
            <p>acessoUsuario: {ped.acessoUsuario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Formulario;
