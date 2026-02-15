"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, Group } from "three";
import ThreeGlobe from "three-globe";
import {
  useThree,
  type ThreeElement,
  Canvas,
  extend,
  useFrame,
} from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import countries from "@/data/globe.json";
import type { GlobeDestination, ArcData } from "@/types";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElement<typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const ASPECT = 1.2;
const CAMERA_Z = 300;
const GLOBE_RADIUS = 100;

export interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

interface WorldProps {
  globeConfig: GlobeConfig;
  data: ArcData[];
  destinations?: GlobeDestination[];
  selectedDestination?: string | null;
  onDestinationClick?: (destination: GlobeDestination) => void;
}

function latLngToVector3(
  lat: number,
  lng: number,
  altitude: number = 0.02,
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (90 - lng) * (Math.PI / 180);
  const r = GLOBE_RADIUS * (1 + altitude);
  const sinPhi = Math.sin(phi);
  return [
    r * sinPhi * Math.cos(theta),
    r * Math.cos(phi),
    r * sinPhi * Math.sin(theta),
  ];
}

function DestinationMarker({
  destination,
  isSelected,
  onClick,
}: {
  destination: GlobeDestination;
  isSelected: boolean;
  onClick: () => void;
}) {
  const htmlRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  const position = useMemo(
    () => latLngToVector3(destination.lat, destination.lng),
    [destination.lat, destination.lng],
  );

  useFrame(() => {
    if (!htmlRef.current || !groupRef.current) return;
    const worldPos = new Vector3();
    groupRef.current.getWorldPosition(worldPos);
    const surfaceNormal = worldPos.clone().normalize();
    const cameraDir = camera.position.clone().normalize();
    const dot = cameraDir.dot(surfaceNormal);
    const isVisible = dot > 0.15;
    htmlRef.current.style.opacity = isVisible ? "1" : "0";
    htmlRef.current.style.pointerEvents = isVisible ? "auto" : "none";
  });

  return (
    <group ref={groupRef} position={position}>
      <Html center>
        <div ref={htmlRef} className="transition-opacity duration-200">
          <button
            onClick={onClick}
            className="group relative cursor-pointer"
          >
            <span className="relative flex h-3.5 w-3.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSelected ? "bg-[#f58220]" : "bg-cyan-400"}`}
              />
              <span
                className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white/80 shadow-lg ${isSelected ? "bg-[#f58220]" : "bg-cyan-500"}`}
              />
            </span>
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 text-[11px] font-semibold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {destination.name}
            </span>
          </button>
        </div>
      </Html>
    </group>
  );
}

let numbersOfRings = [0];

function GlobeVisual({
  globeConfig,
  data,
  destinations,
  selectedDestination,
  onDestinationClick,
}: {
  globeConfig: GlobeConfig;
  data: ArcData[];
  destinations: GlobeDestination[];
  selectedDestination: string | null;
  onDestinationClick?: (destination: GlobeDestination) => void;
}) {
  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);

  const globeRef = useRef<ThreeGlobe | null>(null);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    if (globeRef.current) {
      _buildData();
      _buildMaterial();
    }
  }, [globeRef.current]);

  const _buildMaterial = () => {
    if (!globeRef.current) return;
    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  };

  const _buildData = () => {
    const arcs = data;
    const points = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number };
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          (["lat", "lng"] as const).every((k) => v2[k] === v[k]),
        ) === i,
    );

    setGlobeData(filteredPoints);
  };

  useEffect(() => {
    if (globeRef.current && globeData) {
      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(() => defaultProps.polygonColor);
      startAnimation();
    }
  }, [globeData]);

  const startAnimation = () => {
    if (!globeRef.current || !globeData) return;

    globeRef.current
      .arcsData(data)
      .arcStartLat((d) => (d as { startLat: number }).startLat)
      .arcStartLng((d) => (d as { startLng: number }).startLng)
      .arcEndLat((d) => (d as { endLat: number }).endLat)
      .arcEndLng((d) => (d as { endLng: number }).endLng)
      .arcColor((e: unknown) => (e as { color: string }).color)
      .arcAltitude((e: unknown) => (e as { arcAlt: number }).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeRef.current
      .pointsData(globeData)
      .pointColor(
        (e: unknown) => (e as { color: (t: number) => string }).color(0),
      )
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeRef.current
      .ringsData([])
      .ringColor((e: unknown) => (t: number) =>
        (e as { color: (t: number) => string }).color(t),
      )
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
      );
  };

  useEffect(() => {
    if (!globeRef.current || !globeData) return;

    const interval = setInterval(() => {
      if (!globeRef.current || !globeData) return;
      numbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5),
      );
      globeRef.current.ringsData(
        globeData.filter((_d, i) => numbersOfRings.includes(i)),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [globeRef.current, globeData]);

  return (
    <threeGlobe ref={globeRef}>
      {destinations.map((dest) => (
        <DestinationMarker
          key={dest.id}
          destination={dest}
          isSelected={selectedDestination === dest.id}
          onClick={() => onDestinationClick?.(dest)}
        />
      ))}
    </threeGlobe>
  );
}

function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, []);

  return null;
}

export default function World({
  globeConfig,
  data,
  destinations = [],
  selectedDestination = null,
  onDestinationClick,
}: WorldProps) {
  const scene = useMemo(() => {
    const s = new Scene();
    s.fog = new Fog(0xffffff, 400, 2000);
    return s;
  }, []);

  const camera = useMemo(() => {
    const cam = new PerspectiveCamera(50, ASPECT, 180, 1800);
    if (globeConfig.initialPosition) {
      const { lat, lng } = globeConfig.initialPosition;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (90 - lng) * (Math.PI / 180);
      const sinPhi = Math.sin(phi);
      // Local globe coords
      const x = sinPhi * Math.cos(theta);
      const y = Math.cos(phi);
      const z = sinPhi * Math.sin(theta);
      // Account for three-globe's internal rotation.y = -PI/2
      cam.position.set(-z * CAMERA_Z, y * CAMERA_Z, x * CAMERA_Z);
    } else {
      cam.position.set(0, 0, CAMERA_Z);
    }
    return cam;
  }, []);

  return (
    <Canvas scene={scene} camera={camera}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <GlobeVisual
        globeConfig={globeConfig}
        data={data}
        destinations={destinations}
        selectedDestination={selectedDestination}
        onDestinationClick={onDestinationClick}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={CAMERA_Z}
        maxDistance={CAMERA_Z}
        autoRotateSpeed={0.5}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
