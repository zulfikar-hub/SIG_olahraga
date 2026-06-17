"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

import {
  Navigation,
  X,
} from "lucide-react";

const MapContainerLeaflet = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.MapContainer
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-slate-100 animate-pulse" />
    ),
  }
);

const TileLayer = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.TileLayer
    ),
  {
    ssr: false,
  }
);

const Marker = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.Marker
    ),
  {
    ssr: false,
  }
);

interface Facility {
  id: number;
  name: string;
  district: string;
  address: string;

  latitude: number;
  longitude: number;

  status: string;

  fields?: any[];
  images?: any[];
}

interface MapContainerProps {
  facilities: Facility[];

  selectedCategories: string[];

  searchQuery: string;

  onMarkerClick: (
    facility: Facility
  ) => void;
}

const KOTA_BOGOR_BOUNDS: [
  number,
  number
][] = [
  [-6.666, 106.735],
  [-6.515, 106.855],
];

export function MapContainer({
  facilities,

  selectedCategories,

  searchQuery,

  onMarkerClick,
}: MapContainerProps) {
  const [isMounted, setIsMounted] =
    useState(false);

  const [mapInstance, setMapInstance] =
    useState<any>(null);

  const [userLocation, setUserLocation] =
    useState<
      [number, number] | null
    >(null);

  const [userIcon, setUserIcon] =
    useState<any>(null);

  const [isLocating, setIsLocating] =
    useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fixLeafletIcon =
      async () => {
        const L =
          await import("leaflet");

        const DefaultIcon =
          L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

            iconRetinaUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

            shadowUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

            iconSize: [25, 41],

            iconAnchor: [12, 41],
          });

        L.Marker.prototype.options.icon =
          DefaultIcon;

        const blueIcon =
          L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",

            shadowUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

            iconSize: [25, 41],

            iconAnchor: [12, 41],
          });

        setUserIcon(blueIcon);
      };

    fixLeafletIcon();
  }, []);

  const handleFindMyLocation =
    () => {
      if (userLocation) {
        setUserLocation(null);

        mapInstance?.flyTo(
          [-6.594, 106.789],
          13,
          {
            animate: true,
            duration: 1.5,
          }
        );

        return;
      }

      if (
        !navigator.geolocation
      ) {
        alert(
          "Browser tidak mendukung lokasi."
        );

        return;
      }

      setIsLocating(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [
            number,
            number
          ] = [
            position.coords
              .latitude,

            position.coords
              .longitude,
          ];

          setUserLocation(coords);

          setIsLocating(false);

          mapInstance?.flyTo(
            coords,
            16,
            {
              animate: true,
              duration: 1.5,
            }
          );
        },
        () => {
          setIsLocating(false);

          alert(
            "Gagal mendapatkan lokasi."
          );
        },
        {
          enableHighAccuracy: true,
        }
      );
    };

  if (!isMounted)
    return (
      <div className="h-full w-full bg-slate-100 animate-pulse" />
    );

  const filteredFacilities =
    facilities.filter(
      (facility) => {
        const categoryMatch =
          selectedCategories.length ===
            0 ||
          facility.fields?.some(
            (field: any) =>
              selectedCategories.includes(
                field.category?.name
              )
          );

        const searchMatch =
          facility.name
            .toLowerCase()
            .includes(
              searchQuery.toLowerCase()
            );

        return (
          categoryMatch &&
          searchMatch
        );
      }
    );

  return (
<div className="relative w-full h-full overflow-hidden z-0 border-l border-slate-200">
      <MapContainerLeaflet
  center={[-6.594, 106.789]}
  zoom={13}
  minZoom={13}
  maxZoom={18}
  maxBounds={KOTA_BOGOR_BOUNDS}
  maxBoundsViscosity={1}
  zoomControl
  className="w-full h-full"
  style={{ zIndex: 0 }}
  ref={(map) => {
    if (map) setMapInstance(map);
  }}
>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        {filteredFacilities.map(
          (facility) => (
            <Marker
              key={facility.id}
              position={[
                facility.latitude,
                facility.longitude,
              ]}
              eventHandlers={{
                click: () =>
                  onMarkerClick(
                    facility
                  ),
              }}
            />
          )
        )}

        {userLocation &&
          userIcon && (
            <Marker
              position={
                userLocation
              }
              icon={userIcon}
            />
          )}
      </MapContainerLeaflet>

      <button
        onClick={
          handleFindMyLocation
        }
        disabled={
          isLocating
        }
className="absolute bottom-6 right-6 z-20 p-3 rounded-full bg-white shadow-lg border hover:bg-slate-100 transition"      >
        {userLocation ? (
          <X className="w-5 h-5 text-red-500" />
        ) : (
          <Navigation
            className={`w-5 h-5 text-emerald-600 rotate-45 ${
              isLocating
                ? "animate-spin"
                : ""
            }`}
          />
        )}
      </button>
    </div>
  );
}