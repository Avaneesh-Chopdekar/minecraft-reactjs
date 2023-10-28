import { useBox } from "@react-three/cannon";
import { useStore } from "../hooks/useStore";
import * as textures from "../images/textures";

export default function Cube({ position, texture }) {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);
  const activeTexture = textures[texture + "Texture"];
  // console.log("active texture", activeTexture);
  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;
        if (e.altKey) {
          removeCube(x, y, z);
          return;
        } else {
          // console.log("clicked face ", clickedFace);
          switch (clickedFace) {
            case 0:
              addCube(x + 1, y, z);
              break;
            case 1:
              addCube(x - 1, y, z);
              break;
            case 2:
              addCube(x, y + 1, z);
              break;
            case 3:
              addCube(x, y - 1, z);
              break;
            case 4:
              addCube(x, y, z + 1);
              break;
            case 5:
              addCube(x, y, z - 1);
              break;

            default:
              break;
          }
        }
      }}
    >
      <boxGeometry />
      <meshStandardMaterial
        map={activeTexture}
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
      />
    </mesh>
  );
}
