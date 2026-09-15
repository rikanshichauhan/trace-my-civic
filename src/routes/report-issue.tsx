import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { SiteFooter } from "@/components/civic/SiteFooter";
import { SiteHeader } from "@/components/civic/SiteHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/report-issue")({
  head: () => ({
    meta: [
      { title: "Report a Civic Issue — CivicTrace" },
      {
        name: "description",
        content:
          "File a civic complaint with a live camera snapshot, automatic GPS location and a timestamped municipal record.",
      },
      { property: "og:title", content: "Report a Civic Issue — CivicTrace" },
      {
        property: "og:description",
        content: "Mandatory photo evidence, live location and time are attached to every submission.",
      },
    ],
  }),
  component: ReportIssuePage,
});

type Coords = { lat: number; lng: number; accuracy: number };

const CATEGORIES = [
  { value: "pothole", label: "Pothole / Road Damage", icon: "dangerous" },
  { value: "streetlight", label: "Street Light Outage", icon: "lightbulb" },
  { value: "garbage", label: "Garbage / Sanitation", icon: "delete" },
  { value: "water", label: "Water Supply / Leakage", icon: "water_drop" },
  { value: "drainage", label: "Drainage / Sewage", icon: "waves" },
  { value: "other", label: "Other Civic Issue", icon: "report" },
];

