import { getContacts } from "@/api";
import AddContact from "@/components/add-contact";
import ContactList from "@/components/contact-list";

export default async function Home() {
  const getContactsRes = await getContacts();
  const contacts = getContactsRes?.data;

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Contact</h1>
        <AddContact />
      </div>
      <div className="text-center">
        <ContactList contacts={contacts} />
      </div>
    </main>
  );
}
