import { useState } from "react";

export default function Footer() {
  const sections = [
    {
      title: "Sobre SkillNet",
      qa: [
        {
          q: "¿Qué es SkillNet?",
          a: "SkillNet es una plataforma donde los usuarios pueden encontrar y reservar servicios ofrecidos por profesionales verificados."
        },
        {
          q: "¿Quiénes pueden usar SkillNet?",
          a: "Cualquier persona que necesite contratar un servicio y profesionales que deseen ofrecerlo."
        },
        {
          q: "¿Es gratuito registrarse?",
          a: "Sí, tanto para usuarios como para proveedores el registro es completamente gratuito."
        }
      ]
    },
    {
      title: "Reservas y Pagos",
      qa: [
        {
          q: "¿Cómo puedo reservar un servicio?",
          a: "Solo debes buscar un servicio, ver los detalles del proveedor y elegir fecha y hora disponibles."
        },
        {
          q: "¿Cómo se realizan los pagos?",
          a: "Actualmente los pagos pueden ser presenciales, pero pronto incluiremos pagos en línea."
        },
        {
          q: "¿Puedo cancelar una reserva?",
          a: "Sí, puedes cancelar mientras el proveedor no haya confirmado la cita."
        }
      ]
    },
    {
      title: "Proveedores",
      qa: [
        {
          q: "¿Cómo me registro como proveedor?",
          a: "Desde el botón 'Publicar Servicio', completa tu información y podrás subir tus servicios."
        },
        {
          q: "¿Qué requisitos necesito?",
          a: "Solo necesitas una cuenta, un servicio válido y cumplir nuestras normas de calidad."
        },
        {
          q: "¿SkillNet cobra comisión?",
          a: "Por ahora no. Próximamente se implementará un modelo de comisión por reserva procesada."
        }
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <footer className="w-full bg-[#4A90E2] text-white mt-12 pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6">

        {/* ====================== 
            ACCORDION DE 3 COLUMNAS 
        ======================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white/10 rounded-lg shadow-lg p-5 backdrop-blur-sm">
              <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold">{section.title}</span>
                <span className="text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Contenido desplegable */}
              {openIndex === index && (
                <div className="mt-4 space-y-3 text-sm text-white/90">
                  {section.qa.map((item, i) => (
                    <div key={i}>
                      <p className="font-semibold">{item.q}</p>
                      <p className="opacity-80">{item.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ====================== 
            TEXTO FINAL CENTRADO 
        ======================= */}
        <div className="mt-10 border-t border-white/30 pt-4 text-center text-sm tracking-wide">
          SkillNet — Diseñado por <span className="font-semibold">Sebastian Bazauri</span>
        </div>
      </div>
    </footer>
  );
}
