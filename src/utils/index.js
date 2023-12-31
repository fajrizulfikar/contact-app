export function splitName(fullName) {
  if (!fullName) {
    return { firstName: "", lastName: "" };
  }

  const parts = fullName.trim().split(/\s+/);

  const firstName = parts[0] || "";

  const lastName = parts.slice(1).join(" ") || "";

  return { firstName, lastName };
}

export function getFullName(firstName, lastName) {
  return `${firstName} ${lastName ?? ""}`.trim();
}
