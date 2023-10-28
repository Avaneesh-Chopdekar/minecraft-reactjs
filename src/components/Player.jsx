import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

export default function Player() {
  const JUMP_FORCE = 5;
  const SPEED = 4;

  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboard();
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  const positionRef = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => (positionRef.current = p));
  }, [api.position]);

  const velocityRef = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocityRef.current = v));
  }, [api.velocity]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(
        positionRef.current[0],
        positionRef.current[1],
        positionRef.current[2]
      )
    );

    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocityRef.current[1], direction.z);

    if (jump && Math.abs(velocityRef.current[1] < 0.05)) {
      api.velocity.set(
        velocityRef.current[0],
        JUMP_FORCE,
        velocityRef.current[2]
      );
    }
  });

  return <mesh ref={ref}></mesh>;
}
