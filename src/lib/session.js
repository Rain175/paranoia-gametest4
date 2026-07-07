export function getSessionId() {
  let id = localStorage.getItem("paranoia_session_id");
  if (!id) {
    id = "sess_" + Math.random().toString(36).substring(2, 12);
    localStorage.setItem("paranoia_session_id", id);
  }
  return id;
}

export function getDisplayName() {
  return localStorage.getItem("paranoia_display_name") || "";
}

export function setDisplayName(name) {
  localStorage.setItem("paranoia_display_name", name);
}

export function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}