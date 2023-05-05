import React, { useRef, useState } from "react";
import Truncate from "../../../utils/TruncateString";

import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import "./CollapsibleCardCandidatos.css";

const CollapsibleCardCandidatos = (props) => {
  const { candidato, tema } = props;
  const contentRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const enviarEmail = () => {
    console.log("ENVIO EMAIL");
    const emailBody = `Olá ${candidato.nome}, tudo bem? \nEste e-mail é referente a sua participação no desenvolvimento do trabalho "${tema.titulo}", gostaria de saber se ainda possui interesse?\n\nAtenciosamente.`;

    const sendEmail = `mailto:${candidato.email}?subject=${
      tema.titulo
    }&body=${encodeURIComponent(emailBody)}`;

    window.open(sendEmail);
  };

  const enviarWhatsapp = () => {
    console.log(
      "ENVIO Whats ",
      `https://wa.me/55${candidato.whatsapp.replace(/[^\w]/g, "")}`
    );

    window.open(`https://wa.me/55${candidato.whatsapp.replace(/[^\w]/g, "")}`);
  };

  const abrirInstagram = () => {
    console.log(
      "ENVIO Whats ",
      `https://wa.me/55${candidato.whatsapp.replace(/[^\w]/g, "")}`
    );

    window.open(
      `https://www.instagram.com/${
        candidato.instagram.charAt(0) === "@"
          ? candidato.instagram.slice(1)
          : candidato.instagram
      }`
    );
  };

  return (
    <div className="card mb-1" ref={contentRef}>
      <div className="p-3">
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="font-weight-bold pb-2 title-color">
              {candidato.nome}
            </h6>
            <h6 className="mb-2 subtitle-color">{candidato.cursoAluno.nome}</h6>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            {candidato.whatsapp && (
              <div
                className="btn-icon-candidatos btn-icon-light d-flex justify-content-center align-items-center cursor-pointer"
                onClick={enviarWhatsapp}
              >
                <WhatsAppIcon />
              </div>
            )}
            {candidato.linkedin && (
              <div className="btn-icon-candidatos btn-icon-light d-flex justify-content-center align-items-center cursor-pointer">
                <LinkedInIcon />
              </div>
            )}
            {candidato.instagram && (
              <div
                className="btn-icon-candidatos btn-icon-light d-flex justify-content-center align-items-center cursor-pointer"
                onClick={abrirInstagram}
              >
                <InstagramIcon />
              </div>
            )}
            {candidato.facebook && (
              <div className="btn-icon-candidatos btn-icon-light d-flex justify-content-center align-items-center cursor-pointer">
                <FacebookIcon />
              </div>
            )}
            {candidato.email && (
              <div
                className="btn-icon-candidatos btn-icon-light d-flex justify-content-center align-items-center cursor-pointer"
                onClick={enviarEmail}
              >
                <EmailIcon
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
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
