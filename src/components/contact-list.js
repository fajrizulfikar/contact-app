import Contact from "./contact";

export default function ContactList({ contacts }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
