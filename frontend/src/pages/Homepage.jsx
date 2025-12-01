import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/fondohome.png";
import Footer from "../components/Footer";

export default function Homepage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/services?q=${query}`);
  };

  return (
    <div className="w-full flex flex-col min-h-screen overflow-x-hidden">

      {/* ================================
            HERO / LANDING
      ================================== */}
      <section
        className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay para mejor visibilidad */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-6">
            Encuentra el servicio ideal para ti
          </h1>

          <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto flex">
            <input
              type="text"
              placeholder="Buscar servicio por nombre o categoría..."
              className="flex-1 px-4 py-3 bg-white/90 rounded-l-md focus:outline-none border border-gray-300"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* ================================
          SECCIÓN 2 - 3 CARDS INFO
      ================================== */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          ¿Por qué elegir nuestra plataforma?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/30">
            <div className="text-5xl mb-3">⭐</div>
            <h3 className="text-xl font-bold mb-3">Ventajas</h3>
            <p className="text-gray-700">
              Encuentra servicios confiables, compara precios y reserva en pocos clics.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/30">
            <div className="text-5xl mb-3">🎯</div>
            <h3 className="text-xl font-bold mb-3">Propósito</h3>
            <p className="text-gray-700">
              Conectamos clientes con profesionales de confianza para facilitar tu día a día.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/30">
            <div className="text-5xl mb-3">👥</div>
            <h3 className="text-xl font-bold mb-1">Nuestro Equipo</h3>
            <p className="font-semibold">Sebastián Bazauri</p>
            <p className="text-sm text-gray-600">Desarrollador FullStack — 22 años</p>
            <p className="mt-2 text-gray-700">
              Apasionado por crear soluciones eficientes, modernas y escalables.
            </p>
          </div>

        </div>
      </section>

      {/* ================================
          SECCIÓN 3 - SERVICIOS
      ================================== */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Servicios Disponibles</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white shadow-lg rounded-xl p-5 hover:-translate-y-1 transition">
            <img
              src="https://scontent.flim14-1.fna.fbcdn.net/v/t39.30808-6/175673369_2926269360924550_7866610605829505752_n.png?stp=dst-png_p180x540&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4pWJ8PtMrh0Q7kNvwGPU1UK&_nc_oc=Adm2g74ncksDpKadlI5mugZWPSs7AEsXHrQdqWoHDJ-Nt1NsJUq8q9HL2-uLcXeRYM0&_nc_zt=23&_nc_ht=scontent.flim14-1.fna&_nc_gid=cvt2VwJ8cQYFZkJoyzaSLg&oh=00_Afi94Z7M7dtXPo3NDCqE4kRusc6OxTe5TjkmrSQ_L6RPrg&oe=692DDA34"
              className="rounded-md h-40 w-full object-cover mb-4"
            />
            <h3 className="font-bold text-lg">Limpieza del Hogar 🧹</h3>
            <p className="text-gray-600 text-sm mt-2">
              Profesionales confiables para mantener tu hogar impecable.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-5 hover:-translate-y-1 transition">
            <img
              src="https://www.eedeporte.com/wp-content/uploads/entrenamiento-personal.jpg"
              className="rounded-md h-40 w-full object-cover mb-4"
            />
            <h3 className="font-bold text-lg">Entrenamiento Personal 💪</h3>
            <p className="text-gray-600 text-sm mt-2">
              Entrenadores expertos para mejorar tu condición física.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-5 hover:-translate-y-1 transition">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350"
              className="rounded-md h-40 w-full object-cover mb-4"
            />
            <h3 className="font-bold text-lg">Clases de Tutoría 📘</h3>
            <p className="text-gray-600 text-sm mt-2">
              Tutores especializados para ayudarte a mejorar en tus estudios.
            </p>
          </div>

        </div>
      </section>

      {/* ================================
                 FOOTER
      ================================== */}
      <Footer />
    </div>
  );
}
