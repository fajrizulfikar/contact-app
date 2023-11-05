const baseUrl = process.env.NEXT_PUBLIC_SERVICE_URL;

// get contacts
export const getContacts = async () => {
  const res = await fetch(`${baseUrl}/contact`, { cache: "no-store" });
  const jsonRes = await res.json();
  return jsonRes;
};

// add contact
export const addContact = async (contact) => {};

// edit contact
export const editContact = async (contact) => {};

// delete contact
export const deleteContact = async (id) => {};
