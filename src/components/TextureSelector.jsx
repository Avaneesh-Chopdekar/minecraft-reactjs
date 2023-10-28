import { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";
import { dirtImg, glassImg, grassImg, woodImg, logImg } from "../images/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export default function TextureSelector() {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  const textures = { dirt, grass, glass, wood, log };

  useEffect(() => {
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
      //   console.log("Pressed Texture", pressedTexture[0]);
    }
  }, [dirt, grass, glass, wood, log, setTexture]);

  useEffect(() => {
    setVisible(true);
    const visibiltyTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => {
      clearTimeout(visibiltyTimeout);
    };
  }, [activeTexture]);
  return (
    visible && (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              src={src}
              alt={k}
              key={k}
              className={`${k === activeTexture ? "active" : ""}`}
            />
          );
        })}
      </div>
    )
  );
}
