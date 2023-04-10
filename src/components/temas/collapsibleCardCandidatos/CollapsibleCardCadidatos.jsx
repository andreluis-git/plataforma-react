import React, { useRef, useState } from "react";
import Truncate from "../../../utils/TruncateString";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

const CollapsibleCardCandidatos = (props) => {
  const { candidato, tema } = props;
  const contentRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const montarEmail = () => {
    const emailBody = `Olá ${candidato.nome}, tudo bem? \nEste e-mail é referente a sua participação no desenvolvimento do trabalho "${tema.titulo}", gostaria de saber se ainda possui interesse?\n\nAtenciosamente.`;

    const sendEmail = `mailto:${candidato.email}?subject=${
      tema.titulo
    }&body=${encodeURIComponent(emailBody)}`;

    return sendEmail;
  };

  return (
    <div className="card mb-1" ref={contentRef}>
      <div className="p-3">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="font-weight-bold pb-2">{candidato.nome}</h6>
            <h6 className="mb-2 subtitle-primary">
              {candidato.cursoAluno.nome}
            </h6>
          </div>
          <div>
            {candidato.whatsapp && <WhatsAppIcon />}
            {candidato.linkedin && <LinkedInIcon />}
            {candidato.instagram && <InstagramIcon />}
            {candidato.facebook && <FacebookIcon />}
            {candidato.email && (
              <Link to={montarEmail} style={{ color: "var(--cor-fonteCinza)" }}>
                <EmailIcon />
              </Link>
            )}
          </div>
        </div>
        {candidato.sobre && (
          <>
            <hr className="separador" />
            {!isOpen && (
              <>
                <p className="card-text">{Truncate(candidato.sobre, 200)} </p>
                {candidato.sobre.length > 200 && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm mt-2"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    Mostrar mais
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <>
        {isOpen && candidato.sobre && (
          <div className="p-3 pt-0">
            <p className="card-text">{candidato.sobre} </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm mt-2"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Mostrar menos
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default CollapsibleCardCandidatos;