function ReportIssuePage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [now, setNow] = useState<Date>(new Date());
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoSource, setPhotoSource] = useState<"camera" | "upload" | null>(null);
  const [photoTakenAt, setPhotoTakenAt] = useState<Date | null>(null);

  const [coords, setCoords] = useState<Coords | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "locating" | "ready" | "error">("idle");
  const [locationError, setLocationError] = useState<string | null>(null);

  const [category, setCategory] = useState("pothole");
  const [severity, setSeverity] = useState("medium");
  const [landmark, setLandmark] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    detectLocation();
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function detectLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationStatus("error");
      setLocationError("Location services are not available on this device.");
      return;
    }
    setLocationStatus("locating");
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setLocationStatus("ready");
      },
      (err) => {
        setLocationStatus("error");
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission was blocked. Allow location access to attach GPS coordinates."
            : "Could not read your location. Try again in an open area.",
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  }

  async function startCamera() {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraOn(true);
      window.setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      }, 0);
    } catch {
      setCameraError("Camera access was blocked. Allow camera permission or upload a photo instead.");
      setCameraOn(false);
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOn(false);
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL("image/jpeg", 0.9));
    setPhotoSource("camera");
    setPhotoTakenAt(new Date());
    setFormError(null);
    stopCamera();
  }

  function onUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
      setPhotoSource("upload");
      setPhotoTakenAt(new Date());
      setFormError(null);
    };
    reader.readAsDataURL(file);
  }

  function clearPhoto() {
    setPhoto(null);
    setPhotoSource(null);
    setPhotoTakenAt(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!photo) {
      setFormError("Photo evidence is mandatory. Capture a live snapshot or upload a photo.");
      return;
    }
    if (!description.trim()) {
      setFormError("Add a short description of the issue.");
      return;
    }
    setFormError(null);
    setSubmitting(true);
    try {
      let { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        const { error: authError } = await supabase.auth.signInAnonymously();
        if (authError) throw authError;
        const refreshed = await supabase.auth.getSession();
        sessionData = refreshed.data;
      }
      const userId = sessionData.session?.user.id;
      if (!userId) throw new Error("Could not start a session.");

      const ref = `CT-${Math.floor(10000 + Math.random() * 89999)}`;

      const { error: insertError } = await supabase.from("complaints").insert({
        reference_number: ref,
        reporter_id: userId,
        category,
        severity,
        landmark: landmark || null,
        description,
        latitude: coords?.lat ?? null,
        longitude: coords?.lng ?? null,
        location_accuracy: coords?.accuracy ?? null,
        status: "submitted",
      });
      if (insertError) throw insertError;

      setSubmitted(ref);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not submit. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const stamp = now.toLocaleString("en-IN", { hour12: false });
  const isoStamp = now.toISOString().replace("T", " ").slice(0, 19) + " UTC";

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <SiteHeader />
      <main className="w-full pt-28 bg-surface flex-1">
        <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin py-space-lg">
          <div className="mb-space-lg">
            <span className="font-code-sm text-code-sm text-secondary uppercase tracking-widest font-semibold">
              Civic Complaint Intake
            </span>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-space-xs">
              Report an Issue
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-2xl">
              Live photo evidence, GPS coordinates and the capture time are attached automatically to create a
              tamper-evident municipal record.
            </p>
          </div>

          {submitted && (
            <div className="mb-space-lg p-space-lg rounded-lg bg-secondary-container/50 border border-secondary">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[24px]">task_alt</span>
                <span className="font-headline-sm text-headline-sm text-on-secondary-container">
                  Complaint registered — reference #{submitted}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                Your evidence, location and timestamp have been sealed into the civic ledger.
              </p>
              <button
                type="button"
                onClick={() => void navigate({ to: "/my-complaints" })}
                className="mt-space-md inline-flex items-center gap-space-xs px-space-md py-space-sm rounded bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">fact_check</span>
                Track in My Complaints
              </button>
            </div>
          )}

          <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
            {/* Evidence capture */}
            <section className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-lg p-space-lg">
              <div className="flex items-center justify-between mb-space-md">
                <h2 className="font-headline-md text-headline-md text-primary">Photo Evidence</h2>
                <span className="font-label-sm text-label-sm uppercase tracking-wider px-2 py-1 rounded bg-error-container text-on-error-container">
                  Mandatory
                </span>
              </div>

              {!photo && !cameraOn && (
                <div className="border border-dashed border-outline-variant rounded-lg p-space-xl flex flex-col items-center text-center bg-surface-container-low">
                  <span className="material-symbols-outlined text-primary text-[40px]">add_a_photo</span>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm max-w-sm">
                    Capture a live snapshot of the issue with your device camera, or upload a photo from this
                    device.
                  </p>
                  <div className="flex flex-wrap justify-center gap-space-sm mt-space-md">
                    <button
                      type="button"
                      onClick={() => void startCamera()}
                      className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                      Open Live Camera
                    </button>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded bg-surface-container-lowest border border-outline-variant text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      Upload Photo
                    </button>
                  </div>
                  {cameraError && (
                    <p className="font-body-sm text-body-sm text-error mt-space-md">{cameraError}</p>
                  )}
                </div>
              )}

              {cameraOn && (
                <div className="rounded-lg overflow-hidden border border-outline-variant bg-inverse-surface">
                  <video ref={videoRef} playsInline muted className="w-full max-h-[420px] object-cover" />
                  <div className="flex flex-wrap items-center justify-between gap-space-sm p-space-md bg-surface-container-low">
                    <span className="font-code-sm text-code-sm text-on-surface-variant">
                      LIVE • {stamp}
                    </span>
                    <div className="flex gap-space-sm">
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="px-space-md py-space-sm rounded border border-outline-variant text-on-surface-variant font-label-md text-label-md uppercase tracking-wider hover:text-on-surface"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={capturePhoto}
                        className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container"
                      >
                        <span className="material-symbols-outlined text-[18px]">camera</span>
                        Capture Snapshot
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {photo && (
                <div className="rounded-lg overflow-hidden border border-outline-variant">
                  <img src={photo} alt="Captured civic issue evidence" className="w-full object-cover" />
                  <div className="p-space-md bg-surface-container-low space-y-space-xs">
                    <div className="flex flex-wrap items-center gap-space-sm font-code-sm text-code-sm text-on-surface-variant">
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest">
                        SOURCE: {photoSource === "camera" ? "LIVE CAMERA" : "DEVICE UPLOAD"}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest">
                        CAPTURED: {photoTakenAt?.toLocaleString("en-IN", { hour12: false })}
                      </span>
                      {coords && (
                        <span className="px-2 py-0.5 rounded bg-surface-container-lowest">
                          GPS: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-space-sm pt-space-xs">
                      <button
                        type="button"
                        onClick={() => {
                          clearPhoto();
                          void startCamera();
                        }}
                        className="px-space-md py-space-sm rounded bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container"
                      >
                        Retake
                      </button>
                      <button
                        type="button"
                        onClick={clearPhoto}
                        className="px-space-md py-space-sm rounded border border-outline-variant text-on-surface-variant font-label-md text-label-md uppercase tracking-wider hover:text-on-surface"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={onUpload}
              />
              <canvas ref={canvasRef} className="hidden" />

              <div className="mt-space-lg grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <label className="flex flex-col gap-space-xs">
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                    Issue Category
                  </span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded border border-outline-variant bg-surface-container-lowest px-space-md py-space-sm font-body-md text-body-md text-on-surface focus:border-primary focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-space-xs">
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                    Severity
                  </span>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full rounded border border-outline-variant bg-surface-container-lowest px-space-md py-space-sm font-body-md text-body-md text-on-surface focus:border-primary focus:outline-none"
                  >
                    <option value="critical">Critical — immediate danger</option>
                    <option value="high">High — rapid response needed</option>
                    <option value="medium">Medium — standard SLA</option>
                    <option value="low">Low — routine maintenance</option>
                  </select>
                </label>

                <label className="flex flex-col gap-space-xs md:col-span-2">
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                    Nearest Landmark
                  </span>
                  <input
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Opposite Sector 4 community park gate"
                    className="w-full rounded border border-outline-variant bg-surface-container-lowest px-space-md py-space-sm font-body-md text-body-md text-on-surface focus:border-primary focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-space-xs md:col-span-2">
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                    Description
                  </span>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe the issue, how long it has existed and who it affects."
                    className="w-full rounded border border-outline-variant bg-surface-container-lowest px-space-md py-space-sm font-body-md text-body-md text-on-surface focus:border-primary focus:outline-none"
                  />
                </label>
              </div>

              {formError && (
                <p className="mt-space-md font-body-md text-body-md text-error flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="mt-space-lg w-full md:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-3 rounded bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                Submit Complaint
              </button>
            </section>

            {/* Live telemetry */}
            <aside className="space-y-space-lg">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-space-lg">
                <div className="flex items-center gap-space-xs mb-space-md">
                  <span className="material-symbols-outlined text-secondary text-[20px]">my_location</span>
                  <h2 className="font-headline-sm text-headline-sm text-primary">Live GPS Location</h2>
                </div>
                {locationStatus === "locating" && (
                  <p className="font-body-md text-body-md text-on-surface-variant">Detecting your location…</p>
                )}
                {locationStatus === "ready" && coords && (
                  <div className="space-y-space-xs font-code-md text-code-md text-on-surface">
                    <p>LAT: {coords.lat.toFixed(6)}</p>
                    <p>LNG: {coords.lng.toFixed(6)}</p>
                    <p className="text-on-surface-variant">ACCURACY: ±{Math.round(coords.accuracy)} m</p>
                  </div>
                )}
                {locationStatus === "error" && (
                  <p className="font-body-md text-body-md text-error">{locationError}</p>
                )}
                <button
                  type="button"
                  onClick={detectLocation}
                  className="mt-space-md inline-flex items-center gap-space-xs px-space-md py-space-sm rounded border border-outline-variant text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  Refresh Location
                </button>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-space-lg">
                <div className="flex items-center gap-space-xs mb-space-md">
                  <span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
                  <h2 className="font-headline-sm text-headline-sm text-primary">Live Time Stamp</h2>
                </div>
                <p className="font-code-md text-code-md text-on-surface">{stamp}</p>
                <p className="font-code-sm text-code-sm text-on-surface-variant mt-space-xs">{isoStamp}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm">
                  The exact submission time is sealed with your evidence.
                </p>
              </div>

              <div className="bg-primary text-on-primary rounded-lg p-space-lg">
                <div className="flex items-center gap-space-xs mb-space-sm">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">verified</span>
                  <span className="font-label-md text-label-md uppercase tracking-wider">
                    Evidence Integrity
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-primary/80">
                  Photo, coordinates and timestamp are bundled into a single immutable record that both you
                  and the municipal officer can audit later.
                </p>
              </div>
            </aside>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
