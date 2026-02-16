"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  Color,
  Scene,
  PerspectiveCamera,
  Vector3,
  Group,
  BufferGeometry,
  BufferAttribute,
  Line as ThreeLine,
  LineBasicMaterial,
} from "three";
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
                className={`absolute inline-flex h-full w-full rounded-full opacity-50 scale-150 ${isSelected ? "bg-[#f58220]" : "bg-cyan-400"}`}
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

// --- Flight animation ---

const FLIGHT_ROUTE_1 = [
  { lat: 9.9312, lng: 76.2673 }, // Kerala
  { lat: 25.2048, lng: 55.2708 }, // Dubai
  { lat: 41.7151, lng: 44.8271 }, // Georgia
  { lat: 40.4093, lng: 49.8671 }, // Baku
  { lat: 28.6139, lng: 77.209 }, // Delhi
  { lat: 21.0285, lng: 105.8542 }, // Vietnam
  { lat: 13.7563, lng: 100.5018 }, // Thailand
  { lat: 1.3521, lng: 103.8198 }, // Singapore
  { lat: -8.3405, lng: 115.092 }, // Bali
];

// Full orbit around the globe at ~30°N, evenly spaced
const FLIGHT_ROUTE_2 = Array.from({ length: 10 }, (_, i) => ({
  lat: 30,
  lng: (i * 36) % 360,
}));

function latLngToUnitVector(lat: number, lng: number): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (90 - lng) * (Math.PI / 180);
  const sinPhi = Math.sin(phi);
  return new Vector3(
    sinPhi * Math.cos(theta),
    Math.cos(phi),
    sinPhi * Math.sin(theta),
  );
}

function slerpVectors(v1: Vector3, v2: Vector3, t: number): Vector3 {
  const dot = Math.min(Math.max(v1.dot(v2), -1), 1);
  const omega = Math.acos(dot);
  if (omega < 0.001) return v1.clone();
  const sinOmega = Math.sin(omega);
  const a = Math.sin((1 - t) * omega) / sinOmega;
  const b = Math.sin(t * omega) / sinOmega;
  return new Vector3(
    a * v1.x + b * v2.x,
    a * v1.y + b * v2.y,
    a * v1.z + b * v2.z,
  );
}

const TRAIL_LENGTH = 80;

const TRAIL_COLORS = (() => {
  const arr = new Float32Array(TRAIL_LENGTH * 3);
  for (let j = 0; j < TRAIL_LENGTH; j++) {
    const b = (j / (TRAIL_LENGTH - 1)) ** 1.5;
    arr[j * 3] = b;
    arr[j * 3 + 1] = b;
    arr[j * 3 + 2] = b;
  }
  return arr;
})();

