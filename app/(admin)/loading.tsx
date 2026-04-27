import Image from "next/image";

export default function AdminLoading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
            <Image
                src="/logo-dome.png"
                alt="Teleios Dome Logo"
                width={112}
                height={112}
                priority
                className="mb-6 object-contain filter invert"
                style={{ maxWidth: "160px", width: "auto", height: "auto" }}
            />
            <p className="text-lg font-medium tracking-wide">Loading Admin Panel...</p>
        </div>
    );
}