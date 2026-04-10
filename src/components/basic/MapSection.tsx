import { useEffect, useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Kangra, Himachal Pradesh
const LAT = 32.0998;
const LNG = 76.2691;

export default function MapSection() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<unknown>(null);

    useEffect(() => {
        if (mapInstanceRef.current || !mapRef.current) return;

        // Dynamically import leaflet to avoid SSR issues
        import('leaflet').then((L) => {
            // Fix default marker icon paths broken by bundlers
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });

            const map = L.map(mapRef.current!, {
                center: [LAT, LNG],
                zoom: 13,
                zoomControl: true,
                scrollWheelZoom: false,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);

            L.marker([LAT, LNG])
                .addTo(map)
                .bindPopup('<strong>Altuva</strong><br/>Kangra, Himachal Pradesh')
                .openPopup();

            mapInstanceRef.current = map;
        });

        return () => {
            if (mapInstanceRef.current) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (mapInstanceRef.current as any).remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div className="relative w-full h-[420px] md:h-[500px]">
            {/* Map */}
            <div ref={mapRef} className="w-full h-full" />

            {/* Contact Us card floating over map */}
            <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-72 border border-white">
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-1 font-poppins">Contact Us</h3>
                <p className="text-xs text-neutral-400 mb-4 font-poppins">We'd love to hear from you.</p>

                <div className="flex flex-col gap-3">
                    <a
                        href="mailto:hello@altuva.co.in"
                        className="flex items-center gap-3 text-sm text-neutral-700 hover:text-black transition-colors font-poppins group"
                    >
                        <span className="w-8 h-8 rounded-full bg-[#F7FF83] flex items-center justify-center shrink-0 group-hover:bg-yellow-300 transition-colors">
                            <Mail size={14} className="text-[#1a1a1a]" />
                        </span>
                        hello@altuva.co.in
                    </a>

                    <a
                        href="tel:+911234567890"
                        className="flex items-center gap-3 text-sm text-neutral-700 hover:text-black transition-colors font-poppins group"
                    >
                        <span className="w-8 h-8 rounded-full bg-[#F7FF83] flex items-center justify-center shrink-0 group-hover:bg-yellow-300 transition-colors">
                            <Phone size={14} className="text-[#1a1a1a]" />
                        </span>
                        +91 12345 67890
                    </a>

                    <div className="flex items-start gap-3 text-sm text-neutral-700 font-poppins">
                        <span className="w-8 h-8 rounded-full bg-[#F7FF83] flex items-center justify-center shrink-0 mt-0.5">
                            <MapPin size={14} className="text-[#1a1a1a]" />
                        </span>
                        <span>Kangra, Himachal Pradesh<br />India — 176001</span>
                    </div>
                </div>

                <a
                    href={`https://www.google.com/maps?q=${LAT},${LNG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 block text-center text-xs font-semibold bg-[#1a1a1a] text-white rounded-full py-2.5 hover:bg-neutral-800 transition-colors font-poppins"
                >
                    Get Directions
                </a>
            </div>
        </div>
    );
}