function FlightAnimation({
  route,
  speed = 0.035,
  startOffset = 0,
  cruiseAlt,
}: {
  route: { lat: number; lng: number }[];
  speed?: number;
  startOffset?: number;
  cruiseAlt?: number;
}) {
  const groupRef = useRef<Group>(null);
  const progressRef = useRef(startOffset);
  const trailCount = useRef(0);

  const unitVectors = useMemo(
    () => route.map((wp) => latLngToUnitVector(wp.lat, wp.lng)),
    [route],
  );

  const trail = useMemo(() => {
    const positions = new Float32Array(TRAIL_LENGTH * 3);
    const geom = new BufferGeometry();
    geom.setAttribute("position", new BufferAttribute(positions, 3));
    geom.setAttribute("color", new BufferAttribute(TRAIL_COLORS, 3));
    geom.setDrawRange(0, 0);
    const mat = new LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });
    const line = new ThreeLine(geom, mat);
    return { positions, geom, line };
  }, []);

  useEffect(() => () => {
    trail.geom.dispose();
    (trail.line.material as LineBasicMaterial).dispose();
  }, [trail]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    progressRef.current = (progressRef.current + delta * speed) % 1;

    const n = unitVectors.length;
    const seg = progressRef.current * n;
    const i = Math.floor(seg) % n;
    const t = seg - Math.floor(seg);

    const from = unitVectors[i];
    const to = unitVectors[(i + 1) % n];

    const pos = slerpVectors(from, to, t);
    const alt = cruiseAlt ?? 0.04 + 0.14 * Math.sin(t * Math.PI);
    const r = GLOBE_RADIUS * (1 + alt);
    groupRef.current.position.set(pos.x * r, pos.y * r, pos.z * r);

    const lookT = Math.min(t + 0.02, 0.999);
    const lookPos = slerpVectors(from, to, lookT);
    const lookAlt = cruiseAlt ?? 0.04 + 0.14 * Math.sin(lookT * Math.PI);
    const lookR = GLOBE_RADIUS * (1 + lookAlt);

    groupRef.current.up.copy(pos.clone().normalize());
    groupRef.current.lookAt(
      lookPos.x * lookR,
      lookPos.y * lookR,
      lookPos.z * lookR,
    );

    // Update trail
    trail.positions.copyWithin(0, 3);
    const last = (TRAIL_LENGTH - 1) * 3;
    trail.positions[last] = pos.x * r;
    trail.positions[last + 1] = pos.y * r;
    trail.positions[last + 2] = pos.z * r;
    trail.geom.attributes.position.needsUpdate = true;
    if (trailCount.current < TRAIL_LENGTH) trailCount.current++;
    trail.geom.setDrawRange(
      TRAIL_LENGTH - trailCount.current,
      trailCount.current,
    );
  });

  return (
    <>
      <primitive object={trail.line} />
      <group ref={groupRef} scale={1.2}>
        {/* Fuselage */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.4, 2.5, 4]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Wings */}
        <mesh position={[0, 0, 0.3]}>
          <boxGeometry args={[4, 0.08, 0.8]} />
          <meshStandardMaterial
            color="#e0e0e0"
            emissive="#ffffff"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Tail stabilizer */}
        <mesh position={[0, 0, 1.2]}>
          <boxGeometry args={[1.6, 0.08, 0.4]} />
          <meshStandardMaterial
            color="#e0e0e0"
            emissive="#ffffff"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Tail fin (brand orange) */}
        <mesh position={[0, 0.5, 1.2]}>
          <boxGeometry args={[0.08, 0.8, 0.5]} />
          <meshStandardMaterial
            color="#f58220"
            emissive="#f58220"
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* Engine glow */}
        <pointLight
          color="#f58220"
          intensity={3}
          distance={12}
          position={[0, 0, 1.5]}
        />
      </group>
    </>
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
      <FlightAnimation route={FLIGHT_ROUTE_1} />
      <FlightAnimation route={FLIGHT_ROUTE_2} speed={0.04} startOffset={0.5} cruiseAlt={0.12} />
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

function CameraPositioner({
  initialPosition,
}: {
  initialPosition?: { lat: number; lng: number };
}) {
  const { camera, controls } = useThree();
  const positioned = useRef(false);

  useEffect(() => {
    if (!initialPosition || positioned.current || !controls) return;
    positioned.current = true;

    const { lat, lng } = initialPosition;
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (90 - lng) * (Math.PI / 180);
    const sinPhi = Math.sin(phi);
    const x = sinPhi * Math.cos(theta);
    const y = Math.cos(phi);
    const z = sinPhi * Math.sin(theta);

    // Account for three-globe's internal rotation.y = +PI/2
    camera.position.set(z * CAMERA_Z, y * CAMERA_Z, -x * CAMERA_Z);
    camera.lookAt(0, 0, 0);

    (controls as unknown as { update: () => void }).update();
  }, [initialPosition, camera, controls]);

  return null;
}

export default function World({
  globeConfig,
  data,
  destinations = [],
  selectedDestination = null,
  onDestinationClick,
}: WorldProps) {
  const scene = useMemo(() => new Scene(), []);
  const camera = useMemo(
    () => new PerspectiveCamera(50, ASPECT, 180, 1800),
    [],
  );

  return (
    <Canvas scene={scene} camera={camera}>
      <WebGLRendererConfig />
      <CameraPositioner initialPosition={globeConfig.initialPosition} />
      <ambientLight color={globeConfig.ambientLight} intensity={1.5} />
      <GlobeVisual
        globeConfig={globeConfig}
        data={data}
        destinations={destinations}
        selectedDestination={selectedDestination}
        onDestinationClick={onDestinationClick}
      />
      <OrbitControls
        makeDefault
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
