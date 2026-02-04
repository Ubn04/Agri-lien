'use client'

import { useEffect, useRef, useState } from 'react'

interface MapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  markers?: Array<{
    id: string
    position: { lat: number; lng: number }
    title?: string
    onClick?: () => void
  }>
  onLocationSelect?: (location: { lat: number; lng: number }) => void
  height?: string
  interactive?: boolean
}

export function Map({
  center = { lat: 6.3703, lng: 2.3912 }, // Cotonou, Benin
  zoom = 13,
  markers = [],
  onLocationSelect,
  height = '400px',
  interactive = true,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)

  useEffect(() => {
    // Initialize map (using Leaflet or Google Maps)
    // This is a placeholder - actual implementation would use a mapping library
    
    // Example with Leaflet:
    // const L = require('leaflet')
    // const mapInstance = L.map(mapRef.current).setView([center.lat, center.lng], zoom)
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance)
    
    console.log('Map would be initialized here with:', { center, zoom, markers })
    
    return () => {
      // Cleanup map instance
      if (map) {
        // map.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (map && markers.length > 0) {
      // Add markers to map
      markers.forEach(marker => {
        // L.marker([marker.position.lat, marker.position.lng])
        //   .addTo(map)
        //   .bindPopup(marker.title || '')
        console.log('Adding marker:', marker)
      })
    }
  }, [map, markers])

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !onLocationSelect) return

    // Get clicked coordinates
    // const latlng = map.mouseEventToLatLng(e)
    // onLocationSelect({ lat: latlng.lat, lng: latlng.lng })
  }

  return (
    <div className="relative">
      <div
        ref={mapRef}
        style={{ height }}
        className="rounded-lg border border-gray-300 bg-gray-100 overflow-hidden"
        onClick={handleMapClick}
      >
        {/* Placeholder for map */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-600">Carte interactive</p>
            <p className="text-sm text-gray-500 mt-1">
              {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
            </p>
          </div>
        </div>
      </div>

      {/* Map controls */}
      {interactive && (
        <div className="absolute top-4 right-4 space-y-2">
          <button
            className="bg-white rounded-lg shadow-md p-2 hover:bg-gray-50"
            onClick={() => {
              // Zoom in
            }}
          >
            +
          </button>
          <button
            className="bg-white rounded-lg shadow-md p-2 hover:bg-gray-50"
            onClick={() => {
              // Zoom out
            }}
          >
            −
          </button>
        </div>
      )}
    </div>
  )
}

// Location picker component
export function LocationPicker({
  onLocationSelect,
  initialLocation,
}: {
  onLocationSelect: (location: { lat: number; lng: number; address?: string }) => void
  initialLocation?: { lat: number; lng: number }
}) {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location)
    
    // Reverse geocode to get address
    // fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`)
    //   .then(res => res.json())
    //   .then(data => {
    //     onLocationSelect({
    //       ...location,
    //       address: data.display_name,
    //     })
    //   })
    
    onLocationSelect(location)
  }

  return (
    <div>
      <Map
        center={selectedLocation}
        onLocationSelect={handleLocationSelect}
        markers={selectedLocation ? [{
          id: 'selected',
          position: selectedLocation,
          title: 'Emplacement sélectionné',
        }] : []}
      />
      {selectedLocation && (
        <p className="mt-2 text-sm text-gray-600">
          Coordonnées: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
        </p>
      )}
    </div>
  )
}

// Delivery tracking map
export function DeliveryTrackingMap({
  origin,
  destination,
  currentLocation,
}: {
  origin: { lat: number; lng: number; label: string }
  destination: { lat: number; lng: number; label: string }
  currentLocation?: { lat: number; lng: number }
}) {
  const markers = [
    {
      id: 'origin',
      position: origin,
      title: `Départ: ${origin.label}`,
    },
    {
      id: 'destination',
      position: destination,
      title: `Arrivée: ${destination.label}`,
    },
  ]

  if (currentLocation) {
    markers.push({
      id: 'current',
      position: currentLocation,
      title: 'Position actuelle',
    })
  }

  return (
    <div>
      <Map
        center={currentLocation || origin}
        markers={markers}
        interactive={false}
        height="500px"
      />
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Départ</p>
          <p className="font-medium">{origin.label}</p>
        </div>
        <div>
          <p className="text-gray-600">Destination</p>
          <p className="font-medium">{destination.label}</p>
        </div>
      </div>
    </div>
  )
}
