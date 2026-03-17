import { useEffect, useRef, useState } from "react";
import api from "../services/api";

const emptyProfile = {
  fullName: "",
  avatar: "",
  email: "",
  bio: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  gender: "",
  dateOfBirth: "",
};

function Profile() {
  const [profile, setProfile] = useState(emptyProfile);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/api/users/profile/me");
        const data = response?.data ?? {};
        const profileData =
          data?.data?.profile ?? data?.profile ?? data?.data ?? data;
        const email =
          data?.data?.email ??
          data?.data?.user?.email ??
          data?.email ??
          data?.user?.email ??
          "";
        const dateOfBirth = profileData?.dateOfBirth
          ? String(profileData.dateOfBirth).slice(0, 10)
          : "";

        setProfile({
          fullName: profileData?.fullName ?? "",
          avatar: profileData?.avatar ?? profileData?.avatarPath ?? "",
          email,
          bio: profileData?.bio ?? "",
          phone: profileData?.phone ?? "",
          address: profileData?.address ?? "",
          city: profileData?.city ?? "",
          state: profileData?.state ?? "",
          gender: profileData?.gender ?? "",
          dateOfBirth,
        });
        setAvatarPreview(profileData?.avatar ?? profileData?.avatarPath ?? "");
        setAvatarFile(null);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (field) => (event) => {
    setProfile((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setAvatarFile(file);
  };

  const handleAvatarRemove = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove your profile photo?",
    );
    if (!confirmed) {
      return;
    }

    try {
      await api.delete("/api/users/profile/avatar");
      setAvatarPreview("");
      setProfile((prev) => ({ ...prev, avatar: "" }));
      setAvatarFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError("Failed to remove avatar. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const formData = new FormData();

      formData.append("fullName", profile.fullName);
      formData.append("bio", profile.bio);
      formData.append("phone", profile.phone);
      formData.append("address", profile.address);
      formData.append("city", profile.city);
      formData.append("state", profile.state);
      formData.append("gender", profile.gender);
      formData.append("dateOfBirth", profile.dateOfBirth);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      if (!avatarPreview) {
        formData.append("removeAvatar", "true");
      }

      await api.patch("/api/users/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-36 -right-16 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(99,102,241,0.16),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Profile
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Personal details & preferences
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Your email is read-only. Update the rest anytime.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 text-sm text-slate-400">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "No Photo"
                )}
              </div>
              <p className="mt-4 text-lg font-semibold text-white">
                {profile.fullName || "Your Name"}
              </p>
              <p className="text-xs text-slate-400">{profile.email}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <label className="cursor-pointer rounded-full border border-white/10 px-4 py-2 text-xs text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200">
                  Upload photo
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
                <button
                  type="button"
                  className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300 transition hover:border-indigo-300/50 hover:text-indigo-200"
                  onClick={handleAvatarRemove}
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Status
                </p>
                <p className="mt-1 text-white">Active and visible</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Connection preference
                </p>
                <p className="mt-1 text-white">Request-based only</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            {loading ? (
              <p className="text-sm text-slate-300">Loading profile...</p>
            ) : error ? (
              <p className="text-sm text-amber-200">{error}</p>
            ) : (
              <form
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
                onSubmit={handleSubmit}
              >
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Email (read only)
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    readOnly
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={handleChange("fullName")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={handleChange("phone")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    onChange={handleChange("bio")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Address
                  </label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={handleChange("address")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    City
                  </label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={handleChange("city")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    State
                  </label>
                  <input
                    type="text"
                    value={profile.state}
                    onChange={handleChange("state")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Gender
                  </label>
                  <select
                    value={profile.gender}
                    onChange={handleChange("gender")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-cyan-400/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  >
                    <option value="" className="text-slate-950">
                      Select
                    </option>
                    <option value="MALE" className="text-slate-950">
                      Male
                    </option>
                    <option value="FEMALE" className="text-slate-950">
                      Female
                    </option>
                    <option value="OTHER" className="text-slate-950">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={handleChange("dateOfBirth")}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 focus:border-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                  />
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/10 px-6 py-3 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
