import { useState } from "react";

const quickReasons = [
  "Запрещённый товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
];

export default function ModeratorActions({
  id,
  onApprove,
  onReject,
  onSendBack,
}) {
  const [mode, setMode] = useState(null); 
  const [reason, setReason] = useState("");
  const [customMode, setCustomMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setReason("");
    setCustomMode(false);
    setMode(null);
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
      await onApprove();
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!reason.trim()) return;
    try {
      setLoading(true);
      await onReject(reason.trim());
      reset();
    } finally {
      setLoading(false);
    }
  };

  const handleSendBack = async () => {
    if (!reason.trim()) return;
    try {
      setLoading(true);
      await onSendBack(reason.trim());
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        padding: 12,
        maxWidth: 720,
        background: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontSize: "inherit" }}>Действия модератора</h3>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={handleApprove}
          disabled={loading}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: loading ? "wait" : "pointer",
          }}
        >
          Одобрить
        </button>

        <button
          onClick={() => setMode(mode === "reject" ? null : "reject")}
          disabled={loading}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: loading ? "wait" : "pointer",
          }}
        >
          Отклонить
        </button>

        <button
          onClick={() => setMode(mode === "sendBack" ? null : "sendBack")}
          disabled={loading}
          style={{
            background: "#f59e0b",
            color: "#111",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: loading ? "wait" : "pointer",
          }}
        >
          Вернуть на доработку
        </button>
      </div>

      {(mode === "reject" || mode === "sendBack") && (
        <div
          style={{
            border: "1px solid #fca5a5",
            background: "#fff7f7",
            padding: 12,
            borderRadius: 6,
          }}
        >
          <div style={{ marginBottom: 8, fontWeight: 600 }}>
            Укажите причину {mode === "reject" ? "отклонения" : "возврата"}:
          </div>

          {!customMode && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 10,
              }}
            >
              {quickReasons.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  type="button"
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border:
                      reason === r ? "2px solid #ef4444" : "1px solid #e5e7eb",
                    background: reason === r ? "#fee2e2" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  {r}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setReason("");
                  setCustomMode(true);
                }}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Другое
              </button>
            </div>
          )}

          {(customMode || reason) && (
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Введите причину..."
              rows={4}
              style={{
                width: "100%",
                resize: "vertical",
                borderRadius: 6,
                fontSize:"inherit",
                border: "1px solid #d1d5db",
                marginBottom: 10,
              }}
            />
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button
              onClick={reset}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #cbd5e1",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Отмена
            </button>

            <button
              onClick={mode === "reject" ? handleReject : handleSendBack}
              disabled={!reason.trim() || loading}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "none",
                background:
                  !reason.trim() || loading ? "#fca5a5" : "#dc2626",
                color: "white",
                cursor:
                  !reason.trim() || loading ? "not-allowed" : "pointer",
              }}
            >
              {mode === "reject"
                ? "Отклонить объявление"
                : "Отправить на доработку"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
