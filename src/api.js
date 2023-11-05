const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL;

// get contacts
export const getContacts = async () => {
  const res = await fetch(`${baseUrl}/contact`, { cache: "no-store" });
  const jsonRes = await res.json();
  return jsonRes;
};

// add contact
export const addContact = async (contact) => {
  const res = await fetch(`${baseUrl}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  // check if the response has content
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const jsonRes = isJson && res.status !== 204 ? await res.json() : {};

  return jsonRes;
};

// edit contact
export const editContact = async (contact) => {
  const res = await fetch(`${baseUrl}/contact/${contact.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  // check if the response has content
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const jsonRes = isJson && res.status !== 204 ? await res.json() : {};

  return jsonRes;
};

// delete contact
export const deleteContact = async (id) => {};
