import { api } from "src/boot/axios";

async function getCalls() {
  const res = await api.get(`calls/`);
  return res.data;
}

async function getThemes() {
  const res = await api.get(`themes/`);
  return res.data;
}

async function deleteCall(callId) {
  if (confirm("Delete this call?")) {
    const res = await api.delete(`calls/${callId}`);
    return res.data;
  }
}

export { getCalls, getThemes };
