import React from "react";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <nav 
      className="w-[28%] h-full p-2 flex flex-col gap-2 text-white"
      aria-label="Main navigation"
    >
      {/* Sección de Navegación Principal */}
      <section className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <button 
          className="flex items-center gap-3 pl-8 py-3 w-full text-left hover:bg-[#242424] transition-colors"
          aria-label="Home"
        >
          <img className="w-6" src={assets.home_icon} alt="Home icon" />
          <span className="font-bold">Home</span>
        </button>
        
        <button 
          className="flex items-center gap-3 pl-8 py-3 w-full text-left hover:bg-[#242424] transition-colors"
          aria-label="Search"
        >
          <img className="w-6" src={assets.search_icon} alt="Search icon" />
          <span className="font-bold">Search</span>
        </button>
      </section>

      {/* Sección de Biblioteca */}
      <section 
        className="bg-[#121212] h-[85%] rounded"
        aria-label="Your library"
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="Library icon" />
            <h2 className="font-semibold">Your library</h2>
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Navigate back">
              <img className="w-5" src={assets.arrow_icon} alt="Back" />
            </button>
            <button aria-label="Add new item">
              <img className="w-5 cursor-pointer" src={assets.plus_icon} alt="Add" />
            </button>
          </div>
        </div>

        {/* Tarjetas de acción */}
        <article className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1">
          <h3 className="text-lg">Create your first playlist</h3>
          <p className="font-light">It's easy, we'll help you</p>
          <button 
            className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:scale-105 transition-transform"
            aria-label="Create playlist"
          >
            Create Playlist
          </button>
        </article>

        <article className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1">
          <h3 className="text-lg">Let's find some podcasts to follow</h3>
          <p className="font-light">We'll keep you updated on new episodes</p>
          <button 
            className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:scale-105 transition-transform"
            aria-label="Browse podcasts"
          >
            Browse Podcasts
          </button>
        </article>
      </section>
    </nav>
  );
};

export default Sidebar;